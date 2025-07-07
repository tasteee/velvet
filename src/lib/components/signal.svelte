<script lang="ts">
	import { PATTERN_GRID } from '$lib/constants/general'
	import { inputStore } from '$lib/stores/input.svelte'
	import { patternStore } from '../stores/pattern.svelte'
	import { draggable, type DragOptions } from '@neodrag/svelte'

	const props = $props()
	const signal = $derived(patternStore.state.signalMap[props.id])
	const tone = $derived(patternStore.state.toneMap[signal.toneId])
	const shouldShow = $derived(patternStore.activeToneIds.includes(signal.toneId))
	const isSelected = $derived(patternStore.state.selectedSignalIds.includes(props.id))
	const statePositionLeft = $derived(signal.startDivisions * PATTERN_GRID.DIVISION_WIDTH)
	const statePositionTop = $derived(tone.index * PATTERN_GRID.ROW_HEIGHT)
	const positionTop = $derived(statePositionTop)
	const positionLeft = $derived(statePositionLeft)
	let isDragging = $state(false)

	let options: DragOptions = {
		axis: 'both',
		bounds: 'parent',
		grid: [PATTERN_GRID.DIVISION_WIDTH, PATTERN_GRID.ROW_HEIGHT],
		threshold: { distance: 5, delay: 55 },

		onDragStart: () => {
			isDragging = true
			const grid = document.querySelector('.patternGrid') as HTMLElement
			grid.style.cursor = 'none !important'
		},

		onDragEnd: ({ offsetX, offsetY }) => {
			document.body.style.cursor = '' // reset cursor
			// Find the grid element and its bounding rect
			const grid = document.querySelector('.patternGrid') as HTMLElement
			const gridRect = grid?.getBoundingClientRect()
			grid.style.cursor = '' // reset cursor
			isDragging = false

			// Calculate snapped divisions and row
			const snappedLeft = Math.round(offsetX / PATTERN_GRID.DIVISION_WIDTH)
			const snappedTop = Math.round(offsetY / PATTERN_GRID.ROW_HEIGHT)

			// Get toneId for the new row
			const newTone = patternStore.getActiveToneWithIndex(snappedTop)
			const toneId = newTone?.id ?? signal.toneId

			// Update the signal in the store
			const startDivisions = snappedLeft
			const durationDivisions = signal.durationDivisions
			const endDivisions = startDivisions + durationDivisions

			patternStore.updateSignal({
				id: props.id,
				toneId,
				startDivisions,
				endDivisions,
				durationDivisions
			})
		}
	}

	const selectSignal = (event: MouseEvent) => {
		event.preventDefault()
		event.stopPropagation()
		const isShift = inputStore.isPressedShift
		const isAlt = inputStore.isPressedAlt
		if (isShift && !isAlt) patternStore.addSelectedSignalIds([props.id])
		else if (isAlt && !isShift) patternStore.removeSelectedSignalIds([props.id])
		else patternStore.setSelectedSignalIds([props.id])
	}
</script>

{#if shouldShow}
	<div
		class="signal"
		role="button"
		tabindex="0"
		data-signal-id={props.id}
		style:top={positionTop + 'px'}
		style:left={positionLeft + 'px'}
		class:isDragging
		onclick={selectSignal}
		use:draggable={options}
	>
		{#if isSelected}
			<div class="signalHandle leftHandle" role="button" tabindex="0"></div>
			<div class="signalHandle rightHandle" role="button" tabindex="0"></div>
		{/if}
	</div>
{/if}

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../styles/utilities.css';

	@layer components {
		.signal {
			@apply absolute h-[30px] bg-gray-300 border border-gray-400 rounded-sm;
			@apply transition-all duration-[55ms] ease-in-out;
			@apply hover:bg-gray-500;
			@apply z-10 min-w-[10px];
		}

		.signal.isDragging {
			cursor: none !important; /* Hide cursor while dragging */
		}

		.signal .signalHandle {
			@apply absolute w-[4px] h-[30px] bg-gray-400 border border-gray-950 rounded-sm opacity-50;
			@apply cursor-ew-resize;
			@apply z-20;
		}

		.signal.isDragging .signalHandle {
			@apply hidden;
		}

		.leftHandle {
			@apply left-[-4px];
		}

		.rightHandle {
			@apply right-[-4px];
		}
	}
</style>
