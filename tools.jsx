'use strict'

import $ from 'jquery'

 class AjaxClass {
 	constructor () {
 		this.defaultUrl = "http://localhost:80"
 	}
	send (url, data) {
		return new Promise ((resolve, reject) => {
			$.ajax({
				url: this.defaultUrl + url,
				type: 'post',
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify(data),
				success: function (res) {
					resolve(res)
				}
			})
		})
	}
	getBody () {
		return {
			module: '',
			table: 0,
			action: '',
			params: {
				keys: {},
				selectors: {}
			}
		}
	}
	get () {
		$.get("http://xn----7sbeiia6axumbcqds.xn--90aihbhjli4bzf.xn--p1ai/api/getFilms?cityId=113", (data) => {
			console.log(data)
		})
	}
}

export var Ajax = new AjaxClass()