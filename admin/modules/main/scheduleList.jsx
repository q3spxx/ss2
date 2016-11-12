'use strict'

import React from 'react'
import Ajax from './tools/ajax.jsx'
import ModalData from './modalData.jsx'
import {scheduleList} from './tools/helper.jsx'
import $ from 'jquery'

export default class ScheduleList extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			schedule: []
		}
		this.get = this.get.bind(this)
		this.del = this.del.bind(this)
		this.edit = this.edit.bind(this)
		scheduleList.get = this.get
	}
	get () {
		let body = Ajax.getBody()
		body.module = "main"
		body.table = 1
		body.action = "get"
		body.params.keys['key0'] = "*"
		body.params.keys['key1'] = "rowid"
		return Ajax.send('/admin', body).then((res) => {
			res.forEach((film) => {
				for (let i = 0; i < this.props.movies.length; i++) {
					if (this.props.movies[i].rowid == film.movieId) {
						film.movie = this.props.movies[i]
						break
					}
				}

				film.sessions = JSON.parse(film.sessions)
			})
			console.log(res)
			this.setState({
				schedule: res
			})
		})
	}
	del (e) {
		var film = this.state.schedule[Number(e.target.dataset.index)]
		ModalData.title = "Удаление"
		var formName = 'delFilm'
		let form = ModalData.Form(formName)
		ModalData.forms.push(form)

		ModalData.warnings.push({
			text: "Вы действительно хотите удалить ?"
		})

		form.inputs.push(ModalData.Button("Удалить", (e) => {

			e.preventDefault()
			let body = Ajax.getBody()
			body.module = "main"
			body.table = 1
			body.action = "del"
			body.params.selectors["rowid"] = film.rowid

			ModalData.close()

			Ajax.send("/admin", body).then((res) => {
				this.get()
			})
		}))
		ModalData.open()
	}
	edit (e) {

		var film = this.state.schedule[Number(e.target.dataset.index)]

		ModalData.warnings.push({
			text: film.movie.name + " " + (film.format == 0 ? '2d' : '3d')
		})

		var formatFormName = 'format'
		let formatForm = ModalData.Form(formatFormName)
		ModalData.forms.push(formatForm)

		let formatOptions
		switch (film.movie.format) {
			case 0: formatOptions = [{value: 0, title: '2d'}]
			break
			case 1: formatOptions = [{value: 1, title: '3d'}]
			break
			default: formatOptions = [{value: 0, title: '2d'}, {value: 1, title: '3d'}]
		}
		formatForm.inputs.push(ModalData.Select("Формат", "format", film.format, formatOptions))

		ModalData.title = "Сеансы"
		var formName = 'sessions'
		let form = ModalData.Form(formName)
		ModalData.forms.push(form)

		film.sessions.forEach((session) => {
			form.inputs.push(ModalData.Input("", 'time', 'session', session.time))
		})

		var appFormName = 'num'
		let appForm = ModalData.Form(appFormName)
		ModalData.forms.push(appForm)

		let options = []
		for (var i = 1; i < 13; i++) {
			options.push({value: i, title: i})
		}
		appForm.inputs.push(ModalData.Select("", "num", 1, options))

		appForm.inputs.push(ModalData.Button("Добавить", (e) => {
			e.preventDefault()
			for (i = 0; i < Number($('#select-num').val()); i++) {
				if (form.inputs.length > 19) {
					break
				}
				form.inputs.push(ModalData.Input("", 'time', 'session', ''))
			}
			ModalData.update()
		}))

		var priceFormName = 'price'
		let priceForm = ModalData.Form(priceFormName, 1)
		ModalData.forms.push(priceForm)

		priceForm.inputs.push(ModalData.Input("С", "time", "priceStart", "09:00"))
		priceForm.inputs.push(ModalData.Input("До", "time", "priceEnd", "08:59"))
		priceForm.inputs.push(ModalData.Input("Цена", "Number", "price", ""))

		var priceFormButtonName = 'priceButton'
		let priceFormButton = ModalData.Form(priceFormButtonName)
		ModalData.forms.push(priceFormButton)

		priceFormButton.inputs.push(ModalData.Button("Добавить", (e) => {
			e.preventDefault()
			
			for (let i = 0; i < ModalData.forms.length; i++ ) {
				if (ModalData.forms[i].name == "price") {
					ModalData.forms[i].blocks++
					ModalData.update()
					return
				}
			}
		}))

		var actionFormName = 'action'
		let actionForm = ModalData.Form(actionFormName)
		ModalData.forms.push(actionForm)

		actionForm.inputs.push(ModalData.Button("Изменить", (e) => {
			e.preventDefault()
			let sessions = $(document.forms[formName]).serializeArray()
			let price = $(document.forms[priceFormName]).serializeArray()
			console.log(price)
			sessions = sessions.filter((session) => {
				if (session.value == "") return false
				return true
			})
			sessions = sessions.map((session) => {
				return {
					time: session.value
				}
			})
			sessions = sessions.sort((a, b) => {
				let timeA = a.time.split(":")
				let timeB = b.time.split(":")

				if (Number(timeA[0]) < 9) {
					timeA[0] = Number(timeA[0]) + 24
				}
				if (Number(timeB[0]) < 9) {
					timeB[0] = Number(timeB[0]) + 24
				}

				if (Number(timeA[0]) < Number(timeB[0])) {
					return -1
				} else if (Number(timeA[0]) > Number(timeB[0])) {
					return 1
				} else {
					if (Number(timeA[1]) < Number(timeB[1])) {
						return -1
					} else if (Number(timeA[1]) > Number(timeB[1])) {
						return 1
					} else {
						return 0
					}
				}

			})

			let body = Ajax.getBody()
			body.module = "main"
			body.table = 1
			body.action = "update"
			body.params.keys['format'] = Number($('#select-format').val())
			body.params.keys['sessions'] = JSON.stringify(sessions)
			body.params.selectors["rowid"] = film.rowid


			console.log(body)
			return
			ModalData.close()

			Ajax.send("/admin", body).then((res) => {
				this.get()
			})
		}))
		ModalData.open()
	}
	render () {
		return (
			<div className="col-sm-8 col-md-8 col-lg-8 scheduleList">
				<div className="scheduleList-buttons">
					<button className="btn btn-success">Копировать</button>
				</div>
				<ul className="list-unstyled">
					{
						this.state.schedule.map((film, i) => {
							return (
								<li className="film" key={i}>
									<div className="filmTitle">
										<div className="filmName">
											{
												film.movie.name
											}
										</div>
										<div className="filmFormat">Формат: 
											{
												film.format == 0 ? "2d" : "3d"
											}
										</div>
									</div>
									<div className="filmSessions">
									{
										film.sessions.map((session, i)=> {
											return <div className="filmTime" key={i}>{session.time}</div>
										})
									}
									</div>
									<div className="filmButtons">
										<button className="btn btn-warning" onClick={this.edit} data-index={i}>edit</button>
										<button className="btn btn-danger" onClick={this.del} data-index={i}>del</button>
									</div>
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}