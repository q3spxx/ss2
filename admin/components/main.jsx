import React from 'react'
import {Link} from 'react-router'
import {RaisedButton} from 'material-ui'

export default class Main extends React.Component {
	render () {
		return (
			<div>
				<Link to="admin">
					<RaisedButton label="Admin" />
				</Link>
				<Link to="screens">
					<RaisedButton label="Screens" />
				</Link>
			</div>
		)
	}
}