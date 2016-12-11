import StoreConsts from './storeConsts.jsx'
import {Dispatcher} from 'flux'
import {Authorization, MoviesStore, ScheduleStore, DataStore} from './store.jsx'

var dispatcher = new Dispatcher()
var AuthorizationId = dispatcher.register((payload) => {
	switch (payload.actionType) {
		case StoreConsts.AUTORIZATION:
			Authorization.getAccessByToken()
		break
		case StoreConsts.AUTORIZATION_ERROR:
			Authorization.errorHandle(payload.mess)
		break
		case StoreConsts.GET_TOKEN_FROM_SERVER:
			Authorization.getTokenFromServer(payload.login, payload.pass)
		break
	}
})
DataStore.dispatchToken = dispatcher.register((payload) => {
	switch (payload.actionType) {
		case StoreConsts.LOAD_DATA:
			DataStore.loadGenres()
			DataStore.loadRating()
		break
	}
})
MoviesStore.dispatchToken = dispatcher.register((payload) => {
	switch (payload.actionType) {
		case StoreConsts.LOAD_MOVIES:
			dispatcher.waitFor([DataStore.dispatchToken])
			MoviesStore.loadMovies()
		break
	}
})
ScheduleStore.dispatchToken = dispatcher.register((payload) => {
	switch (payload.actionType) {
		case StoreConsts.LOAD_SCHEDULE:
			dispatcher.waitFor([MoviesStore.dispatchToken])
			ScheduleStore.loadSchedule()
		break
	}
})

export default dispatcher