'use strict'

var test = function (req) {
	$.ajax({
		url: '/admin',
		type: 'post',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(req),
		success: function (res) {
			console.log(res)
		}
	})
}

function update () {
	var body = {
		module: 'main',
		action: 'update',
		params: {
			keys:{
				name: 'Batman'
			},
			selector:{
				rowid: 2
			}
		}
	}
	test(body)
}
function get () {
	var body = {
		module: 'main',
		action: 'get',
		params: {
			keys:{
				key0: "*",
				key1: "rowid"
			},
			selectors:{}
		}
	}
	test(body)
}
function del () {
	var body = {
		module: 'main',
		action: 'del',
		params: {
			keys:{},
			selectors:{
				rowid: 6
			}
		}
	}
	test(body)
}
function add () {
	var body = {
		module: 'main',
		action: 'add',
		params: {
			keys:{
				name: "Ironman",
				format: 0
			},
			selectors:{}
		}
	}
	test(body)
}