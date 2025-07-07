import justDebounce from 'just-debounce-it'
import justCurry from 'just-curry-it'

const createDebouncer = (delay: number) => {
	return (fn: (...args: any[]) => void) => {
		return justDebounce(fn, delay)
	}
}

const debounce = (delay: number, fn: (...args: any[]) => void) => {
	return justDebounce(fn, delay)
}

export const just = {
	createDebouncer,
	debounce
}