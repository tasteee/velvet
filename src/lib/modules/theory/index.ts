import { PPQ } from '$lib/constants/state'
import { THEORY } from '$lib/constants/theory'
import { isSubsetOf } from 'is-subset-of'
import memoize from 'just-memoize'
import * as Tonal from 'tonal'
import getDeviation from 'just-standard-deviation'
import getSkewness from 'just-skewness'
import getVariance from 'just-variance'
import groupBy from 'just-group-by'
import sortBy from 'just-sort-by'
import range from 'array-range'
import { Chord, Scale } from 'tonal'

type NewChordT = {
	intervals: string[]
	symbols: string[]
	name: string
}

type GetManyOctavedNotesOptionsT = {
	count: number
	scaleNotes: string[]
	defaultOctave: number
}

const scalesMap = THEORY.SCALES.reduce((final, scale) => {
	final.set(scale.name, scale)
	return final
}, new Map())

const getFirstTwo = (target: string) => target.slice(0, 2)
const checkSharpOrFlat = (target: string) => getFirstTwo(target).match(/[#b]/)
const getRootNote = (target: string) => (checkSharpOrFlat(target) ? getFirstTwo(target) : target[0])

// getNoteNumber("C#5") -> 73
// getNoteNumber("A4") -> 69
// getNoteNumber("G3") -> 55
// getNoteNumber("B-2") -> 35
// getNoteNumber("C0") -> 12
// getNoteNumber("C-1") -> 0
// getNoteNumber("C8") -> 108
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

// getDivisionsTicks(16) -> 48 (assuming PPQ = 96)
// getDivisionsTicks(8) -> 24 (assuming PPQ = 96)
// getDivisionsTicks(0) -> 0 (assuming PPQ = 96)
// getDivisionsTicks(32, 48) -> 48
// getDivisionsTicks(16, 48) -> 24
// getDivisionsTicks(8, 48) -> 12
const getDivisionsTicks = (divisions: number = 0, ppq: number = PPQ): number => {
	return Math.floor((divisions / 4) * ppq)
}

// getBeatsTicks(1) -> 96 (assuming PPQ = 96)
// getBeatsTicks(2) -> 192 (assuming PPQ = 96)
// getBeatsTicks(0) -> 0 (assuming PPQ = 96)
// getBeatsTicks(1, 48) -> 48
// getBeatsTicks(2, 48) -> 96
// getBeatsTicks(0, 48) -> 0
const getBeatsTicks = (beats: number = 0, ppq: number = PPQ): number => {
	return Math.floor(beats * ppq)
}

// getBarsTicks(1) -> 384 (assuming PPQ = 96)
// getBarsTicks(2) -> 768 (assuming PPQ = 96)
// getBarsTicks(0) -> 0 (assuming PPQ = 96)
// getBarsTicks(1, 48) -> 192
// getBarsTicks(2, 48) -> 384
// getBarsTicks(0, 48) -> 0
const getBarsTicks = (bars: number = 0, ppq: number = PPQ): number => {
	return Math.floor(bars * 4 * ppq)
}

// getTicks({ divisions: 16, beats: 2, bars: 1, ppq: 96 }) -> 384
// getTicks({ divisions: 8, beats: 1, bars: 0, ppq: 96 }) -> 96
// getTicks({ divisions: 0, beats: 0, bars: 0, ppq: 96 }) -> 0
// getTicks({ divisions: 32, beats: 4, bars: 2, ppq: 48 }) -> 576
// getTicks({ divisions: 16, beats: 2, bars: 1, ppq: 48 }) -> 288
// getTicks({ divisions: 8, beats: 1, bars: 0, ppq: 48 }) -> 96
export const getTicks = (options: GetTicksOptionsT) => {
	const ppq = options.ppq || PPQ
	const divisionsTicks = getDivisionsTicks(options.divisions, ppq)
	const beatsTicks = getBeatsTicks(options.beats, ppq)
	const barsTicks = getBarsTicks(options.bars, ppq)
	return divisionsTicks + beatsTicks + barsTicks
}

// getNotesWithoutOctaves(["C4", "D5", "E3", "F#2"]) -> ["C", "D", "E", "F#"]
// getNotesWithoutOctaves(["A#5", "Bb4", "C0", "G#3"]) -> ["A#", "Bb", "C", "G#"]
const getNotesWithoutOctaves = (notes: string[]): string[] => {
	return notes.map((note) => note.replace(/\d/, ''))
}

// getChord("Cmaj7") -> { name: "Cmaj7", intervals: ["1", "3", "5", "7"], aliases: ["Cmaj7", "CM7"] }
const getChord = memoize((chordName: string) => {
	return Tonal.Chord.get(chordName)
})

// getNoteRootNote("C4") -> "C"
// getNoteRootNote("D#5") -> "D#"
// getNoteRootNote("Bb3") -> "Bb"
const getNoteRootNote = (note: string): string => {
	return Tonal.Note.get(note).pc
}

const getScaleChords = (scaleName: string) => {
	return Scale.scaleChords(scaleName)
}

const getScaleChordNames = (scaleName: string) => {
	return scalesMap.get(scaleName).chordNames
}

const registerChord = (chord: NewChordT) => {
	Tonal.ChordType.add(chord.intervals, chord.symbols, chord.name)
}

const getScale = (scaleName: string) => {
	return Tonal.Scale.get(scaleName)
}

const getScaleNotes = (scaleName: string) => {
	return Tonal.Scale.get(scaleName).notes
}

const initialize = () => {
	THEORY.CHORD_TYPES.forEach((chordType: NewChordT) => {
		registerChord(chordType)
	})
}

// getRootNoteGroupedChordNames('C major') -> {
//   C: ['Cmaj7', 'C6', 'Cmaj9'],
//   D: ['Dm7', 'Dmin7', 'D6'],
//   E: ['Em7', 'Emin7', 'E6'],
//   F: ['Fmaj7', 'F6', 'Fmaj9'],
//   G: ['G7', 'Gmaj7', 'G6'],
// ...etc }
const getRootNoteGroupedChordNames = memoize((scaleName: string) => {
	const chordNames = getScaleChordNames(scaleName)
	const notes = getScaleNotes(scaleName)

	const rootNoteMap = notes.reduce((final, note) => {
		final[note] = []
		return final
	}, {} as any)

	return chordNames.reduce((final: any, chordName: string) => {
		const root = chordName.split('')[0]
		final[root].push(chordName)
		return final
	}, rootNoteMap as any)
})

const getIsBlackKey = (note: string) => {
	return THEORY.SHARP_KEYS.includes(Tonal.Note.get(note).pc)
}

const getAllChordsInScale = memoize((scaleName: string) => {
	const allChordNames = THEORY.CHORD_NAMES
	const scale = getScale(scaleName)
	const inScaleChordNames = []

	for (const chordName of allChordNames) {
		const chord = Tonal.Chord.get(chordName)
		const isSubset = isSubsetOf(chord.notes, scale.notes)
		if (isSubset) inScaleChordNames.push(chordName)
	}

	return inScaleChordNames
})

const getChordSkewNess = (chordName: string) => {
	const chordNotes = Tonal.Chord.notes(chordName)
	const midiNotes = chordNotes.map((note) => Tonal.Note.midi(note + 2))
	return getSkewness(midiNotes as any)
}

const getOctavedNotes = (notes: string[], octave: number) => {
	const rootNotes = THEORY.NOTES
	let currentOctave = octave
	let lastNoteRootIndex = -1

	return notes.map((note: string, index: number) => {
		const isFirstIteration = index === 0
		// Remove any previous octave number from the note.
		const cleanNote = note.replace(/\d/, '')
		// Get the note's index in the root notes array.
		const rootIndex = rootNotes.indexOf(cleanNote)
		const isRootIndexLowerThanLast = rootIndex < lastNoteRootIndex
		// If the note's root index is less than the last note's
		// root index, increment the octave. (But not on the first note.)
		if (!isFirstIteration && isRootIndexLowerThanLast) currentOctave++
		lastNoteRootIndex = rootIndex
		return `${cleanNote}${currentOctave}`
	})
}

const getNotesRootNotes = (notes: string[]) => {
	return notes.map(theory.getNoteRootNote)
}

const getNotesWithOctave = (notes: string[], octave: number) => {
	return notes.map((note) => `${note}${octave}`)
}

const getRepeatedScaleNotes = (scaleNotes: string[]) => {
	return [
		...scaleNotes,
		...scaleNotes,
		...scaleNotes,
		...scaleNotes,
		...scaleNotes,
		...scaleNotes,
		...scaleNotes,
		...scaleNotes
	]
}

// Given a count, a base octave, and the notes of the scale,
// generates an array of `count` length of octaved notes.
const getManyOctavedNotes = (options: GetManyOctavedNotesOptionsT) => {
	const repeatedScaleNotes = getRepeatedScaleNotes(options.scaleNotes)
	const octavedScaleNotes = getOctavedNotes(repeatedScaleNotes, options.defaultOctave)
	const indexes = range(options.count)

	return indexes.map((index: number) => {
		return octavedScaleNotes[index]
	})
}

const mapChordNamesToSymbols = (chordNames: string[]) => {
	const chords = chordNames.map(Tonal.Chord.get)
	const symbols = chords.map((chord) => chord.symbol)
	return symbols
}

const getScaleNames = () => {
	return Tonal.Scale.names()
}

const getNoteNames = () => {
	return Tonal.Note.names()
}

const getChordNamesFromScaleName = memoize((scaleName: string) => {
	const chords = scalesMap.get(scaleName).chordNames
	return Array.from(new Set(chords))
})

const getScaleChordNamesByRootNote = memoize((scaleName: string, rootNote: string) => {
	const groupedChordNames = getRootNoteGroupedChordNames(scaleName)
	return groupedChordNames[rootNote]
})

import { Note } from 'tonal'
import { getChordStatistics, getVastScaleChords } from './vast'
import '$lib/constants/theory/scale-chords'

export const theory = {
	Tonal,
	getChord,
	getVastScaleChords,
	getChordStatistics,
	getScaleNames,
	getNoteNames,
	getChordNamesFromScaleName,
	getScaleChordNamesByRootNote,
	getChordSkewNess,
	getManyOctavedNotes,
	mapChordNamesToSymbols,
	getNotesWithOctave,
	getRepeatedScaleNotes,
	getOctavedNotes,
	getNotesRootNotes,
	getAllChordsInScale,
	getIsBlackKey,
	getScale,
	getScaleNotes,
	getScaleChordNames,
	getScaleChords,
	getFirstTwo,
	checkSharpOrFlat,
	getRootNote,
	getRootNoteGroupedChordNames,
	registerChord,
	getNoteRootNote,
	getNotesWithoutOctaves,
	getNoteNumber,
	getDivisionsTicks,
	getBeatsTicks,
	getBarsTicks,
	getTicks,
	getAdjustedOctavedNote,
	initialize
}

globalThis.theory = theory
