import { TONE_IDS } from "$lib/constants/toneRows"
import { startClamp, endClamp, durationClamp } from "./clamps"
import { numbers } from "./numbers"
import { toneHelpers } from "./tones"

export const createProgression = (overrides: Partial<ProgressionT> = {}): ProgressionT => {
	return {
		id: overrides.id || '',
		lengthBeats: overrides.lengthBeats || 16,
		steps: overrides.steps || [],
		bpm: overrides.bpm || 93
	}
}

export const createPattern = (overrides: Partial<PatternT> = {}): PatternT => {
	return {
		id: overrides.id || '',
		title: overrides.title || '',
		description: overrides.description || '',
		tags: overrides.tags || [],
		strategy: overrides.strategy || 'cycling',
		lengthBeats: overrides.lengthBeats || 16,
		signals: overrides.signals || {},
		tones: overrides.tones || {}
	}
}

export const createSignal = (overrides: Partial<SignalT> = {}): SignalT => {
	const id = overrides.id || crypto.randomUUID()
	const startDivisions = startClamp(overrides.startDivisions || 0)
	const endDivisions = endClamp(overrides.endDivisions || 0)
	const durationDivisions = durationClamp(overrides.durationDivisions || 0)

	if (!overrides.toneId) console.error('createSignal: no toneId provided')
	if (durationDivisions < 1) console.error('createSignal: durationDivisions must be at least 1')
	if (startDivisions < 0) console.error('createSignal: startDivisions must be 0 or greater')
	if (endDivisions < startDivisions) console.error('createSignal: endDivisions must be greater than or equal to startDivisions')

	return {
		id,
		toneId: overrides.toneId || '',
		minVelocity: overrides.minVelocity || 70,
		maxVelocity: overrides.maxVelocity || 90,
		startDivisions,
		endDivisions,
		durationDivisions,
	}
}

type PartialStepT = Partial<ProgressionStepT> & { id?: string }

export const createStep = (overrides: PartialStepT = {}): ProgressionStepT => {
	const startBeats = overrides.startBeats || 0
	const endBeats = overrides.endBeats || 16
	const durationBeats = endBeats - startBeats

	return {
		id: overrides.id || crypto.randomUUID(),
		isRest: overrides.isRest || false,
		inversion: overrides.inversion || 0,
		voicing: overrides.voicing || 'closed',
		octave: overrides.octave || 0,
		notes: overrides.notes || [],
		symbol: overrides.symbol || '',
		bassNote: overrides.bassNote || '',
		minVelocity: overrides.minVelocity || 70,
		maxVelocity: overrides.maxVelocity || 90,
		startBeats,
		endBeats,
		durationBeats,
	}
}

export const createToneRow = (overrides: Partial<ToneT> = {}): ToneT => {
	return {
		id: overrides.id || '',
		index: overrides.index || 0,
		octave: overrides.octave || 0,
		signalIds: overrides.signalIds || []
	}
}

export const createTone = (overrides: Partial<ToneT> = {}): ToneT => {
	return {
		id: overrides.id || '',
		index: overrides.index || 0,
		octave: overrides.octave || 0,
		signalIds: overrides.signalIds || []
	}
}

export const createToneMap = (): ToneMapT => {
	return TONE_IDS.reduce((final, id) => {
		const index = toneHelpers.getIdIndex(id) - 1
		const octave = toneHelpers.getIdOctave(id)
		const tone = createTone({ id, index, octave })
		final[id] = tone
		return final
	}, {} as ToneMapT)
}

export const createChord = (overrides: Partial<ChordT> = {}): ChordT => {
	return {
		id: overrides.id || '',
		symbol: overrides.symbol || '',
		bassNote: overrides.bassNote || '',
		inversion: overrides.inversion || 0,
		voicing: overrides.voicing || '',
		octave: overrides.octave || 0,
		notes: overrides.notes || [],
		minVelocity: overrides.minVelocity || 60,
		maxVelocity: overrides.maxVelocity || 85
	}
}

export const createProject = (overrides: Partial<ProjectT> = {}): ProjectT => {
	return {
		id: overrides.id || '',
		title: overrides.title || '',
		description: overrides.description || '',
		tags: overrides.tags || [],
		userId: overrides.userId || '',
		createdAt: overrides.createdAt || '',
		updatedAt: overrides.updatedAt || '',
		patterns: overrides.patterns || [],
		progressions: overrides.progressions || []
	}
}