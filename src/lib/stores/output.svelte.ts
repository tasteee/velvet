import type { Output } from "webmidi"
import { WebMidi } from 'webmidi'
import Soundfont from 'soundfont-player'
import type { InstrumentName, Player } from 'soundfont-player'
import { too } from "$lib/modules/too"
import { createMidiEngine } from "$lib/modules/midiEngine"

const engine = createMidiEngine()

const state = $state({
	volume: 0.7,
	outputTarget: 'instrument',
	isMidiReady: false,
	midiOutputIds: [] as string[],
	midiOutputId: '',
	midiOutput: null! as any,
	isMidiLoading: false,
	midiError: null as any,
	instrumentsError: null as any,
	audioContext: null! as AudioContext,

	isMidiConnected: false,
	isOutputEnabled: false,
	isInstrumentReady: false,
	isInstrumentLoading: false,
	instrumentName: 'acoustic_grand_piano',
	instrument: null as any, // Soundfont player instance
	instruments: {} as Record<string, any>,

	instrumentNames: [
		'acoustic_grand_piano',
		'acoustic_guitar_nylon',
		'electric_guitar_clean',
		'xylophone',
		'marimba'
	]
})

const setSelectedInstrument = (name: string) => {
	outputStore.state.instrumentName = name
	outputStore.state.instrument = outputStore.state.instruments[name]
	outputStore.state.isInstrumentReady = !!outputStore.state.instrument
}

async function loadInstrument(context: AudioContext, name: InstrumentName) {
	return new Promise((resolve, reject) => {
		Soundfont.instrument(context, name).then(resolve).catch(reject)
	})
}

const prepareOutput = async () => {
	const context = new AudioContext()
	outputStore.state.audioContext = context
	outputStore.state.isInstrumentLoading = true

	const loader0 = loadInstrument(context, 'acoustic_grand_piano')
	const loader1 = loadInstrument(context, 'acoustic_guitar_nylon')
	const loader2 = loadInstrument(context, 'electric_guitar_clean')
	const loader3 = loadInstrument(context, 'xylophone')
	const loader4 = loadInstrument(context, 'marimba')
	const instrumentPromises = [loader0, loader1, loader2, loader3, loader4]
	const instrumentsResult = await too('instruments', Promise.all(instrumentPromises))
	const midiConnectResult = await too('midi', WebMidi.enable())

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
		outputStore.state.isMidiConnected = true
		outputStore.state.midiOutputIds = ids
		outputStore.state.midiOutputId = ids[0]
		outputStore.state.midiOutput = WebMidi.getOutputById(ids[0])
		console.warn('>>> handleMidiEnabled', { ...outputStore.state })
	}
}

export const outputStore = {
	get state() { return state },
	engine,
	prepareOutput,
	setSelectedInstrument,
}