'use strict'

var db = require('db')

var Admin = {
	get: function () {
		let model = db.getModel('movies')
		return new Promise((resolve, reject) => {
			model.get(["rowid", "*"]).then((rows) => {
				resolve(rows)
			})
		})
	},
	del: function (params) {
		let model = db.getModel(params.table)
		return new Promise((resolve, reject) => {
			model.del(params.select).then((rows) => {
				resolve(rows)
			})
		})
	}
}

exports.get = Admin.get
exports.del = Admin.del