import React from 'react'
import Schedule from './schedule.jsx'
import Auth from './auth.jsx'
import Provider from 'material-ui/styles/MuiThemeProvider'
import {Tabs, Tab} from 'material-ui'
import {Ajax} from '../../tools.jsx'
import {Router, Route, hashHistory} from 'react-router'

export default class App extends React.Component {
	constructor (props) {
		super(props)

		let isAuth = false
		if (isAuth in localStorage) {
			isAuth = localStorage.isAuth
		} else {
			localStorage.isAuth = isAuth
		}

		this.state = {
			tab: 1,
			isAuth: isAuth
		}
	}
	Authorizate () {
		localStorage.isAuth = true
		this.setState({
			isAuth: true
		})
	}
	componentDidMount() {
		let body = Ajax.getBody()
		body.module = 'main'
		body.table = 0
		body.action = "get"
		body.params.keys.key0 = "rowid"
		body.params.keys.key1 = "*"
		Ajax.send("/admin", body).then((res) => {
			console.log(res)
		})
	}
	render () {
		return (
			<Provider>
				{
					!this.state.isAuth ? <Auth /> :
					<Router history={hashHistory}>
						<Route path="/" component={Schedule} />
					</Router>
				}
			</Provider>
		)
	}
}