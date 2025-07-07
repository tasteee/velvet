import { TONE_ROWS } from '$lib/constants/toneRows'
import { arrays } from '$lib/modules/arrays'
import { createSignal } from '$lib/modules/creators'
import { outputStore } from './output.svelte'

type PartialSignalT = Partial<SignalT> & { id: string }

const toneIndexSort = (a: ToneT, b: ToneT) => b.index - a.index
const setTool = (tool: string) => patternStore.state.tool = tool
const goUpOctave = () => patternStore.state.octave += 1
const goDownOctave = () => patternStore.state.octave -= 1
const getSignal = (id: string): SignalT => patternStore.state.signalMap[id]

const getActiveToneWithIndex = (index: number): ToneT => {
	return patternStore.activeTones.find(tone => tone.index === index) as ToneT
}

const addSignal = (overrides: Partial<SignalT>): SignalT => {
	const id = overrides.id || crypto.randomUUID()
	const signal = createSignal({ ...overrides, id })
	patternStore.state.signalMap[id] = signal
	return signal
}

const toggleToneSignalId = (toneId: string, signalId: string) => {
	const tone = patternStore.state.toneMap[toneId] as ToneT
	const hasSignal = tone.signalIds.includes(signalId)
	const signalIndex = tone.signalIds.indexOf(signalId)
	if (!hasSignal) return tone.signalIds.push(signalId)
	tone.signalIds = arrays.removeIndex(tone.signalIds, signalIndex)
}

const eraseSignal = (id: string): void => {
	const signal = getSignal(id)
	const toneId = signal.toneId
	delete patternStore.state.signalMap[id]
	toggleToneSignalId(toneId, id)
}

const updateSignal = (overrides: PartialSignalT): SignalT | null => {
	const signal = getSignal(overrides.id)
	const toneId = overrides.toneId ?? signal.toneId
	const didChangeTone = toneId !== signal.toneId
	if (didChangeTone) toggleToneSignalId(signal.toneId, overrides.id)
	if (didChangeTone) toggleToneSignalId(toneId, overrides.id)
	Object.assign(signal, overrides)
	return signal
}

const clearSelectedSignalIds = (): void => {
	patternStore.state.selectedSignalIds = []
}

const setSelectedSignalIds = (target: string | string[]): void => {
	const isArray = Array.isArray(target)
	const ids = isArray ? target : [target]
	patternStore.state.selectedSignalIds = ids
}

const addSelectedSignalIds = (target: string | string[]): void => {
	const isArray = Array.isArray(target)
	const ids = isArray ? target : [target]
	const newIds = [...patternStore.state.selectedSignalIds, ...ids]
	patternStore.state.selectedSignalIds = arrays.unique(newIds)
}

const removeSelectedSignalIds = (target: string | string[]): void => {
	const isArray = Array.isArray(target)
	const ids = isArray ? target : [target]
	const newIds = patternStore.state.selectedSignalIds.filter(id => !ids.includes(id))
	patternStore.state.selectedSignalIds = newIds
}


class PatternStore {
	state = $state({
		id: '',
		title: '',
		description: '',
		tags: [],
		length: 16,
		strategy: 'cycling',
		octave: 0,
		tool: 'paint',
		signalMap: {} as SignalMapT,
		toneMap: TONE_ROWS as ToneMapT,
		selectedSignalIds: [] as string[],
	})

	// Derived list of all signal ids.
	signalIds = $derived.by(() => {
		const list = Object.values(patternStore.state.signalMap) as SignalT[]
		return list.map((signal: SignalT) => signal.id)
	})

	// Derived list of all tones of the active octave.
	activeTones = $derived.by(() => {
		const list = Object.values(patternStore.state.toneMap) as ToneT[]
		const filter = (tone: ToneT) => tone.octave === patternStore.state.octave
		return list.filter(filter).sort(toneIndexSort)
	})

	// Derived list of all tone ids of tones in the active octave.
	activeToneIds = $derived.by(() => {
		const getId = (tone: ToneT) => tone.id
		const sorted = patternStore.activeTones.sort(toneIndexSort)
		const ids = sorted.map(getId)
		return ids
	})

	goUpOctave = goUpOctave
	goDownOctave = goDownOctave
	setTool = setTool
	getSignal = getSignal
	updateSignal = updateSignal
	addSignal = addSignal
	eraseSignal = eraseSignal
	toggleToneSignalId = toggleToneSignalId
	getActiveToneWithIndex = getActiveToneWithIndex
	clearSelectedSignalIds = clearSelectedSignalIds
	setSelectedSignalIds = setSelectedSignalIds
	addSelectedSignalIds = addSelectedSignalIds
	removeSelectedSignalIds = removeSelectedSignalIds
}

export const patternStore = new PatternStore()