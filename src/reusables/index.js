import ApiPrinter from "./ApiPrinter.vue"
import ConnectionError from "./ConnectionError.vue"
import EmptyItemsFound from "./EmptyItemsFound.vue"
import Modal from "./Modal.vue"
import MultiStep, { Step } from "./MultiStep.vue"
import OverlayLoading from "./OverlayLoading.vue"
import Paginator from "./Paginator.vue"
import Page from "./Page.vue"
import RangePicker from "./RangePicker.vue"
import SelectVue from "./form/Select.vue"

export default {
	install: (Vue, options) => {
		Vue.component('api-printer', ApiPrinter)
		Vue.component('connection-error', ConnectionError)
		Vue.component('empty-items-found', EmptyItemsFound)
		Vue.component('modal', Modal)
		Vue.component('multi-step', MultiStep)
		Vue.component('overlay-loading', OverlayLoading)
		Vue.component('page', Page)
		Vue.component('paginator', Paginator)
		Vue.component('step', Step)
		Vue.component('range-picker', RangePicker)

		Vue.component('c-select', SelectVue)
	}
}