'use strict'

import $ from 'jquery'

 class Ajax {
	send (url, data) {
		return new Promise ((resolve, reject) => {
			$.ajax({
				url: url,
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
}

export default new Ajax()