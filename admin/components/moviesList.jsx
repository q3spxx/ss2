import React from 'react'
import Movie from './movie.jsx'
import {DataStore} from './store.jsx'
import {RaisedButton} from 'material-ui'
import {btn, btn_add} from '../style/props.jsx'
require('../css/moviesList.css')

export default class MoviesList extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			genres: DataStore.getGenres(),
			rating: DataStore.getRating()
		}
		this.change = this.change.bind(this)
	}
	change () {
		this.setState({
			genres: DataStore.getGenres(),
			rating: DataStore.getRating()
		})
	}
	componentDidMount() {
		DataStore.addChangeListener(this.change)
	}
	componentWillUnmount () {
		DataStore.removeChangeListener(this.change)
	}
	render () {
		return (
			<div className="moviesList">
				<RaisedButton className="btn btn-add" labelStyle={btn} fullWidth={true} label="Добавить"  overlayStyle={btn_add}/>
				<ul>
				{
					this.props.movies.map((movie, i) => {
						return (
							<Movie key={i} movie={movie} genres={this.state.genres} rating={this.state.rating}  formats={this.props.formats} />
						)
					})
				}
				</ul>
			</div>
		)
	}
}