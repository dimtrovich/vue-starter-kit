/**
 * URL de base de l'API
 * 
 * @return {string}
 */
export function apiUrl() {
	return process.env.VUE_APP_API_URL || 'http://localhost/api';
}

/**
 * @var {string[]} ROUTES_EMPTY_LAYOUT Routes qui utiliseront le layout 'empty'
 */
export const ROUTES_EMPTY_LAYOUT = process.env.VUE_APP_ROUTES_EMPTY_LAYOUT || ['login', 'register', 'signin', 'signup', 'init']