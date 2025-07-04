import { TONE_ROWS } from '$lib/constants/toneRows'

type ToneRow = {
	id: string
	index: number
	octave: number
	signalIds: string[]
}

type SignalT = {
	id: string
	toneId: string
	startTicks: number
	endTicks: number
	velocity: number
}

type PatternStateT = {
	id: string
	name: string
	description: string
	tags: string[]
	strategy: 'cycling' | 'random'
	length: number
	signals: Record<string, SignalT>
	tones: Record<string, ToneRow>
}

const state: PatternStateT = $state({
	id: '',
	name: '',
	description: '',
	tags: [],
	strategy: 'cycling',
	length: 16,
	signals: {},
	tones: TONE_ROWS
})

export const patternStore = {
	state
}
