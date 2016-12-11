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
				},
				error: function (err) {
					reject(err)
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
}

export var Ajax = new AjaxClass()