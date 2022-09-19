<template>
	<div>
		<div class="overlay" v-show="printLoading">
			<div class="overlay__inner">
				<div class="overlay__content"><span class="spinner"></span></div>
			</div>
		</div>
		<modal id="bv-printer" :title="$t('impression')" size="lg" no-footer @close="$emit('close')">
			<iframe id="bv-printer-iframe" class="w-100 border-0" style="height: 76vh;" :src="url" />
		</modal>
	</div>
</template>

<script>
import { apiUrl } from '@/helpers/constants'

export default {
	props: {
		src: { type: String, required: true}
	},
	data: () => ({
		printLoading: false,
		url: ''
	}),
	mounted() {
		this.loading()
	},
	methods: {
		loading() {
			if ($php.empty(this.src)) {
				return
			}
			
			this.url = apiUrl() + '/printer/' + $php.trim(this.src, '/')
			this.printLoading = true
			this.$bvModal.show('bv-printer')
		
			this.$root.$on('bv::modal::shown', (bvModalEvent, modalId) => {
				if (modalId == 'bv-printer') {
					$('#bv-printer-iframe').on('load', () => {
						this.printLoading = false
					})
				}
			})
		}
	}
}
</script>
<style scoped>
.overlay {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
	z-index: 9999;
    background: rgba(0, 0, 0, 0.3);
}

.overlay__inner {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
}

.overlay__content {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}

.spinner {
    width: 75px;
    height: 75px;
    display: inline-block;
    border-width: 2px;
    border-color: rgba(255, 255, 255, 0.05);
    border-top-color: #fff;
    animation: spin 1s infinite linear;
    border-radius: 100%;
    border-style: solid;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
