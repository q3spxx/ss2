'use strict'

var fs = require('fs')

class Log {
	makeNote (error) {
		let date = new Date()
		fs.open("logs/log.txt", "a", (err, fd) => {
			fs.write(fd, date + " : " + error.code + "\r\n")
			fs.close(fd, () => {
			})
		})
	}
}

module.exports = new Log()