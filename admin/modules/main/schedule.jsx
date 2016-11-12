'use strict'

import React from 'react'
import MoviesList from './moviesList.jsx'
import ScheduleList from './scheduleList.jsx'

export default class Schedule extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			movies: [],
			genres: ['Боевик', 'Драма', 'Комедия', 'Мелодрама', 'Мультфильм', 'Приключения', 'Ужасы', 'Фантастика', 'Фэнтези']
		}
		this.update = this.update.bind(this)
	}
	update (data) {
		this.setState({
			movies: data
		})
	}
	render () {
		return (
			<div className="schedule row">
				<MoviesList movies={this.state.movies} genres={this.state.genres} update={this.update}/>
				<ScheduleList movies={this.state.movies}  genres={this.state.genres}/>
			</div>

		)
	}
}