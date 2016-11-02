var test = function () {
	$.ajax({
		url: '/admin',
		type: 'post',
		contentType: 'application/json',
		dataType: 'json',
		data: "",
		success: function (res) {
			console.log(res)
		}
	})
}