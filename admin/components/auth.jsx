import React from 'react'
import {RaisedButton, TextField} from 'material-ui'

export default class Auth extends React.Component {
	render () {
		return (
			<div>
				<TextField label="login" name="login" id="login" />
				<TextField label="password" name="pass" id="pass" />
				<RaisedButton label="Отправить" />
			</div>
		)
	}
}