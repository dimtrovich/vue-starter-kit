import fluidStorage from 'fluid-storage'
import Vue from 'vue'

const storage = {
	local  : fluidStorage.init('app', 'localstorage'),
	session: fluidStorage.init('app', 'sessionstorage')
}

Vue.use({ install: (Vue, options) => {
	Vue.$storage = storage
    window.$storage = storage

	Object.defineProperties(Vue.prototype, {
		$storage: {
			get: () => storage
		},
	})
}})

export default storage