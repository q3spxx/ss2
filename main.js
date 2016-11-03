'use strict'

var express = require('express')
var bp = require("body-parser");

var app = express()
app.use(bp.json())
app.use(bp.urlencoded({extended: true}));

app.get("*", function (req, res) {
	res.sendFile(__dirname + req.path)
})
app.post("/admin", function (req, res) {
	console.log(req.body)
	var admin = require(__dirname + '/admin/controller')
	switch (req.body.action) {
		case 'get':
			admin.get().then((response) => {res.send(JSON.stringify(response))})
		break
		case 'delete':
			admin.del(req.body.params).then((response) => {res.send(JSON.stringify(response))})
		break
	}
})

app.listen(80)