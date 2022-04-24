import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTestStore = defineStore('test', () => {
	const count = ref(1)
	const addCount = () => {
		count.value++
	}
	return {
		count,
		addCount
	}
})
