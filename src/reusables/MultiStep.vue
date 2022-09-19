<template>
	<form-wizard @on-complete="onComplete" @on-change="onChange" :startIndex="startIndex" :transition="transition" :stepSize="stepSize" :errorColor="errorColor" :color="color" :shape="shape" :validateOnBack="validateOnBack">
		<slot />
		<template slot="footer" slot-scope="props">
			<div class="wizard-footer-left">
				<wizard-button :disabled="submitted" v-if="props.activeTabIndex > 0" @click.native="props.prevTab()" :style="props.fillButtonStyle" style="min-width: auto;"><i class="fa fa-arrow-left"></i></wizard-button>
			</div>
			<div class="wizard-footer-right">
				<wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">{{ $t('suivant') }}</wizard-button>
				<wizard-button :disabled="submitted" v-else @click.native="onComplete" :style="props.fillButtonStyle">{{ props.isLastStep ? finishButtonText : $t('suivant') }} <b-spinner small v-if="props.isLastStep && submitted" /></wizard-button>
			</div>
		</template>
	</form-wizard>
</template>

<script>
import i18n from '@/plugins/i18n'
import {FormWizard, TabContent as Step, WizardButton} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
	components: {
		FormWizard, WizardButton
	},
	props: {
  		nextButtonText: { type: String, default: i18n.t('suivant') },
		finishButtonText: { type: String, default: 'Finish' },
  		stepSize: {type: String, default: 'sm', validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value) },
  		validateOnBack: Boolean,
  		color: { type: String, default: '#2196F3' },
  		errorColor: { type: String, default: '#ff4961' },
  		shape: { type: String, default: 'circle' },
  		transition: { type: String, default: '' },
		startIndex: { type: Number, default: 0 },
		submitted: {type: Boolean, default: false},
	},
	methods: {
		onComplete() {
			this.$emit('complete')
		},
		onChange(prevIndex, nextIndex) {
			this.$emit('change', prevIndex, nextIndex)
		}
	}
}

export { Step }
</script>
<style>
.wizard-header{ display: none; }
</style>
