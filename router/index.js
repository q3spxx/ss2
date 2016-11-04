'use strict'

var log = require("../logs")

class Router {
	constructor (dir) {
		this.dir = dir
		this.paths = {
			admin: "/admin/controller"
		}
	}
	init (app) {
		for (var url in this.paths) {
			app.post("/" + url, (req, res) => {
				var controller = require(this.dir + this.paths[url])
				controller.handler(req).then((response) => {
					res.send(JSON.stringify(response))
				}, (err) => {
					log.makeNote(err)
					res.send(JSON.stringify(err))
				})
			})
		}
	}
}
module.exports.init = dir => new Router(dir)