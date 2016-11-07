'use strict'

var db = require('db')

class Module {
	update (params) {
		let model = db.getModel(this.table)
		return model.update(params.keys, params.selector)
	}
	get (params) {
		let model = db.getModel(this.table)
		return model.get(params.keys, params.selectors)
	}
	del (params) {
		let model = db.getModel(this.table)
		return model.del(params.selectors)
	}
	add (params) {
		let model = db.getModel(this.table)
		return model.add(params.keys)
	}
}

module.exports = new Module()