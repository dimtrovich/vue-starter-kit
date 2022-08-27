import pij from 'php-in-js'
import Vue from 'vue'

Vue.use({install: (Vue, options) => {
	Object.defineProperties(Vue.prototype, {
		$pij: {
			get: () => pij
		},
		$php: {
			get: () => pij
		}
	})

	window.$pij = pij
	window.$php = pij
	
	Vue.$pij = pij
	Vue.$php = pij
}})

export default pij
