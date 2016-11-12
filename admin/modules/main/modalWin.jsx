'use strict'
import React from 'react'
import ModalData from './modalData.jsx'

export default class ModalWin extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			modal: false
		}
		this.openModalWin = this.openModalWin.bind(this)
		this.closeModalWin = this.closeModalWin.bind(this)
		this.changeValue = this.changeValue.bind(this)
		this.update = this.update.bind(this)
		ModalData.open = this.openModalWin
		ModalData.close = this.closeModalWin
		ModalData.update = this.update
		ModalData.Input = this.Input.bind(this)
		ModalData.Select = this.Select.bind(this)
		ModalData.Button = this.Button.bind(this)
		ModalData.Form = this.Form
	}
	openModalWin () {
		this.setState({modal: true})
	}
	closeModalWin (e) {
		if (e) e.preventDefault()
		this.setState({modal: false})
		ModalData.default()
	}
	update () {
		this.setState({})
	}
	changeValue (e) {
		ModalData.forms[Number(e.target.dataset.form)].inputs[Number(e.target.dataset.index)].value = e.target.value
		this.setState({})
	}
	Form (name, blocks) {
		return {
			inputs: [],
			name: name,
			blocks: blocks != undefined ? blocks : 1,
			render (i) {
				var blocks = []
				for (let i = 0; i < this.blocks; i++) {
					blocks.push(this.inputs)
				}
				return (
					<form key={i} name={this.name}>
						{
							blocks.map((block, k) => {
								return (
									<div key={k} className="formBlock">
										{
											this.inputs.map((input, j) => {
												return input.render(j, i)
											})
										}
									</div>
								)
							})
						}
					</form>
				)
			}
		}
	}
	Input (title, type, key, value) {
		var changeValue = this.changeValue
		return {
			type: type,
			key: key,
			value: value,
			title: title,
			render (i, form) {
				return (
					<div key={i} className="form-group">
						<label htmlFor={"input-" + this.key}>{this.title}</label>
						<input id={"input-" + this.key} className="form-control" data-form={form} data-index={i} type={this.type} value={this.value} name={this.key} onChange={changeValue}></input>
					</div>
				)
			}
		}
	}
	Select(title, key, defaultValue, options) {
		return {
			key: key,
			defaultValue: defaultValue,
			title: title,
			options: options,
			render (i, form) {
				return (
					<div key={i} className="form-group">
						<label htmlFor={"select-"+ this.key}>{this.title}</label>
						<select id={"select-"+ this.key} data-form={form} name={this.key} className="form-control" defaultValue={this.defaultValue}>
						{
							this.options.map((option, j) => {
								return (
									<option key={j} value={option.value}>{option.title}</option>
								)
							})
						}
						</select>
					</div>
				)
			}
		}
	}
	Button (title, callback) {
		return {
			title: title,
			callback: callback,
			render (i, form) {
				return (
					<button key={i} data-form={form} className="btn btn-success" onClick={this.callback} >{this.title}</button>
				)
			}
		}
	}
	render () {
		return (
			<div>
				{ this.state.modal ? <div className="modalWin">
					<div className="formTitle"><strong>{ModalData.title}</strong></div>
					{
						ModalData.warnings.map((warning, i) => {
							return (
								<span key={i}><strong>{warning.text}</strong></span>
							)
						})
					}
					{
						ModalData.forms.map((form, i) => {
							return form.render(i)
						})
					}
					<button className="btn btn-danger" onClick={this.closeModalWin}>Закрыть</button>
				</div> : "" }
			</div>
		)
	}
}