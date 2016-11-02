var db = require('db')
var express = require('express')
var bp = require("body-parser");

var app = express()
app.use(bp.json())
app.use(bp.urlencoded({extended: true}));

app.get("*", function (req, res) {
	res.sendFile(__dirname + req.path)
})
app.post("/admin", function (req, res) {
	db.get().then(function (rows) {
		res.send(JSON.stringify(rows))
	}).catch(function (err) {
		console.log(err)
		res.send(JSON.stringify({
			err: true,
			description: "Database error"
		}))
	})
})
//db.add('Расплата', 1)
//db.set(3, 'marvel')
//console.log(movies)
// function first () {
// 	return new Promise(function (resolve, reject) {
// 		setTimeout(function () {
// 			resolve('first')
// 		}, 2000)
// 	})
// }

// function second (func) {
// 	return new Promise(function (resolve, reject) {
// 		resolve(func + ' second')
// 	})
// }

// first().then(function (func) {
// 	return second(func)
// }).then(function (func2) {
// 	console.log(func2)
// })

app.listen(80)