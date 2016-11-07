'use strict'

import React from 'react'
import Schedule from './schedule.jsx'

export default class Content extends React.Component {
	render () {
		return (
			<div className="content">
				<Schedule />
			</div>
		)
	}
}