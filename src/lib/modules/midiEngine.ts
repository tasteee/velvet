// A non-reactive, live MIDI model updated by an $effect
// to keep track of the current state of MIDI signals and progression.

// It should be kept in sync with the active chord progression
// and the signals defined in the pattern editor, allowing playback
// of the progression with the pattern applied at any given time,
// and allows for updates that will be reflected during playback.

// So for example if playback is currently active and it is halfway
// through playing an arp pattern on the first chord of the progression,
// and the user changes the first chord in the progression, the playback
// should immediately reflect that change without needing to stop and
// restart playback. So the second half of the arp pattern should be
// played on the new chord. Or if the user changes the pattern while
// playback is active, the new pattern should be applied to the currently
// focused chord in the progression for the remainder of that chord's playback.

// When setProgression is called, we need to, for each chord in the progression,
// create a map of that chord's notes to all of the possible tone ids, T1-2 to T8-2,
// T1-1 to T8-1, T1 to T8, T1+1 to T8+1, and T1+2 to T8+2. THEN, when setSignals
// is called, we can easily map the toneId of each signal to the corresponding
// note for the chord when converting the SignalT[] to MidiSignalT[].

import type { InstrumentName } from 'soundfont-player'
import { createProgression } from "./creators"
import { theory } from "./theory"
import { PPQ } from "../constants/general"
import { outputStore } from '$lib/stores/output.svelte'
import { just } from "./just"

type MidiEngineT = {
	setSignals: (signals: SignalT[]) => void
	setProgression: (progression: ProgressionT) => void
	play: () => void
	stop: () => void
	isPlaying: boolean
}

type StoreT = {
	isPlaying: boolean
	signals: SignalT[]
	progression: ProgressionT
	toneMaps: Record<number, Record<string, number>>
	midiSignals: MidiSignalT[]
	scheduledTimeouts: ReturnType<typeof setTimeout>[]

}

const createInitialStore = (): StoreT => {
	return {
		signals: [],
		toneMaps: {},
		midiSignals: [],
		isPlaying: false,
		scheduledTimeouts: [],
		progression: createProgression(),
	}
}

export const createMidiEngine = (): MidiEngineT => {
	const store = createInitialStore()

	const setSignals = (next: SignalT[]) => {
		store.signals = next
		updateLivePlayback()
	}

	const setProgression = (next: ProgressionT) => {
		store.progression = next
		store.toneMaps = {}

		next.steps.forEach((step, index) => {
			if (step.isRest) return
			store.toneMaps[index] = generateToneMapForChord(step)
		})

		updateLivePlayback()
	}

	const updateLivePlayback = just.debounce(150, () => {
		if (store.isPlaying) clearScheduled()
		const midiSignals: MidiSignalT[] = []

		store.progression.steps.forEach((step, stepIndex) => {
			if (step.isRest) return
			const toneMap = store.toneMaps[stepIndex]
			const stepStartTicks = theory.getBeatsTicks(step.startBeats)

			store.signals.forEach(signal => {
				const note = toneMap[signal.toneId]
				const startTicks = stepStartTicks + theory.getDivisionsTicks(signal.startDivisions)
				const endTicks = stepStartTicks + theory.getDivisionsTicks(signal.endDivisions)

				midiSignals.push({
					id: signal.id,
					note,
					startTicks,
					endTicks,
					velocity: signal.velocity
				})
			})
		})

		store.midiSignals = midiSignals
		if (store.isPlaying) scheduleMidiPlayback()
	})

	const scheduleMidiPlayback = () => {
		if (!outputStore.state.isOutputEnabled) return
		const instrument = outputStore.state.instrument
		const midiOutput = outputStore.state.midiOutput
		const audioContext = outputStore.state.audioContext
		const bpm = store.progression.bpm
		const msPerBeat = 60000 / bpm
		const now = performance.now()
		const ticksToMs = (ticks: number) => (ticks / PPQ) * msPerBeat
		const isOutputMidi = outputStore.state.outputTarget === 'midi'
		const isOutputInstrument = outputStore.state.outputTarget === 'instrument'

		if (isOutputMidi) {
			if (!midiOutput) return console.error('MIDI output not available')

			store.midiSignals.forEach(signal => {
				const noteOnTime = now + ticksToMs(signal.startTicks)
				const noteOffTime = now + ticksToMs(signal.endTicks)
				const velocity = signal.velocity / 127

				store.scheduledTimeouts.push(setTimeout(() => {
					midiOutput.send([0x90, signal.note, velocity * 127])
				}, noteOnTime - performance.now()))

				store.scheduledTimeouts.push(setTimeout(() => {
					midiOutput.send([0x80, signal.note, 0])
				}, noteOffTime - performance.now()))
			})
		}

		if (isOutputInstrument) {
			const instrumentKey = outputStore.state.instrumentName as InstrumentName
			if (!instrumentKey || !outputStore.state.loadedInstruments[instrumentKey]) return


			store.midiSignals.forEach(signal => {
				const currentTime = audioContext.currentTime
				const time = currentTime + ticksToMs(signal.startTicks) / 1000
				const duration = (signal.endTicks - signal.startTicks) / PPQ

				instrument.play(signal.note, time, {
					duration,
					gain: signal.velocity / 127
				})
			})
		}
	}

	const clearScheduled = () => {
		store.scheduledTimeouts.forEach(timeout => clearTimeout(timeout))
		outputStore.state.audioContext.close()
		outputStore.state.instrument.stop()
		store.scheduledTimeouts = []
	}

	const play = () => {
		if (store.isPlaying) return
		store.isPlaying = true
		scheduleMidiPlayback()
	}

	const stop = () => {
		store.isPlaying = false
		clearScheduled()
	}

	return {
		setSignals,
		setProgression,
		play,
		stop,

		get isPlaying() {
			return store.isPlaying
		}
	}
}

// Generates an object that maps tone IDs (T1-2 to T8+2) to MIDI note numbers
// for a given chord. The chord is expected to have a `notes` array and an `octave` property.
// For example, for a C major chord with notes ["C", "E", "G"] and octave 4,
// the generated map would look like: { T1: 60, T2: 64, T3: 67, T4: 72,
// T5: 76, T6: 79, T7: 84, T8: 88, T1-1: 48, T1-2: 36, T1+1: 72, T1+2: 84,
// T2-1: 52, T2+1: 76, T2+2: 88, ...etc }
const generateToneMapForChord = (chord: ChordT): Record<string, number> => {
	const map: Record<string, number> = {}

	for (let toneIndex = 1; toneIndex <= 8; toneIndex++) {
		const noteIndex = toneIndex - 1
		const chordNote = chord.notes[noteIndex % chord.notes.length]

		for (let octaveShift = -2; octaveShift <= 2; octaveShift++) {
			const toneId = `T${toneIndex}${octaveShift === 0 ? '' : (octaveShift > 0 ? `+${octaveShift}` : `${octaveShift}`)}`
			const midiNote = theory.getAdjustedOctavedNote(chordNote, chord.octave + octaveShift) // e.g., "C4", "D#5", etc.
			map[toneId] = theory.getNoteNumber(midiNote)
		}
	}

	return map
}

