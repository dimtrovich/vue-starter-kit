// import jwtDecode from "jwt-decode"
import { empty } from "php-in-js/modules/types"

export default function({to, next}) {
	/*
	const access_token = $storage.session.get('access_token')
	if (empty(access_token)) {
		$storage.session.clear()
		next({ name: 'login', query: {redirect: to.name} })
		
		return false
	}
	*/
	/*
	const payload = jwtDecode(access_token)
	if (empty(payload)) {
		$storage.session.clear()
		next({ name: 'login', query: {redirect: to.name} })

		return false
	}
	
	const exp = (payload.exp - time()) / 60
	if (exp < 5) {
		const refresh_token = storage.get('refresh_token')
		if (empty(refresh_token)) {					
			$storage.session.clear()
			next({ name: 'login', query: {redirect: to.name} })

			return false
		}
		$axios.post('account/auth/refresh-token', {refresh_token}).then(response => {
			storage.set('access_token', response.result.access_token, 355)
			storage.set('refresh_token', response.result.refresh_token, 385)
			next()

			return true
		}).catch(error => {
			storage.clear()
			next({ name: 'login', query: {redirect: to.name} })

			return false
		})
	}
	*/

	next()
}