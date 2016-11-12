'use strict'

var Module = require('../module.js')
var db = require('db')

class Main {
	constructor () {
		this.__proto__ = Module
		this.table = ['movies', 'schedule']
		this.delAll = function (table, params) {
			var modelMovies = db.getModel(this.table[Number(table)])
			var modelSchedule = db.getModel(this.table[1])

			return modelMovies.del(params.selectors).then((result) => {
					return modelSchedule.del({movieId: params.selectors.rowid})
				})
			
		}
		this.updateAll = function (table, params) {
			var modelMovies = db.getModel(this.table[Number(table)])
			var modelSchedule = db.getModel(this.table[1])

			if (Number(params.keys.format) != 2) {
				return modelMovies.update(params.keys, params.selectors).then((result) => {
					return modelSchedule.update({format: Number(params.keys.format)}, {movieId: Number(params.selectors.rowid)})
				})
			}

			return modelMovies.update(params.keys, params.selectors)
		}
	}
}
module.exports = new Main()