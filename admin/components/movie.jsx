import React from 'react'

export default class Movie extends React.Component {
	render () {
		return (
			<li className="movie">
				<span className="movie-rating">{this.props.rating[this.props.movie.rating]}</span>
				<div className="movie-name">{this.props.movie.name}</div>
				<div className="movie-format">{"Формат: " + this.props.formats[this.props.movie.format]}</div>
				<div className="movie-duration">{"Продолжительность: " + this.props.movie.duration + " мин."}</div>
				<div className="movie-genre">{"Жанр: " + this.props.genres[this.props.movie.genre]}</div>
			</li>
		)
	}
}