import { PPQ } from '$lib/constants/general'
import * as Tonal from 'tonal'

// getNoteNumber("C#5") -> 73
const getNoteNumber = (note: string): number => {
	return Tonal.Note.midi(note) as number
}

// getAdjustedOctavedNote("C5", 1) -> "C6"
// getAdjustedOctavedNote("C5", -1) -> "C4"
// getAdjustedOctavedNote("C5", 0) -> "C5"
// getAdjustedOctavedNote("C5", 2) -> "C7"
const getAdjustedOctavedNote = (note: string, octaveShift: number): string => {
	const midiValue = Tonal.Note.midi(note) as number
	const adjustedMidiValue = midiValue + octaveShift * 12
	return Tonal.Midi.midiToNoteName(adjustedMidiValue) as string
}

type GetTicksOptionsT = {
	divisions: number
	beats: number
	bars: number
	ppq: number
}

const getDivisionsTicks = (divisions: number = 0, ppq: number = PPQ): number => {
	return Math.floor((divisions / 4) * ppq)
}

const getBeatsTicks = (beats: number = 0, ppq: number = PPQ): number => {
	return Math.floor(beats * ppq)
}

const getBarsTicks = (bars: number = 0, ppq: number = PPQ): number => {
	return Math.floor(bars * 4 * ppq)
}

export const getTicks = (options: GetTicksOptionsT) => {
	const divisionsTicks = getDivisionsTicks(options.divisions, options.ppq)
	const beatsTicks = getBeatsTicks(options.beats, options.ppq)
	const barsTicks = getBarsTicks(options.bars, options.ppq)
	return divisionsTicks + beatsTicks + barsTicks
}

export const theory = {
	getNoteNumber,
	getDivisionsTicks,
	getBeatsTicks,
	getBarsTicks,
	getTicks,
	getAdjustedOctavedNote
}
