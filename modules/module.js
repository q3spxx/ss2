'use strict'

var db = require('../db')

class Module {
	update (table, params) {
		let model = db.getModel(this.table[Number(table)])
		return model.update(params.keys, params.selectors)
	}
	get (table, params) {
		let model = db.getModel(this.table[Number(table)])
		return model.get(params.keys, params.selectors)
	}
	del (table, params) {
		let model = db.getModel(this.table[Number(table)])
		return model.del(params.selectors)
	}
	add (table, params) {
		let model = db.getModel(this.table[Number(table)])
		return model.add(params.keys)
	}
}

module.exports = new Module()