'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import Ajax from './tools/ajax.jsx'
import Top from './top.jsx'
import Body from './body.jsx'
import ModalWin from './modalWin.jsx'

// function update () {
// 	var body = {
// 		module: 'main',
// 		action: 'update',
// 		params: {
// 			keys:{
// 				name: 'Batman'
// 			},
// 			selector:{
// 				rowid: 2
// 			}
// 		}
// 	}
// 	test(body)
// }
function get () {
	var body = {
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
	Ajax.send('/admin', body)
}
// function del () {
// 	var body = {
// 		module: 'main',
// 		action: 'del',
// 		params: {
// 			keys:{},
// 			selectors:{
// 				rowid: 6
// 			}
// 		}
// 	}
// 	test(body)
// }
// function add () {
// 	var body = {
// 		module: 'main',
// 		action: 'add',
// 		params: {
// 			keys:{
// 				name: "Ironman",
// 				format: 0
// 			},
// 			selectors:{}
// 		}
// 	}
// 	test(body)
// }

class App extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			modal: true
		}
	}
	openModalWin () {
		console.log(this)
		this.setState($.extend(this.state, {modal: true}))
	}
	closeModalWin () {
		super.setState({})
		console.log(this)
		//this.setState({modal: false})
	}
	render () {
		return (

			<div className="app">
				{this.state.modal ? <ModalWin 
					successName="Принять" 
					cancelName="Отменить"
					closeModalWin={this.closeModalWin} /> : ""}
				<Top />
				<Body />
			</div>

		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))