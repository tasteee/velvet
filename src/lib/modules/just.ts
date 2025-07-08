import justDebounce from 'just-debounce-it'
import justCurry from 'just-curry-it'
import justThrottle from 'just-throttle'

const createDebouncer = (delay: number) => {
	return (fn: (...args: any[]) => void) => {
		return justDebounce(fn, delay)
	}
}

const createThrottler = (delay: number) => {
	return (fn: (...args: any[]) => void) => {
		return justThrottle(fn, delay)
	}
}

const debounce = (delay: number, fn: (...args: any[]) => void) => {
	return justDebounce(fn, delay)
}

const throttle = (delay: number, fn: (...args: any[]) => void) => {
	return justThrottle(fn, delay)
}

export const just = {
	createDebouncer,
	createThrottler,
	debounce,
	throttle
}
