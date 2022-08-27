"use strict";

import Vue from 'vue';
import axios from "axios";
import { trim } from 'php-in-js/modules/string';

import {apiUrl} from '@/helpers/constants'
import router from '../router'
import i18n from './i18n'
import $storage from './fluid-storage'

/**
 * Verifie si l'url courrante peut etre regirigée vers le login ou pas
 */
const isLoginRedirectable = () => {
	const currentUrl = trim(window.location.pathname, '/')

	return ! (['login'].includes(currentUrl))
}

let config = {
    baseURL: apiUrl(),
	headers: {
	
	}
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};
const _api = {
    all: (values) => axios.all(values),
    spread: (callback) => axios.spread(callback)
}
const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
        const token = $storage.session.get('access_token')
        if (token != '' && token != null) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
		config.baseURL = apiUrl()

        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

_axios.interceptors.response.use(
    function(response) {
		response = response.data

		if (!response.success) {
			if (response.code !== 498) {
				return Promise.reject(response)
			}
			if (isLoginRedirectable()) {
				App.alertInfo(i18n.t('votre_session_est_expiree__veuillez_vous_reconnecter'), {callback: () => {
					return router.push({name: 'login', query: {redirect: router.currentRoute.name}})
				}})
			}
		}

		return response
    },
    function(error) {
        const response = error.response || null
        if (response == null) {
            return Promise.reject(error)
        }
        const data = response.data || null
        if (data == null) {
            return Promise.reject(response)
        }
		if (data.code !== 498) {
			return Promise.reject(data)
		}
		if (isLoginRedirectable()) {
			App.alertInfo(i18n.t('votre_session_est_expiree__veuillez_vous_reconnecter'), {callback: () => {
				return router.push({name: 'login', query: {redirect: router.currentRoute.name}})
			}})
		}
    }
);

Vue.use({ install: function(Vue, options) {
    Vue.$axios = _axios;
    window.$axios = _axios;
    
	Vue.$api = _api
	window.$api = _api
    
    Object.defineProperties(Vue.prototype, {
        $axios: {
            get: () => _axios
        },
		$api: {
			get: () => _api
		}
    });
}})

export const $axios = _axios
export const $api = _api
