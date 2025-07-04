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
	toneOctave: number
}

const state: PatternStateT = $state({
	id: '',
	name: '',
	description: '',
	tags: [],
	strategy: 'cycling',
	length: 16,
	signals: {},
	tones: TONE_ROWS,
	toneOctave: 0
})

class PatternStore {
	id = $state('')
	name = $state('')
	description = $state('')
	tags = $state<string[]>([])
	strategy = $state('cycling')
	length = $state(16)
	signals = $state<Record<string, SignalT>>({})
	tones = $state<Record<string, ToneRow>>(TONE_ROWS)
	toneOctave = $state(0)

	activeTones = $derived.by(() => {
		const list = Object.values(this.tones)
		const filter = (tone: ToneRow) => tone.octave === this.toneOctave
		return list.filter(filter).sort(indexSort)
	})

	signalIds = $derived.by(() => {
		const list = Object.values(this.signals)
		return list.map((signal) => signal.id)
	})

	activeToneIds = $derived.by(() => {
		const getId = (tone: ToneRow) => tone.id
		const sorted = this.activeTones.sort(indexSort)
		const ids = sorted.map(getId)
		return ids
	})

	getSignal = (id: string): SignalT => {
		return this.signals[id]
	}
}

const indexSort = (a: ToneRow, b: ToneRow) => b.index - a.index
export const patternStore = new PatternStore()
