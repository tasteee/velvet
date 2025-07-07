<script lang="ts">
	import Check from 'phosphor-svelte/lib/Check'
	import MusicNote from 'phosphor-svelte/lib/MusicNote'
	import CaretUpDown from 'phosphor-svelte/lib/CaretUpDown'
	import CaretDoubleUp from 'phosphor-svelte/lib/CaretDoubleUp'
	import CaretDoubleDown from 'phosphor-svelte/lib/CaretDoubleDown'
	import BatsSelect from './bats/bats-select.svelte'
	import type { SelectOptionT } from './bats/types'

	let value = $state<string>('F#')

	const setValue = (newValue: string) => {
		value = newValue
	}

	const notes = [
		{ value: 'C', label: 'C' },
		{ value: 'C#', label: 'C#' },
		{ value: 'D', label: 'D' },
		{ value: 'D#', label: 'D#' },
		{ value: 'E', label: 'E' },
		{ value: 'F', label: 'F' },
		{ value: 'F#', label: 'F#' },
		{ value: 'G', label: 'G' },
		{ value: 'G#', label: 'G#' },
		{ value: 'A', label: 'A' },
		{ value: 'A#', label: 'A#' },
		{ value: 'B', label: 'B' }
	]
</script>

<BatsSelect
	class="monoFont"
	{value}
	onchange={setValue}
	options={notes}
	placeholder="Select a root note"
	icon="ph:music-note"
	width="120px"
/>
