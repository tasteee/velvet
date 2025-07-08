import type { Output } from 'webmidi'
import { WebMidi } from 'webmidi'
import Soundfont from 'soundfont-player'
import type { InstrumentName, Player } from 'soundfont-player'
import { too } from '$lib/modules/too'
import { createMidiEngine } from '$lib/modules/midiEngine'

const engine = createMidiEngine()

class OutputStore {
	state = $state({
		volume: 0.7,
		isMuted: false,
		isMidiReady: false,
		isInstrumentReady: false,
		isMidiConnected: false,
		isMidiLoading: false,
		isInstrumentLoading: false,
		isOutputEnabled: false,
		outputTarget: 'instrument',
		instrumentName: 'acoustic_grand_piano',
		instrument: null as any,
		instruments: {} as Record<string, Player>,
		instrumentsError: null as any,
		audioContext: null! as AudioContext,
		midiOutputIds: [] as string[],
		midiOutputId: '',
		midiOutput: null! as Output,
		midiError: null as any,
		instrumentNames: [
			'acoustic_grand_piano',
			'acoustic_guitar_nylon',
			'electric_guitar_clean',
			'xylophone',
			'marimba'
		]
	})

	setSelectedInstrument = setSelectedInstrument
	initialize = initialize
	loadInstrument = loadInstrument
	engine = engine
}

const setSelectedInstrument = (name: string) => {
	outputStore.state.instrumentName = name
	outputStore.state.instrument = outputStore.state.instruments[name]
	outputStore.state.isInstrumentReady = !!outputStore.state.instrument
}

const loadInstrument = async (context: AudioContext, name: InstrumentName) => {
	return new Promise((resolve, reject) => {
		Soundfont.instrument(context, name).then(resolve).catch(reject)
	})
}

const initialize = async () => {
	const context = new AudioContext()
	outputStore.state.audioContext = context
	outputStore.state.isInstrumentLoading = true

	const loader0 = loadInstrument(context, 'acoustic_grand_piano')
	const loader1 = loadInstrument(context, 'acoustic_guitar_nylon')
	const loader2 = loadInstrument(context, 'electric_guitar_clean')
	const loader3 = loadInstrument(context, 'xylophone')
	const loader4 = loadInstrument(context, 'marimba')
	const instrumentPromises = [loader0, loader1, loader2, loader3, loader4]
	const instrumentsResult = await too(Promise.all(instrumentPromises))
	const midiConnectResult = await too(WebMidi.enable())

	if (instrumentsResult.didFail) {
		console.error('Error loading instruments:', instrumentsResult.error)
		outputStore.state.isInstrumentLoading = false
		outputStore.state.isInstrumentReady = false
		outputStore.state.instrumentsError = instrumentsResult.error
	}

	if (midiConnectResult.didFail) {
		console.error('Error enabling MIDI:', midiConnectResult.error)
		outputStore.state.isMidiConnected = false
		outputStore.state.isMidiLoading = false
		outputStore.state.midiError = midiConnectResult.error
	}

	if (instrumentsResult.didFail && midiConnectResult.didFail) {
		return console.error('Both instrument loading and MIDI enabling failed.')
	}

	if (!instrumentsResult.didFail) {
		const instruments = instrumentsResult.data as Player[]
		outputStore.state.isInstrumentReady = true
		outputStore.state.isInstrumentLoading = false

		outputStore.state.instruments = {
			acoustic_grand_piano: instruments[0],
			acoustic_guitar_nylon: instruments[1],
			electric_guitar_clean: instruments[2],
			xylophone: instruments[3],
			marimba: instruments[4]
		}
	}

	if (!midiConnectResult.didFail) {
		outputStore.state.isMidiConnected = true
		outputStore.state.isMidiLoading = false

		const getId = (output: Output) => output.id
		const ids = WebMidi.outputs.map(getId)
		const midiOutput = WebMidi.getOutputById(ids[0]) as Output
		outputStore.state.isMidiConnected = true
		outputStore.state.midiOutputIds = ids
		outputStore.state.midiOutputId = ids[0]
		outputStore.state.midiOutput = midiOutput
		outputStore.state.isMidiReady = true
		console.warn('[midi ready]', { ids, midiOutput })
	}
}

export const outputStore = new OutputStore()
