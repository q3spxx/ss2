'use strict'

import React from 'react'
import MoviesList from './moviesList.jsx'

export default class Schedule extends React.Component {
	render () {
		return (
			<div className="schedule row">
				<MoviesList />
			</div>

		)
	}
}