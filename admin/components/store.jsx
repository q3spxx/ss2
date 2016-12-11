import EventEmitter from 'events'
import StoreConsts from './storeConsts.jsx'
import {Ajax} from '../../tools.jsx'
import sha1 from 'sha1'
import dispatcher from './dispatcher.jsx'

var Store = {
	addChangeListener (callback) {
		this.on('change', callback)
	},
	removeChangeListener (callback) {
		this.removeListener('change', callback)
	},
	addErrorListener (callback) {
		this.on('error', callback)
	},
	removeErrorListener (callback) {
		this.removeListener('error', callback)
	}
}

var Authorization = {
	__proto__: new EventEmitter(),
	access: false,
	login: localStorage.login ? localStorage.login : false,
	token: localStorage.token ? localStorage.token : false,
	error: false,
	errorMess: false,
	errorHandle (mess) {
		this.error = true
		this.errorMess = mess
		this.emit('error')
	},
	getErrorMess () {
		return this.errorMess
	},
	getError () {
		return this.error
	},
	setLogin (login) {
		localStorage.login = login
		this.login = login
	},
	setToken (token) {
		localStorage.token = token
		this.token = token
	},
	getAccessByToken () {
		if (!this.login || !this.token) {
				location.assign("#/auth")
			return
		}
		let body = Ajax.getBody()
		body.module = 'auth'
		body.table = 0
		body.action = "check-token"
		body.params.selectors.token = this.token,
		body.params.selectors.login = this.login
		Ajax.send("/auth", body).then((res) => {
			if (res.access) {
				this.access = true
				this.error = false
				location.assign("#/admin")
			}
			this.emit('change')
		}, (err) => {
			this.error = true
			this.emit('error')
			console.error(err)
		})
	},
	getTokenFromServer (login, pass) {
		let body = Ajax.getBody()
		body.module = "auth",
		body.table = 0,
		body.action = "get-token",
		body.params.selectors.login = login
		body.params.selectors.pass = sha1(pass)
		Ajax.send("/auth", body).then((res) => {
			if (res.access) {
				this.setLogin(login)
				this.setToken(res.token)
				dispatcher.dispatch({actionType: StoreConsts.AUTORIZATION})
			} else {
				dispatcher.dispatch({
					actionType: 'AUTORIZATION_ERROR',
					mess: 'Неправильный логин или пароль'
				})
			}
		}, (err) => {
			console.error("Ошибка соединения с сервером")
				dispatcher.dispatch({
					actionType: 'AUTORIZATION_ERROR',
					mess: 'Ошибка соединения с сервером'
				})
		})
	}
}
export var Authorization = Object.assign(Authorization, Store)

var DataStore = {
	__proto__: new EventEmitter(),
	genres: [],
	rating: [],
	getGenres () {
		return this.genres
	},
	getRating () {
		return this.rating
	},
	loadGenres () {
		var body = Ajax.getBody()
		body.module = "main"
		body.table = 2
		body.action = "get"
		body.params.keys.key0 = "value"
		body.params.selectors.name = "genres"
		Ajax.send('/admin', body).then((res) => {
			this.genres = JSON.parse(res[0].value)
			this.emit('change')
		})
	},
	loadRating () {
		var body = Ajax.getBody()
		body.module = "main"
		body.table = 2
		body.action = "get"
		body.params.keys.key0 = "value"
		body.params.selectors.name = "rating"
		Ajax.send('/admin', body).then((res) => {
			this.rating = JSON.parse(res[0].value)
			this.emit('change')
		})
	}
}
export var DataStore = Object.assign(DataStore, Store)

var MoviesStore = {
	__proto__: new EventEmitter(),
	movies: [],
	getMovies () {
		return this.movies
	},
	loadMovies () {
		var body = Ajax.getBody()
		body.module = "main"
		body.table = 0
		body.action = "get"
		body.params.keys.key0 = "rowid"
		body.params.keys.key1 = "*"
		Ajax.send('/admin', body).then((res) => {
			this.movies = res
			this.emit('change')
		})
	}
}
export var MoviesStore = Object.assign(MoviesStore, Store)

var ScheduleStore = {
	__proto__: new EventEmitter(),
	schedule: [],
	getSchedule () {
		return this.schedule
	},
	loadSchedule () {
		var body = Ajax.getBody()
		body.module = "main"
		body.table = 1
		body.action = "get"
		body.params.keys.key0 = "rowid"
		body.params.keys.key1 = "*"
		Ajax.send('/admin', body).then((res) => {
			res.forEach((elem, i) => {
				elem.price = elem.price === '[]' ? [] : JSON.parse(elem.price)
				elem.sessions = elem.sessions === '[]' ? [] : JSON.parse(elem.sessions)

				for (var j = 0; j < MoviesStore.movies.length; j++) {
					if (elem.movieId === MoviesStore.movies[j].rowid) {
						elem.movie = MoviesStore.movies[j]
						return
					}
				}
			})
			this.schedule = res
			this.emit('change')
		})
	}
}
export var ScheduleStore = Object.assign(ScheduleStore, Store)