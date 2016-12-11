'use strict'

var log = require("../logs/")
var Auth = require('../modules/auth')

class Router {
	constructor (dir) {
		this.dir = dir
		this.postPaths = {
			admin: "/controllers"
		}
	}
	init (app) {
		app.options("*", (req, res) => {
			res.set({
				"Access-Control-Allow-Headers": "Content-Type",
				"Access-Control-Allow-Methods" : "POST, GET, HEAD",
				"Access-Control-Allow-Origin": "http://localhost:3000"
			})
			res.send()
		})
		app.post("*", (req, res) => {
			res.set({
				"Content-Type": "text/plain",
				"Access-Control-Allow-Origin": "http://localhost:3000"
			})
			switch (req.url) {
				case '/admin':
					var controller = require(this.dir + "/controllers/admin.js")
					controller.handler(req).then((response) => {
						res.send(JSON.stringify(response))
					}, (err) => {
						log.makeNote(err)
						res.send(JSON.stringify(err))
					})
				break
				case '/auth':
					var controller = require(this.dir + "/controllers/auth.js")
					controller.handler(req).then((response) => {
						res.send(JSON.stringify(response))
					}, (err) => {
						log.makeNote(err)
						res.send(JSON.stringify(err))
					})
				break
			}
		})

		app.get("*", (req, res) => {
			var url = req.url.split('/')
			switch (url[url.length - 1]) {
				case 'main.js':
					res.sendFile(this.dir + "/build/main.js")
				break
				case '':
					res.sendFile(this.dir + "/build/index.html")
				break
				case 'index.html':
					res.sendFile(this.dir + "/build/index.html")
				break
				default: res.send("404 Page not found")
			}
		})
	}
}
module.exports.init = dir => new Router(dir)