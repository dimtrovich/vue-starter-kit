/**
 * Enregistre les middlewares qui s'executerons globalement
 */

import checkAuth from "./checkAuth"


/**
 * 
 * @param {{to: any, from: any, next: function}} params 
 * @param {array} middlewares 
 * @returns {array}
 */
export default function({to, from, next}, middlewares) {
	if (to.meta.noAuth != true) {
		middlewares.unshift(checkAuth)	
	}
	
	return middlewares
}