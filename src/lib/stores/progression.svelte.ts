import { createProgression, createStep } from "$lib/modules/creators";
import { outputStore } from "./output.svelte";

// The user can add a chord or rest to the progression.
// The user can remove a chord or rest from the progression.
// The user can move a chord or rest within the progression.
// The user can edit the properties of a chord or rest in the progression.
// The user can change the length of the progression in beats.
// The user can change the bpm of the progression.
// The user can change the order of the steps in the progression.

type PartialStepT = Partial<ProgressionStepT> & { id: string }

const state = $state<ProgressionT>(createProgression())
const stepIds = $derived(state.steps.map(step => step.id))

$effect(() => {
	outputStore.engine.setProgression(state)
})

const setLengthBeats = (lengthBeats: number) => {
	state.lengthBeats = lengthBeats
}

const setBpm = (bpm: number) => {
	state.bpm = bpm
}

const addStep = (step: ProgressionStepT) => {
	const newStep = createStep(step)
	state.steps.push(newStep)
}

const updateStep = (updates: PartialStepT) => {
	for (const step of state.steps) {
		if (step.id !== updates.id) continue
		Object.assign(step, updates)
		break
	}
}

const moveStep = (id: string, newIndex: number) => {
	const stepIndex = state.steps.findIndex(step => step.id === id)
	if (stepIndex === -1 || newIndex < 0 || newIndex >= state.steps.length) return

	const [step] = state.steps.splice(stepIndex, 1)
	state.steps.splice(newIndex, 0, step)
}

export const progressionStore = {
	get state() { return state },
	get stepIds() { return stepIds },
	addStep,
	updateStep,
	moveStep,
	setLengthBeats,
	setBpm,
}