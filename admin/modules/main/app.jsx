'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import Ajax from './tools/ajax.jsx'
import Top from './top.jsx'
import Body from './body.jsx'
import ModalWin from './modalWin.jsx'

class App extends React.Component {
	render () {
		return (

			<div className="app">
				<ModalWin />
				<Top />
				<Body />
			</div>

		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))