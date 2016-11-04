'use strict'

var Module = require('./module.js')

class Main {
	constructor () {
		this.table = 'movies'
		this.__proto__ = Module
	}
}
module.exports = new Main()