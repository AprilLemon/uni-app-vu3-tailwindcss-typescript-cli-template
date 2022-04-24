import Vue from 'vue'

Vue.filter('empty', (val) => {
	const flag = [null, undefined, 'null', 'undefined']
	if (flag.includes(val) || (typeof val === 'string' && flag.includes(val.trim()))) {
		return ''
	} else {
		return val
	}
})
