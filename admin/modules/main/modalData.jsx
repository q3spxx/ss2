'use strict'
import React from 'react'

var ModalData = {
	module: false,
	action: false,
	open: false,
	close: false,
	update: false,
	title: "",
	Form: false,
	Input: false,
	Select: false,
	Button: false,
	forms: [],
	warnings: [],
	default () {
		this.module = false
		this.action = false
		this.title = ''
		this.forms = []
		this.warnings = []
	}
}

export default ModalData