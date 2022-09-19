<template>
  	<div id="app">
		<component :is="layout">
			<vue-page-transition name="fade-in-right">
				<router-view/>
			</vue-page-transition>
  		</component>
	</div>
</template>

<script>
import { VuePageTransition } from 'vue-page-transition'
import { findLocale } from './helpers/utils'

import DefaultLayout from './layouts/DefaultLayout.vue'
import EmptyLayout from './layouts/EmptyLayout.vue'

export default {
	components: {
		VuePageTransition,
		DefaultLayout, EmptyLayout
	},
  	computed: {
	  	layout() {
			let layout = 'empty'

			const meta = this.$route.meta
			if (meta && meta.layout) {
				layout = meta.layout
			}

			return `${layout}-layout`
		}
  	},
	
	beforeMount() {
		this.$i18n.locale = findLocale()
	},
  	mounted() {
		this.detectChangeLang()
  	},
	updated() {
		this.detectChangeLang()
	},

	methods: {
		/**
		 * Detecte le changement de langue et met à jour le localstorage
		 */
		detectChangeLang() {
			this.$root.$on('locale:change', (lang) => {
				$storage.local.set('locale', lang)
				this.$i18n.locale = lang
			})
		}
	}
}
</script>
