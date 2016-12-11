'use strict'

class AuthController {
	handler (req) {
		try {
			let module = require("../modules/" + req.body.module)
			switch (req.body.action) {
				case "get-token":
					return module.checkUser(req.body.table, req.body.params)
				break
				case "check-token":
					return module.checkToken(req.body.table, req.body.params)
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
module.exports = new AuthController()