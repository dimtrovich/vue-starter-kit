import Vue from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { findLocale } from '@/helpers/utils';

dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)

const locale = findLocale()
if (locale == 'en') {
	require('dayjs/locale/en')
}
else {
	require('dayjs/locale/fr')
}
dayjs.locale(locale)


Vue.use({install: (Vue, options) => {
	Vue.$dayjs = dayjs
	window.$dayjs = dayjs

	Object.defineProperties(Vue.prototype, {
		$dayjs: {
			get: () => dayjs
		},
	})
}})

export default dayjs
