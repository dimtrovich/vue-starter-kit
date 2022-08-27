import Vue from 'vue'

const files = require.context('.', true, /\.js$/)
const modules = []
files.keys().forEach(key => {
	if (!key.includes('index')) {
		const module = files(key)
		key  = key.replace(/(\.\/|\.js)/g, '').split('/')
		let name = key.reverse()[0]
		if (module.name) {
			name = module.name
		}
		modules[name] = module.default
		modules[key.reverse().join('_')] = module.default
	}
})

Vue.use({ install: (Vue, options) => {
	Object.defineProperties(Vue.prototype, {
		$services: {
			get: () => modules
		},
	})
	
	window.$services = modules
	Vue.$services = modules
} })

export default modules