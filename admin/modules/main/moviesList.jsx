'use strict'

import React from 'react'
import Ajax from './tools/ajax.jsx'

export default class MoviesList extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			movies: []
		}
	}
	componentDidMount () {
		let body = {
			module: 'main',
			action: 'get',
			params: {
				keys:{
					key0: "*",
					key1: "rowid"
				},
				selectors:{}
			}
		}
		Ajax.send('/admin', body).then((res) => {
			console.log(res)
			this.setState({
				movies: res
			})
		})
	}
	render () {
		return (
			<div className="moviesList col-lg-3">
				<div className="moviesList-buttons">
					<button className="btn btn-success">add</button>
				</div>
				<ul className="list-unstyled">
					{
						this.state.movies.map((movie, i) => {
							let format;
							if (movie.format == 0) {
								format = "2d"
							} else {
								format = "3d"
							}
							return <li key={i}>{movie.name + " " + format}</li>
						})
					}
				</ul>
			</div>

		)
	}
}