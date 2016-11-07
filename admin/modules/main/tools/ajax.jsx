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
}

export default new Ajax()