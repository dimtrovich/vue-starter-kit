<template>
	<date-range-picker ref="picker" v-model="dateRange" @update="applyRange" @toggle="togglePicker" :show-dropdowns="true" class="w-100" :locale-data="localeData" :ranges="ranges" :appendToBody="appendToBody">
		<template v-slot:input="picker" style="width: 100%;">
			<span v-if="'' != picker.startDate && null != picker.startDate">{{ $dayjs(picker.startDate).format(format) }}</span>
			-
			<span v-if="'' != picker.endDate && null != picker.endDate">{{ $dayjs(picker.endDate).format(format) }}</span>
		</template>
	</date-range-picker>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
	components: {
		DateRangePicker
	},
	props: {
		value: {type: Object},
		appendToBody: {type: Boolean, default: false},
		format: {type: String, default: 'DD/MM/YYYY'}
	},
	data: () => ({
		dateRange: {
			startDate: null,
			endDate: null	
		}
	}),
	computed: {
		localeData() {
			return {
				direction: 'ltr',
				format: 'dd/mm/yyyy',
				separator: ' - ',
				applyLabel: this.$t('valider'),
				cancelLabel: this.$t('annuler'),
				weekLabel: 'W',
				customRangeLabel: 'Custom Range',
				daysOfWeek: [this.$t('dim'), this.$t('lun'), this.$t('mar'), this.$t('mer'), this.$t('jeu'), this.$t('ven'), this.$t('sam')],
				monthNames: [this.$t('janv'), this.$t('fevr'), this.$t('mars'), this.$t('avr'), this.$t('mai'), this.$t('juin'), this.$t('juil'), this.$t('aout'), this.$t('sept'), this.$t('oct'), this.$t('nov'), this.$t('dec')],
				firstDay: 1
			}
		},
		ranges() {
			let today = new Date()
			today.setHours(0, 0, 0, 0)

			let yesterday = new Date()
			yesterday.setDate(today.getDate() - 1)
			yesterday.setHours(0, 0, 0, 0);
			
			let curr_week = this.getDaysOfWeek(new Date()), pass_week = curr_week 
			pass_week = pass_week.map(day => {
				let last_day = new Date()
				last_day.setDate(day.getDate() - 7)
				last_day.setHours(0, 0, 0, 0)

				return last_day
			})
	
			return {
				[this.$t('aujourdhui')]: [today, today],
				[this.$t('hier')]: [yesterday, yesterday],
			 	[this.$t('cette_semaine')]: [curr_week[0], curr_week[1]],
				[this.$t('la_semaine_passer')]: [pass_week[0], pass_week[1]],
				[this.$t('ce_mois')]: [new Date(today.getFullYear(), today.getMonth(), 1), new Date(today.getFullYear(), today.getMonth() + 1, 0)],
				[this.$t('le_mois_passer')]: [new Date(today.getFullYear(), today.getMonth() - 1, 1), new Date(today.getFullYear(), today.getMonth(), 0)],
				[this.$t('cette_annee')]: [new Date(today.getFullYear(), 0, 1), new Date(today.getFullYear(), 11, 31)],
				[this.$t('l_annee_passer')]: [new Date(today.getFullYear() - 1, 0, 1), new Date(today.getFullYear() - 1, 11, 31)],
			}
		}
	},
	mounted() {
		this.dateRange = this.parseRangeValue(this.value)
	},
	methods: {
		applyRange({startDate, endDate}) {
			const start = this.$dayjs(startDate).format('YYYY-MM-DD')
			const end = this.$dayjs(endDate).format('YYYY-MM-DD')
			this.$emit('input', { start, end })
		},
		togglePicker(status) {
			if (status == false) {
				this.$emit('close')
			}
		},
		parseRangeValue(dateRange) {
			return {
				startDate: dateRange.startDate || dateRange.start || null,
				endDate: dateRange.endDate || dateRange.end || null,
			}
		},

		getDaysOfWeek(current) {
			var week= new Array(); 
			// Starting Monday not Sunday
			current.setDate((current.getDate() - current.getDay() +1));
			
			week.push(new Date(current))
			current.setDate(current.getDate() + 6);
			week.push(new Date(current))

			return week; 
		}
	}
}
</script>
<style>
.daterangepicker.show-ranges {
	min-width: 720px !important;
}
.daterangepicker .applyBtn {
	background-color: #2196F3!important;
}
.daterangepicker .applyBtn:hover {
    border-color: #1976D2!important;
    background-color: #1E88E5!important;
}
</style>
