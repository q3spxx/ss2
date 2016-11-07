'use strict'
import React from 'react'

export default class ModalWin extends React.Component {
	render () {
		return (
			<div className="modalWin">
			{this.props.successName ? <button className="btn btn-success">{this.props.successName}</button> : ""}
			{this.props.cancelName ? <button className="btn btn-default">{this.props.cancelName}</button> : ""}
			<button className="btn btn-default" onClick={this.props.closeModalWin}>Закрыть</button>
			</div>
		)
	}
}