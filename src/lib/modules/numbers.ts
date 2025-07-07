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

export const numbers = {
	toNumber,
	clamp,
	createClamp,
}