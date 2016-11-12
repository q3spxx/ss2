'use strict'

import React from 'react'
import Ajax from './tools/ajax.jsx'
import ModalData from './modalData.jsx'
import {scheduleList} from './tools/helper.jsx'
import $ from 'jquery'

export default class MoviesList extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			target: false
		}
		this.add = this.add.bind(this)
		this.del = this.del.bind(this)
		this.update = this.update.bind(this)
		this.changeTarget = this.changeTarget.bind(this)
		this.addInToSchedule = this.addInToSchedule.bind(this)
	}
	get () {
		let body = Ajax.getBody()
		body.module = "main"
		body.table = 0
		body.action = "get"
		body.params.keys['key0'] = "*"
		body.params.keys['key1'] = "rowid"
		return Ajax.send('/admin', body).then((res) => {
			console.log(res)
			this.props.update(res)
		})
	}
	componentDidMount () {
		this.get().then((res) => {
			scheduleList.get()
		})
	}
	add () {
		ModalData.title = "Создать фильм"
		var formName = 'createMovie'
		let form = ModalData.Form(formName)
		ModalData.forms.push(form)

		form.inputs.push(ModalData.Input("Название", 'text', 'name', ""))

		let options = [{value: 0, title: "2d"}, {value: 1, title: "3d"}, {value: 2, title: "2d + 3d"}]
		form.inputs.push(ModalData.Select("Формат", 'format', 0, options))

		form.inputs.push(ModalData.Input("Продолжительность", 'number', 'duration', ""))

		let genreOptions = this.props.genres.map((genre, i) => {
			return {value: i, title: genre}
		})
		form.inputs.push(ModalData.Select("Жанр", 'genre', 0, genreOptions))

		form.inputs.push(ModalData.Button('Создать', (e) => {
				e.preventDefault()
				let body = Ajax.getBody()
				body.module = "main"
				body.table = 0
				body.action = "add"
				let formData = $(document.forms[formName]).serializeArray()
				formData.forEach((data) => {
					body.params.keys[data.name] = data.value
				})

				ModalData.close()

				Ajax.send("/admin", body).then((res) => {
					this.get()
				})
			}
		))
		ModalData.open()
	}
	del () {
		if (!this.state.target) return 
		ModalData.title = "Удаление"

		var formName = 'delMovie'
		let form = ModalData.Form(formName)
		ModalData.forms.push(form)

		ModalData.warnings.push({
			text: "Вы действительно хотите удалить " + this.state.target.innerHTML + " ?"
		})

		form.inputs.push(ModalData.Button("Удалить", (e) => {
			e.preventDefault()
			let body = Ajax.getBody()
			body.module = "main"
			body.table = 0
			body.action = "delAll"
			body.params.selectors["rowid"] = this.props.movies[this.state.target.dataset.index].rowid

			ModalData.close()

			Ajax.send("/admin", body).then((res) => {
				return scheduleList.get()
			}).then((res) => {
				this.get()
			})
			
		}))
		ModalData.open()
	}
	update () {
		if (!this.state.target) return 
		ModalData.title = "Редактирование"
		var formName = 'editMovie'
		let form = ModalData.Form(formName)
		ModalData.forms.push(form)

		form.inputs.push(ModalData.Input('Название', 'text', 'name', this.props.movies[this.state.target.dataset.index].name))

		let options = [{value: 0, title: "2d"}, {value: 1, title: "3d"}, {value: 2, title: "2d + 3d"}]
		form.inputs.push(ModalData.Select("Формат", 'format', this.props.movies[this.state.target.dataset.index].format, options))

		form.inputs.push(ModalData.Input('Продолжительность', 'number', 'duration', this.props.movies[this.state.target.dataset.index].duration))

		let genreOptions = this.props.genres.map((genre, i) => {
			return {value: i, title: genre}
		})
		form.inputs.push(ModalData.Select("Жанр", 'genre', this.props.movies[this.state.target.dataset.index].genre, genreOptions))

		form.inputs.push(ModalData.Button('Изменить', (e) => {
			e.preventDefault()
			let body = Ajax.getBody()
			body.module = "main"
			body.table = 0
			body.action = "updateAll"
			let formData = $(document.forms[formName]).serializeArray()
			formData.forEach((data) => {
				body.params.keys[data.name] = data.value
			})
			body.params.selectors['rowid'] = this.props.movies[this.state.target.dataset.index].rowid

			ModalData.close()

			Ajax.send("/admin", body).then((res) => {
				return this.get()
			}).then((res) => {
				scheduleList.get()
			})

		}))
		ModalData.open()
	}
	changeTarget (e) {
		$(this.state.target).removeClass('selected')
		let elem = $("#moviesList > ul > li[data-index="+ e.target.dataset.index + "]")
		elem.addClass("selected")
		this.setState({
			target: elem[0]
		})
	}
	addInToSchedule () {
		if (!this.state.target) return
		var body = Ajax.getBody()
			body.module = "main"
			body.table = 1
			body.action = "add"
			body.params.keys['movieId'] = this.props.movies[this.state.target.dataset.index].rowid
			body.params.keys['sessions'] = JSON.stringify([])

		if (this.props.movies[this.state.target.dataset.index].format == 2) {

			ModalData.title = "Выбор формата"
			var formName = 'selectFormat'
			let form = ModalData.Form(formName)
			ModalData.forms.push(form)

			let options = [{value: 0, title: "2d"}, {value: 1, title: "3d"}]
			form.inputs.push(ModalData.Select("Формат", 'format', 0, options))

			form.inputs.push(ModalData.Button("Добавить", (e) => {
				e.preventDefault()
				let formData = $(document.forms[formName]).serializeArray()
				formData.forEach((data) => {
					body.params.keys[data.name] = Number(data.value)
				})

				ModalData.close()

				Ajax.send("/admin", body).then((res) => {
					scheduleList.get()
				})
			}))

			ModalData.open()
		} else {
			body.params.keys['format'] = Number(this.props.movies[this.state.target.dataset.index].format)

			Ajax.send("/admin", body).then((res) => {
				scheduleList.get()
			})
		}


	}
	render () {
		return (
			<div id="moviesList" className="col-sm-4 col-md-4 col-lg-4 moviesList">
				<div className="moviesList-buttons">
					<button className="btn btn-success" onClick={this.add}>add</button>
					<button className="btn btn-danger" onClick={this.del}>del</button>
					<button className="btn btn-warning" onClick={this.update}>edit</button>
					<button className="btn btn-default" onClick={this.addInToSchedule}>edit</button>
				</div>
				<ul className="list-unstyled">
					{
						this.props.movies.map((movie, i) => {
							let format;
							switch (movie.format) {
								case 0:
									format = "2d"
								break
								case 1:
									format = "3d"
								break
								case 2:
									format = "2d + 3d"
								break
							}
							return 	<li className="movie" onClick={this.changeTarget} key={i} data-index={i}>
										<div data-index={i} data-index={i} className="movieHover"></div>
										<div data-index={i} className="movieName">{movie.name}</div>
										<div data-index={i} className="movieFormat">{'Форм.: ' + format}</div>
										<div data-index={i} className="movieDuration">{'Прод.: ' + movie.duration + ' мин.'}</div>
										<div data-index={i} className="movieGenre">{'Жанр: ' + this.props.genres[movie.genre]}</div>
									</li>
						})
					}
				</ul>
			</div>

		)
	}
}