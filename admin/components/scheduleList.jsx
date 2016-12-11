import React from 'react'
require('../css/scheduleList.css')

export default class ScheduleList extends React.Component {
	render () {
		return (
			<div className="scheduleList">
				{
					this.props.schedule.map((row, i) => {
						return (
							<div key={i}>{row.movie.name}</div>
						)
					})
				}
			</div>
		)
	}
}