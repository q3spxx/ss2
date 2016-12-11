import React from 'react'
import {Link} from 'react-router'
import {RaisedButton, Tabs, Tab} from 'material-ui'
import dispatcher from './dispatcher.jsx'
import StoreConsts from './storeConsts.jsx'
import {btn} from '../style/props.jsx'

// Components
import Schedule from './schedule.jsx'

export default class Admin extends React.Component {
	componentDidMount () {
		dispatcher.dispatch({actionType: StoreConsts.LOAD_DATA})
	}
	render () {
		return (
			<div>
				<Link to="main">
					<RaisedButton className="btn" label="К выбору" labelStyle={btn}/>
				</Link>
				<Tabs className='main-tabs' inkBarStyle={{backgroundColor: '#FFA000'}} >
					<Tab className='main-tab' label="Расписание" >
						<Schedule />
					</Tab>
					<Tab className='main-tab' label="Ценовая политика">
					</Tab>
					<Tab className='main-tab' label="Модули">
					</Tab>
					<Tab className='main-tab' label="Настройки">
					</Tab>
				</Tabs>
			</div>
		)
	}
}