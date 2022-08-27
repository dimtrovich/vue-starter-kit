/**
 * Recupere la langue a utilier par defaut
 * 
 * @return {String}
 */
export function findLocale() {
	let lang = $storage.local.get('locale')

	if (lang == null || lang == undefined || !lang || typeof lang == 'undefined') {
		lang = (window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage).substr(0,2).toLowerCase();
	}
	
	const AVAILABLE_LOCALES = process.env.VUE_APP_AVAILABLE_LOCALES || ['fr', 'en']

	if (! AVAILABLE_LOCALES.includes(lang)) {
		lang = process.env.VUE_APP_DEFAULT_LOCALE || 'fr'
	}

	return lang
}