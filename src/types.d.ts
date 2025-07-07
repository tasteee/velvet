type VoicingT = 'open' | 'closed' | 'drop2' | 'drop3' | 'drop2and4' | 'rootless' | 'spread' | 'cluster'
type SignalMapT = Record<string, SignalT>
type ToneMapT = Record<string, ToneT>

// This represents a chord in any general part of the app
// that is not a part of the user's progression. It is just
// like a progression chord, but the progression chords have
// timing information (startDivisions, endDivisions, durationDivisions).
type ChordT = {
	id: string
	symbol: string
	bassNote: string
	inversion: number
	voicing: VoicingT | string
	octave: number
	notes: string[]
	minVelocity: number
	maxVelocity: number
}

type ProgressionChordT = ChordT & {
	startBeats: number
	endBeats: number
	durationBeats: number
	isRest: false
}

type ProgressionRestT = ProgressionChordT & {
	isRest: true
}

type ProgressionStepT = ProgressionChordT | ProgressionRestT

type ProgressionT = {
	id: string
	bpm: number
	lengthBeats: number
	steps: ProgressionStepT[]
}

// A tone is a placeholder for a note that is not known at this time.
// T1 will map to the 1st note of a chord when the pattern is applied
// to that chord. T1-2 will map to the 1st note of a chord, 2 octaves down.
// T1+1 will map to the 1st note of a chord, 1 octave up. Tones go from
// T1-2 to T8+2, 8 tones per octave, 5 octaves total. T1-2 to T8-2,
// T1-1 to T8-1, T1 to T8, T1+1 to T8+1, and T1+2 to T8+2.
type ToneT = {
	id: string
	index: number
	octave: number
	signalIds: string[]
}

// A signal is like a midi note, and it corresponds to a toneId rather
// than a specific note. So like T4+1 (4th note of a chord, 1 octave up)
// rather than like C#5, because the pattern is being created to be applied
// to any chord a user could throw at it in the future. Signals are sent
// to the midi engine, along with the progression, and the midi engine
// derives actual midi notes by mapping the signal's toneId to the
// corresponding note of the chord in the progression.
type SignalT = {
	id: string
	toneId: string
	startDivisions: number
	endDivisions: number
	durationDivisions: number
	minVelocity: number
	maxVelocity: number
}

type MidiSignalT = {
	id: string
	note: number
	startTicks: number
	endTicks: number
	velocity: number
}

type PatternT = {
	id: string
	title: string
	description: string
	tags: string[]
	strategy: 'cycling'
	lengthBeats: number
	signals: Record<string, SignalT>
	tones: Record<string, ToneT>
}

type ProjectT = {
	id: string
	title: string
	description: string
	tags: string[]
	userId: string
	createdAt: string
	updatedAt: string
	patterns: PatternT[]
	progressions: ProgressionT[]
}