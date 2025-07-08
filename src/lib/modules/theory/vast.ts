import { Scale, Chord, Note } from 'tonal'

// Define all supported scales
const SCALE_TYPES = {
	Major: 'major',
	Minor: 'minor',
	Lydian: 'lydian',
	Mixolydian: 'mixolydian',
	'Harmonic Major': 'harmonic major',
	'Harmonic Minor': 'harmonic minor',
	'Melodic Minor': 'melodic minor',
	Dorian: 'dorian',
	Phrygian: 'phrygian',
	Aeolian: 'aeolian',
	Locrian: 'locrian'
}

// Comprehensive chord types to test
const CHORD_TYPES = [
	// Triads
	'M',
	'm',
	'dim',
	'aug',
	'sus2',
	'sus4',

	// 7th chords
	'M7',
	'm7',
	'7',
	'dim7',
	'mM7',
	'aug7',
	'sus2sus4',

	// Extended chords
	'M9',
	'm9',
	'9',
	'M11',
	'm11',
	'11',
	'M13',
	'm13',
	'13',

	// Added note chords
	'add9',
	'madd9',
	'add11',
	'madd11',
	'add13',
	'madd13',

	// 6th chords
	'6',
	'm6',
	'6/9',
	'm6/9',

	// Slash chords and inversions
	'M/3',
	'M/5',
	'm/b3',
	'm/5',
	'7/3',
	'7/5',
	'7/b7',

	// Altered chords
	'7b5',
	'7#5',
	'7b9',
	'7#9',
	'7#11',
	'7b13',
	'M7b5',
	'M7#5',
	'M7#11',
	'm7b5',
	'm7#5',
	'm7b9',
	'm7#11',

	// Complex alterations
	'9b5',
	'9#5',
	'9#11',
	'13b5',
	'13#5',
	'13#11',
	'M9b5',
	'M9#5',
	'M9#11',
	'M13b5',
	'M13#5',
	'M13#11',

	// Diminished variations
	'dim9',
	'dim11',
	'dim13',

	// Augmented variations
	'aug9',
	'aug11',
	'aug13',
	'augM7',
	'augM9',

	// Sus variations
	'sus2sus4',
	'7sus2',
	'7sus4',
	'9sus2',
	'9sus4',
	'M7sus2',
	'M7sus4',
	'M9sus2',
	'M9sus4',

	// No3 chords
	'no3',
	'7no3',
	'M7no3',
	'9no3',
	'M9no3',

	// 5th chords
	'5',
	'M5',
	'm5',

	// Quartal harmony
	'sus24',
	'sus47',

	// Polychords and upper structures
	'M7add13',
	'm7add13',
	'7add13',
	'M9add13',
	'm9add13',
	'M7add11',
	'm7add11',
	'7add11',

	// Specialty chords
	'alt',
	'dim/M7',
	'aug/M7',
	'M7alt',
	'm7alt',

	// Whole tone derived
	'M7#11#5',
	'M9#11#5',
	'7#11#5',
	'9#11#5',

	// Symmetric chords
	'dim/dim7',
	'aug/aug7',
	'M7/M7',
	'm7/m7'
]

interface ChordMatch {
	chord: string
	notes: string[]
	intervals: string[]
	symbol: string
}

/**
 * Parse scale input like "F# Minor" or "Bb Lydian"
 */
function parseScaleInput(input: string): { tonic: string; scaleType: string } {
	const parts = input.trim().split(/\s+/)
	if (parts.length < 2) {
		throw new Error('Invalid scale format. Use format like "C Major" or "F# Minor"')
	}

	const tonic = parts[0]
	const scaleType = parts.slice(1).join(' ')

	if (!SCALE_TYPES[scaleType as keyof typeof SCALE_TYPES]) {
		throw new Error(`Unsupported scale type: ${scaleType}`)
	}

	return { tonic, scaleType }
}

/**
 * Get all notes in the given scale
 */
function getScaleNotes(tonic: string, scaleType: string): string[] {
	const tonalScaleType = SCALE_TYPES[scaleType as keyof typeof SCALE_TYPES]
	const scale = Scale.get(`${tonic} ${tonalScaleType}`)

	if (!scale.notes || scale.notes.length === 0) {
		throw new Error(`Could not generate scale: ${tonic} ${scaleType}`)
	}

	return scale.notes
}

/**
 * Normalize note name for comparison (handles enharmonic equivalents)
 */
function normalizeNote(note: string): string {
	return Note.simplify(note)
}

/**
 * Check if all chord notes are in the scale
 */
function chordFitsInScale(chordNotes: string[], scaleNotes: string[]): boolean {
	if (!chordNotes || chordNotes.length === 0) return false

	const normalizedScaleNotes = scaleNotes.map(normalizeNote)
	const normalizedChordNotes = chordNotes.map(normalizeNote)

	return normalizedChordNotes.every((note) => normalizedScaleNotes.includes(note))
}

/**
 * Generate chord variations for a specific root note
 */
function generateChordsForRoot(root: string, scaleNotes: string[]): ChordMatch[] {
	const validChords: ChordMatch[] = []

	for (const chordType of CHORD_TYPES) {
		try {
			const chordSymbol = `${root}${chordType}`
			const chord = Chord.get(chordSymbol)

			if (chord.notes && chord.notes.length > 0) {
				if (chordFitsInScale(chord.notes, scaleNotes)) {
					validChords.push({
						chord: chordSymbol,
						notes: chord.notes,
						intervals: chord.intervals || [],
						symbol: chord.symbol || chordSymbol
					})
				}
			}
		} catch (error) {
			// Skip invalid chord types
			continue
		}
	}

	return validChords
}

/**
 * Generate all possible chromatic notes for testing
 */
function getAllChromaticNotes(): string[] {
	return ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
}

/**
 * Get vast array of chords for a given scale
 */
export function getVastScaleChords(scaleInput: string): ChordMatch[] {
	const { tonic, scaleType } = parseScaleInput(scaleInput)
	const scaleNotes = getScaleNotes(tonic, scaleType)
	const allChords: ChordMatch[] = []
	const chromaticNotes = getAllChromaticNotes()

	for (const root of chromaticNotes) {
		const chordsForRoot = generateChordsForRoot(root, scaleNotes)
		allChords.push(...chordsForRoot)
	}

	const uniqueChords = allChords.filter(
		(chord, index, self) => index === self.findIndex((c) => c.symbol === chord.symbol)
	)

	uniqueChords.sort((a, b) => {
		const rootA = a.chord.match(/^[A-G][#b]?/)?.[0] || ''
		const rootB = b.chord.match(/^[A-G][#b]?/)?.[0] || ''
		if (rootA !== rootB) return chromaticNotes.indexOf(rootA) - chromaticNotes.indexOf(rootB)
		return a.chord.localeCompare(b.chord)
	})

	return uniqueChords
}

export function getChordStatistics(chords: ChordMatch[]): {
	totalChords: number
	chordsByRoot: { [key: string]: number }
	chordsByType: { [key: string]: number }
} {
	const chordsByRoot: { [key: string]: number } = {}
	const chordsByType: { [key: string]: number } = {}

	chords.forEach((chord) => {
		const root = chord.chord.match(/^[A-G][#b]?/)?.[0] || 'Unknown'
		const type = chord.chord.replace(/^[A-G][#b]?/, '') || 'M'

		chordsByRoot[root] = (chordsByRoot[root] || 0) + 1
		chordsByType[type] = (chordsByType[type] || 0) + 1
	})

	return {
		totalChords: chords.length,
		chordsByRoot,
		chordsByType
	}
}
