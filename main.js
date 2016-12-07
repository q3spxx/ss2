'use strict'

var express = require('express')
var bp = require("body-parser")
var router = require("./router").init(__dirname)

var app = express()
app.use(bp.json())
app.use(bp.urlencoded({extended: true}));
router.init(app)

app.listen(80)