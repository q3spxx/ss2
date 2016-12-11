import React from 'react'
import {RaisedButton} from 'material-ui'
import {MoviesStore, ScheduleStore} from './store.jsx'
import dispatcher from './dispatcher.jsx'

//Components
import MoviesList from './moviesList.jsx'
import ScheduleList from './scheduleList.jsx'

export default class Schedule extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			formats: ['2d', '3d', '2d + 3d'],
			movies: MoviesStore.getMovies(),
			schedule: ScheduleStore.getSchedule()
		}
		this.changeMovies = this.changeMovies.bind(this)
		this.changeSchedule = this.changeSchedule.bind(this)
	}
	changeMovies () {
		this.setState({
			movies: MoviesStore.getMovies()
		})
	}
	changeSchedule () {
		this.setState({
			schedule: ScheduleStore.getSchedule()
		})
	}
	componentDidMount () {
		MoviesStore.addChangeListener(this.changeMovies)
		ScheduleStore.addChangeListener(this.changeSchedule)
		dispatcher.dispatch({actionType: 'LOAD_MOVIES'})
		dispatcher.dispatch({actionType: 'LOAD_SCHEDULE'})
	}
	componentWillUnmount () {
		MoviesStore.removeChangeListener(this.changeMovies)
		ScheduleStore.removeChangeListener(this.changeSchedule)
	}
	render () {
		return (
			<div>
				<MoviesList movies={this.state.movies} formats={this.state.formats} />
				<ScheduleList schedule={this.state.schedule} formats={this.state.formats} />
			</div>
		)
	}
}