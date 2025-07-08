import { CHORD_NAMES } from "./chord-names"
import { CHORD_TYPES } from "./chord-types"
import { SCALE_NAMES } from "./scale-names"
import { SCALES } from "./scales"

const SCALE_TYPES = {
	major: "Major",
	minor: "Minor",
	lydian: "Lydian",
	mixolydian: "Mixolydian",
	harmonicMajor: "Harmonic Major",
	harmonicMinor: "Harmonic Minor",
	dorian: "Dorian",
	chromatic: "Chromatic",
	enigmatic: "Enigmatic",
	flamenco: "Flamenco",
	bebop: "Bebop",
	locrian: "Locrian",
	oriental: "Oriental",
	persian: "Persian",
	phrygian: "Phrygian",
	prometheus: "prometheus",
	ultralocrian: "Ultralocrian"
}

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
const SHARP_KEYS = ['C#', 'Db', 'D#', 'Eb', 'F#', 'Gb', 'G#', 'Ab', 'A#', 'Bb']
const FLAT_KEYS = ['Fb', 'Cb', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Bb', 'Eb', 'Ab']

export const THEORY = {
	NOTES,
	SCALES,
	CHORD_NAMES,
	SCALE_NAMES,
	SHARP_KEYS,
	FLAT_KEYS,
	SCALE_TYPES,
	CHORD_TYPES
}