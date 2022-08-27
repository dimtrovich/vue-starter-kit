import Vue from 'vue'

import { number_format } from 'php-in-js/modules/string'

const formatters = {
	numberFormat: (value, separator) => {
		if (typeof separator !== 'string') {
			separator = ' '
		}
		return number_format(value, undefined, undefined, separator || ' ')
	},
	kFormatter(value, precision = 1) {
		if (value > 999 && value < 1000000) {
			return (value / 1000).toFixed(precision) + 'K'
		}
		if (value > 1000000) {
			return (value / 1000000).toFixed(precision) + 'M'
		}
		return value
	},
}


Vue.use({ install: (Vue, options) => {
	Object.defineProperties(Vue.prototype, {
		$kFormatter: {
			get: () => formatters.kFormatter
		},
		$numberFormat : {
			get: () => formatters.numberFormat
		}
	})

	for (let key in formatters) {
		window['$'+key] = formatters[key]
		Vue['$'+key] = formatters[key]
	}
}})

export default formatters
