<template>
    <div v-if="total > 0">
        <hr v-if="hr === 'top'" class="mb-0">
        <div class="d-flex align-items-center">
            <div v-if="noControl === false" class="mr-1 d-flex align-items-center" style="margin-top: 0.15em">
                <span class="text-muted d-inline-block text-small mr-2">{{ $t('affichage_de_x_y_sur_z_elements', {x: offset + 1, y: last, z: total }) }}</span>
				<b-dropdown size="sm" right variant="outline-secondary" :text="dropdownText" :disabled="range.length < 2">
					<b-dropdown-item-button v-for="i in range" :key="i" @click.prevent="changeLimit(i)">{{ i }}</b-dropdown-item-button>
				</b-dropdown>
            </div>
            <b-pagination :size="size" :pills="pills" @input="changePage" v-model="current" :total-rows="total" :per-page="limiter" ></b-pagination>
        </div>
        <hr v-if="hr === 'bottom'" class="mt-0">
    </div>
</template>

<script>
export default {
    props: {
        total: {type: Number, required: true},
        limit: {type: Number, default: 20},
		start: {type: Number, default: null},
        page: {type: Number, default: 1},
        hr: {type: [String, Boolean], default: false},
        noControl: {type: Boolean, default: false},
		range: {type: Array, default: () => [10, 20, 30, 50, 100]},
		pills: {type: Boolean, default: false},
		size: {type: [Number, String], default: 'md'},
		value: {type: Number, default: null}
    },
    data: () => ({
        limiter: 20,
        current: 1
    }),
    mounted() {
        this.limiter = this.limit
        this.current = this.page
		if (!$php.empty(this.value)) {
			this.current = this.value
		}
    },
    computed: {
        last() {
            const last = this.offset + this.limiter
            if (last > this.total) {
                return this.total
            }
            return last
        },
		offset() {
			if (!$php.empty(this.start)) {
				return this.start
			}
			return (this.current * this.limiter) - this.limiter
		},
		dropdownText() {
			return `${this.range.length < 2 ? this.range[0] : this.limit}`
		}
    },
    methods: {
        changeLimit(val) {
            this.limiter = val 
            this.$emit('limitChanged', val)
        },
		changePage(page) {
			this.$emit('pageChanged', page); 
			this.$emit('input', page);
		}
    }
}
</script>
