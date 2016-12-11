'use strict'

var Module = require('../module.js')
var db = require('../../db')

class Auth {
	constructor () {
		this.__proto__ = Module
		this.table = ['users']
		this.getToken = function () {
			var numbers = []
			var token = ''
			for (var i = 0; i < 16; i++) {
				numbers.push(Math.floor(Math.random() * 16))
			}
			numbers.forEach((number) => {
				token += number.toString(16)
			})
			return token
		}
		this.checkUser = function (table, params) {
			var modelUsers = db.getModel(this.table[table])
			return modelUsers.get({key0: "*"}, {login: params.selectors.login}).then((result) => {
				if (result.length > 0 && result[0].pass === params.selectors.pass) {
					var token = this.getToken()
					var tokens
					if (result[0].token ==='[]') {
						tokens = []
					} else {
						tokens = JSON.parse(result[0].token)
					}
					tokens.push(token)
					modelUsers.update({token: JSON.stringify(tokens)}, {login: params.selectors.login})
					return {
						access: true,
						token: token
					}
				} else {
					return {
						access: false
					}
				}
			})
		}
		this.checkToken = function (table, params) {
			var modelUsers = db.getModel(this.table[table])
			return modelUsers.get({key0: "*"}, {login: params.selectors.login}).then((res) => {
				if (res.length > 0) {
					if (res[0].token !== '[]') {
						var tokens = JSON.parse(res[0].token)
						for (var i = 0; i < tokens.length; i++) {
							if (tokens[i] === params.selectors.token) {
								return {access: true, login: res[0].login}
							}
						}
					}					
				}
				return {access: false}
			})
		}
	}
}
module.exports =  new Auth()