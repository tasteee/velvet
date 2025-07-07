

class NumberHelpers {

	toDecimals(value: number = 0, decimals: number = 2): number {
		return parseFloat(value.toFixed(decimals))
	}

	toInteger(value: number): number {
		return Math.round(value)
	}

	percentageToOpacity(percentage: number): number {
		return percentage / 100
	}

	opacityToPercentage(opacity: number): number {
		return opacity * 100
	}

	percentageToRange(percentage: number, min: number, max: number): number {
		return (percentage / 100) * (max - min) + min
	}

	formatAsPercentage(value: number): string {
		return Math.round(value * 100) + '%'
	}

	formatAsFeet(value: number): string {
		return value.toFixed(1) + ' ft'
	}

	withMaxDecimals(value: number, decimals: number = 2): number {
		return parseFloat(value.toFixed(decimals))
	}
}


class ColorHelpers {
	getContrastingTextColor(hex: string) {
		const isHexColor = hex.startsWith('#')
		if (!isHexColor) return 'black'
		const r = parseInt(hex.slice(1, 3), 16)
		const g = parseInt(hex.slice(3, 5), 16)
		const b = parseInt(hex.slice(5, 7), 16)
		const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255
		return brightness > 0.5 ? 'black' : 'white'
	}
}

class EventHelpers {
	getKey(event: KeyboardEvent) {
		const key = event.key.toLowerCase()
		return key === ' ' ? 'space' : key
	}
}

class Utilities {
	number = new NumberHelpers()
	color = new ColorHelpers()
	event = new EventHelpers()

	capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

	windowEvent = (eventName: string, handler: (event: Event) => void) => {
		window.addEventListener(eventName, handler)
		return () => window.removeEventListener(eventName, handler)
	}
}

export default new Utilities()