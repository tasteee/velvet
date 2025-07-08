
<script lang="ts">
	import BatsSelect from './bats/bats-select.svelte'
	import type { SelectOptionT } from './bats/types'

	type ScaleOptionT = {
		value: string
		label: string
		description: string
	}

	const scaleOptions: Array<ScaleOptionT> = [
		{ value: 'major', label: 'Major', description: 'Ionian mode, happy/bright' },
		{ value: 'minor', label: 'Minor', description: 'Natural minor, sad/dark' },
		{ value: 'harmonic-minor', label: 'Harmonic Minor', description: 'Exotic, classical minor' },
		{ value: 'melodic-minor', label: 'Melodic Minor', description: 'Jazz minor, ascending' },
		{ value: 'dorian', label: 'Dorian', description: 'Minor with raised 6th' },
		{ value: 'phrygian', label: 'Phrygian', description: 'Minor with flat 2nd' },
		{ value: 'lydian', label: 'Lydian', description: 'Major with raised 4th' },
		{ value: 'mixolydian', label: 'Mixolydian', description: 'Major with flat 7th' },
		{ value: 'locrian', label: 'Locrian', description: 'Minor with flat 2nd and 5th' },
		{ value: 'pentatonic-major', label: 'Pentatonic Major', description: '5-note major scale' },
		{ value: 'pentatonic-minor', label: 'Pentatonic Minor', description: '5-note minor scale' }
	]

	let value = $state<string>('major')

	const setValue = (newValue: string) => {
		value = newValue
	}
</script>

<BatsSelect
	class="monoFont"
	{value}
	onchange={setValue}
	options={scaleOptions}
	placeholder="Select a scale type"
	icon="ph:music-note"
	width="200px"
/>
