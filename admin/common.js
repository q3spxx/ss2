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