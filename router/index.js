'use strict'

var log = require("../logs")

class Router {
	constructor (dir) {
		this.dir = dir
		this.postPaths = {
			admin: "/admin/controller"
		}
		this.getPaths = {
			admin: "/admin/template/index.html"
		}
	}
	init (app) {
		for (var url in this.postPaths) {
			app.post("/" + url, (req, res) => {
				var controller = require(this.dir + this.postPaths[url])
				console.log(req.body)
				controller.handler(req).then((response) => {
					res.send(JSON.stringify(response))
				}, (err) => {
					log.makeNote(err)
					res.send(JSON.stringify(err))
				})
			})
		}

		app.get("*", (req, res) => {
			let request = req.url.split("/")
			request.splice(0, 1)
			switch (request[0]) {
				case 'admin':
					switch (request[1]) {
						case 'script':
							res.sendFile(this.dir + "/admin/template/common.js")
						break
						case 'css':
							res.append('ContentType', 'text/css')
							res.sendFile(this.dir + "/admin/template/style.css")
						break
						default:
							res.sendFile(this.dir + "/admin/template/index.html")
					}
				break
				case 'lib':
					res.sendFile(this.dir + "/lib/" + request[1])
				break
				default:
					res.send("Page not found")
			}
		})
	}
}
module.exports.init = dir => new Router(dir)