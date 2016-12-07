'use strict'

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

class Database {
	constructor (table) {
		this.table = table
		this.db = db
	}
	add (keys) {
		let keysArr = []
		let valuesArr = []
		for (let key in keys) {
			keysArr.push(key)
			valuesArr.push(this.checkType(keys[key]))
		}
		return new Promise((resolve, reject) => {
			this.db.run("INSERT INTO "+ this.table + " (" + keysArr.join(",") + ") VALUES ("  + valuesArr.join(",") + ")", (err, rows) => {
				if (err) {
					console.log(err)
					reject(err)
					return
				}

				resolve({description: "Row added"})
			})
		})
	}
	get (keys, selectors) {
		let keysArr = []
		let selectorsArr = []
		let selectorsStr = ""
		for (let key in keys) {
			keysArr.push(keys[key])
		}
		for (let selector in selectors) {
			selectorsArr.push(selector + "=" + this.checkType(selectors[selector]))
		}
		if (selectorsArr.length > 0) {
			selectorsStr += " WHERE " + selectorsArr.join(",")
		}
		return new Promise((resolve, reject) => {
			this.db.all("SELECT " + keysArr.join(",") + " FROM " + this.table + selectorsStr, (err, rows) => {
				if (err) {
					console.log(err)
					reject(err)
					return
				}

				resolve(rows)
			})
		})
	}
	update (keys, selectors) {
		var keysArr = []
		var selectorsArr = []
		for (let key in keys) {
			keysArr.push(key + "=" + this.checkType(keys[key]))
		}
		for (let selector in selectors) {
			selectorsArr.push(selector + "=" + this.checkType(selectors[selector]))
		}
		return new Promise((resolve, reject) => {
			db.run("UPDATE " + this.table + " SET " + keysArr.join(",") + " WHERE " + selectorsArr.join(","), (err, rows) => {
				if (err) {
					console.log(err)
					reject(err)
					return
				}
				resolve({description: "Database updated"})
			})
		})
	}
	del (selectors) {
		var selectorsArr = []
		for (let selector in selectors) {
			selectorsArr.push(selector + "=" + this.checkType(selectors[selector]))
		}
		return new Promise((resolve, reject) => {
			db.run("DELETE FROM " + this.table + " WHERE " + selectorsArr.join(","), (err, rows) => {
				if (err) {
					console.log(err)
					reject(err)
					return
				}
				resolve({description: "Row deleted"})
			})
		})
	}
	checkType (value) {
		if (typeof value == 'string') {
			return "'" + value + "'"
		}
		return value
	}
}

module.exports.getModel = table => new Database(table)