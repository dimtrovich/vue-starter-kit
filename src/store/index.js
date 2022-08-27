import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {}
let actions = {}
let getters = {}
let modules = {}
let mutations = {}

const files = require.context('.', false, /[A-Za-z0-9-_,\s]+\.store\.js$/i)
files.keys().forEach(key => {
	const module = files(key).default

	if (module.state) {
		state = {...state, ...module.state}
	}
	if (module.actions) {
		actions = {...actions, ...module.actions}
	}
	if (module.getters) {
		getters = {...getters, ...module.getters}
	}
	if (module.modules) {
		modules = {...modules, ...module.modules}
	}
	if (module.mutations) {
		mutations = {...mutations, ...module.mutations}
	}
})

export default new Vuex.Store({
  	state,
  	mutations,
  	actions,
	modules,
	getters
})