import { ROUTES_EMPTY_LAYOUT } from '@/helpers/constants'
import Vue from 'vue'
import VueRouter from 'vue-router'

import runMiddlewares from '../middlewares/handle'

const routes = [
	{
	  	path: '/',
	  	name: 'home',
	  	component: () => import('@/views/HomeView.vue')
	},
	{
	  path: '/about',
	  name: 'about',
	  component: () => import('@/views/AboutView.vue')
	}
]
  
const files = require.context('.', false, /[A-Za-z0-9-_,\s]+\.routes\.js$/i)
files.keys().forEach(key => {
	const t = files(key).default
	routes.push(...t)
})

for (const route of routes) {
	for (const key in route) {
		const meta = route.meta || {}
		if (!meta.layout) {
			if (! ROUTES_EMPTY_LAYOUT.includes(route.name)) {
				meta.layout = 'default'
			}
		}
		route.meta = meta
	}
}

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(runMiddlewares())

export default router
