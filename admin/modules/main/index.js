'use strict'

var Module = require('../module.js')

class Main {
	constructor () {
		this.__proto__ = Module
		this.table = 'movies'
	}
}
module.exports = new Main()