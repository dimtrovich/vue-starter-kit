import { findLocale } from '@/helpers/utils'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages () {
	return {
		fr: pushLang(require.context('../locales/fr', true, /[A-Za-z0-9-_,\s]+\.json$/i)),
		en: pushLang(require.context('../locales/en', true, /[A-Za-z0-9-_,\s]+\.json$/i)),
	}
}

function pushLang(locales) {
	let messages = {}
	locales.keys().forEach(key => {
		const matched = key.match(/([A-Za-z0-9-_]+)\./i)
		if (matched && matched.length > 1) {
			messages = {...messages, ...locales(key)}
		}
	})
	return messages
}

export default new VueI18n({
  	locale        : findLocale(),
  	fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || ['en', 'fr'],
  	messages      : loadLocaleMessages()
})
