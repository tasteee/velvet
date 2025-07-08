
<script lang="ts">
	import { projectStore } from '$lib/stores/project.svelte'
	import BatsSelect from './bats/bats-select.svelte'
	import type { SelectOptionT } from './bats/types'

	type ScaleOptionT = {
		value: string
		label: string
		description: string
	}

	const scaleOptions: Array<ScaleOptionT> = [
		{ value: 'Major', label: 'Major', description: 'Ionian mode, happy/bright' },
		{ value: 'Minor', label: 'Minor', description: 'Natural minor, sad/dark' },
		{ value: 'Harmonic Minor', label: 'Harmonic Minor', description: 'Exotic, classical minor' },
		{ value: 'Melodic Minor', label: 'Melodic Minor', description: 'Jazz minor, ascending' },
		{ value: 'Dorian', label: 'Dorian', description: 'Minor with raised 6th' },
		{ value: 'Phrygian', label: 'Phrygian', description: 'Minor with flat 2nd' },
		{ value: 'Lydian', label: 'Lydian', description: 'Major with raised 4th' },
		{ value: 'Mixolydian', label: 'Mixolydian', description: 'Major with flat 7th' },
		{ value: 'Locrian', label: 'Locrian', description: 'Minor with flat 2nd and 5th' },
		{ value: 'Pentatonic Major', label: 'Pentatonic Major', description: '5-note major scale' },
		{ value: 'PentatonicMinor', label: 'Pentatonic Minor', description: '5-note minor scale' }
	]

	const setValue = (newValue: string) => {
		projectStore.state.scaleType = newValue
	}
</script>

<BatsSelect
	class="monoFont"
	value={projectStore.state.scaleType}
	onchange={setValue}
	options={scaleOptions}
	placeholder="Select a scale type"
	icon="ph:music-note"
	width="220px"
/>
