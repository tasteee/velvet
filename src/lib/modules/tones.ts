
// Match any digits that follow "T" in a tone id.
// i.e "T1" -> 1, "T5-1" -> 5, "T3+2" -> 3, "T0" -> 0
export const getToneIdIndex = (toneId: string): number => {
	const match = toneId.match(/^[^T]*T(\d+)/) as RegExpExecArray
	return parseInt(match[1], 10)
}

// Match any digits that follow "+" or "-" in a tone id.
// If there is no "+" or "-", the octave is 0.
// i.e "T5-1" -> -1, "T3+2" -> +2, "T0" -> 0
export const getToneIdOctave = (toneId: string): number => {
	const match = toneId.match(/[+-]\d+/)
	return match ? parseInt(match[0], 10) : 0
}

export const toneHelpers = {
	getIdIndex: getToneIdIndex,
	getIdOctave: getToneIdOctave,
}