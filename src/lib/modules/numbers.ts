type CreateReverserOptionsT = {
	min: number
	max: number
}

// toNumber(123) // 123
// toNumber("456") // 456
// toNumber("abc") // 0
// toNumber(null) // 0
// toNumber([]) // 0
export const toNumber = (target: string | number): number => {
	if (typeof target === 'number') return target

	if (typeof target === 'string') {
		const parsed = parseFloat(target)
		return isNaN(parsed) ? 0 : parsed
	}

	return 0
}

type CreateClampOptionsT = {
	min: number
	max: number
}

const clamp = (min: number, value: number, max: number): number => {
	if (value < min) return min
	if (value > max) return max
	return value
}

// createClamp({ min: 0, max: 1 })(0.5) // 0.5
// createClamp({ min: 0, max: 1 })(-0.5) // 0
// createClamp({ min: 0, max: 1 })(1.5) // 1
const createClamp = (options: CreateClampOptionsT) => {
	return (value: number) => clamp(options.min, value, options.max)
}

// createReverser({ min: 0, max: 2 })(0) // 2
// createReverser({ min: 0, max: 2 })(1) // 1
// createReverser({ min: 0, max: 2 })(2) // 0
// createReverser({ min: -1, max: 1 })(-1) // 1
// createReverser({ min: -1, max: 1 })(0) // 0
const createReverser = (options: CreateReverserOptionsT) => {
	if (options.min >= options.max) throw new Error('Invalid range: min must be less than max')

	return (value: number): number => {
		const isTooHigh = value > options.max
		const isTooLow = value < options.min
		if (isTooHigh || isTooLow) throw new Error('reverser: value out of bounds - ' + value)
		return options.max - (value - options.min)
	}
}

// if value exceeds max, loops back to min and continues up
// if value is below min, loops back to max and continues down
// loopClamp(1, 5, 4) // 1 because 5 is 1 step above 4, so we loop to 1
// loopClamp(1, -1, 4) // 3 because -1 is 2 steps below 1, so we loop to 4 and go one more to 3
// loopClamp(1, 0, 4) // 4 because 0 is 1 step below 1, so we loop to 4
// loopClamp(1, 7, 4) // 3 because 7 is 3 steps above 4, so we loop to 1, then 2, then 3
const loopClamp = (min: number, value: number, max: number): number => {
	if (min >= max) throw new Error('Invalid range: min must be less than max')
	const range = max - min + 1
	const zeroBasedValue = value - min
	const wrapped = ((zeroBasedValue % range) + range) % range
	return min + wrapped
}

export const numbers = {
	toNumber,
	clamp,
	createClamp,
	loopClamp,
	createReverser
}
