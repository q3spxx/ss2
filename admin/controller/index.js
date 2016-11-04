'use strict'

class Admin {
	handler (req) {
		try {
			let module = require("../modules/" + req.body.module)
			switch (req.body.action) {
				case "get":
					return module.get(req.body.params)
				break
				case "del":
					return module.del(req.body.params)
				break
				case 'add':
					return module.add(req.body.params)
				break
				case 'update':
					return module.update(req.body.params)
				break
			}
		} catch (e) {
			console.log(e)
			return new Promise((resolve, reject) => {
				throw e
			})
		}
	}
}
module.exports = new Admin()