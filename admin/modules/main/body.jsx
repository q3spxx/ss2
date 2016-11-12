'use strict'

import React from 'react'
import Content from './content.jsx'

export default class Body extends React.Component {
	render () {
		return (

			<div className="body container-fluid">
				<div className="bookmarks">
					<div className="bookmark">Расписание</div>
					<div className="bookmark">Шаблоны</div>
					<div className="bookmark">Модули</div>
				</div>
				<Content />
			</div>

		)
	}
}