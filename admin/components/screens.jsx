import React from 'react'
import {Link} from 'react-router'
import {RaisedButton} from 'material-ui'

export default class Screens extends React.Component {
	render () {
		return (
			<div>
				<Link to="main">
					<RaisedButton label="Main" />
				</Link>
			</div>
		)
	}
}