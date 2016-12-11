import React from 'react'
import {RaisedButton, TextField} from 'material-ui'
import {Ajax} from '../../tools.jsx'
import dispatcher from './dispatcher.jsx'
import {Authorization} from './store.jsx'
import StoreConsts from './storeConsts.jsx'
require('../css/auth.css')

export default class Auth extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			login: '',
			pass: ''
		}
		this.enter = this.enter.bind(this)
		this.send = this.send.bind(this)
	}
	send () {
		if (this.state.login === '') {
			dispatcher.dispatch({
				actionType: 'AUTORIZATION_ERROR',
				mess: 'Пожалуйста введите логин'
			})
			return
		}
		if (this.state.pass === '') {
			dispatcher.dispatch({
				actionType: 'AUTORIZATION_ERROR',
				mess: 'Пожалуйста введите пароль'
			})
			return
		}
		dispatcher.dispatch({
			actionType: 'GET_TOKEN_FROM_SERVER',
			login: this.state.login,
			pass: this.state.pass
		})
	}
	changeLogin (e) {
		this.setState({
			login: e.target.value
		})
	}
	changePass (e) {
		this.setState({
			pass: e.target.value
		})
	}
	enter (e) {
		if (e.keyCode === 13) {
			this.send()
		}
	}
	componentDidMount () {
		document.addEventListener('keydown', this.enter)
	}
	componentWillUnmount () {
		document.removeEventListener('keydown', this.enter)
	}
	render () {
		return (
			<div className="auth-form">
				<div className="auth-title">Авторизация</div>
				<TextField value={this.state.login} onChange={this.changeLogin.bind(this)} hintText="Enter login" floatingLabelText="Login" /><br />
				<TextField value={this.state.pass} onChange={this.changePass.bind(this)} type="password" hintText="Enter password" floatingLabelText="Password" /><br />
				<RaisedButton onClick={this.send} label="Отправить" />
			</div>
		)
	}
}