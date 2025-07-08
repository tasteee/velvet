<script lang="ts">
	import { PATTERN_GRID } from '$lib/constants/general'
	import { inputStore } from '$lib/stores/input.svelte'
	import { patternStore } from '../stores/pattern.svelte'
	import { draggable, type DragOptions } from '$lib/components/bats/bats-draggable'
	import SignalHandle from './signal-handle.svelte'

	const props = $props()
	const signal = $derived(patternStore.state.signalMap[props.id])
	const tone = $derived(patternStore.state.toneMap[signal.toneId])
	const shouldShow = $derived(patternStore.activeToneIds.includes(signal.toneId))
	const isSelected = $derived(patternStore.state.selectedSignalIds.includes(props.id))
	const statePositionLeft = $derived(signal.startDivisions * PATTERN_GRID.DIVISION_WIDTH)
	const statePositionTop = $derived(tone.index * PATTERN_GRID.ROW_HEIGHT)
	const dragPosition = $derived({ x: statePositionLeft, y: statePositionTop })

	$effect(() => {
		console.log({ statePositionTop, dragTop: dragPosition.y })
	})

	let isDragging = $state(false)
	let startDivisionsAtDragStart = 0
	let toneIndexAtDragStart = 0
	let startPixelLeft = 0
	let startPixelTop = 0

	const onDragStart = () => {
		isDragging = true
		startDivisionsAtDragStart = signal.startDivisions
		toneIndexAtDragStart = tone.index
		startPixelLeft = statePositionLeft
		startPixelTop = statePositionTop
		patternStore.setSelectedSignalIds([props.id])
	}

	const onDrag = (info: any) => {
		const deltaX = info.offsetX - startPixelLeft
		const deltaY = info.offsetY - startPixelTop

		const divisionChangeX = Math.round(deltaX / PATTERN_GRID.DIVISION_WIDTH)
		const divisionChangeY = Math.round(deltaY / PATTERN_GRID.ROW_HEIGHT)

		const newStartDivisions = startDivisionsAtDragStart + divisionChangeX
		const newToneIndex = toneIndexAtDragStart + divisionChangeY

		const newTone = patternStore.getActiveToneWithIndex(newToneIndex)
		const toneId = newTone?.id ?? signal.toneId

		const finalStartDivisions = Math.max(0, newStartDivisions)
		const durationDivisions = signal.durationDivisions
		const endDivisions = finalStartDivisions + durationDivisions

		patternStore.updateSignal({
			id: props.id,
			toneId,
			startDivisions: finalStartDivisions,
			endDivisions,
			durationDivisions
		})
	}

	const onDragEnd = (info: any) => {
		isDragging = false

		const deltaX = info.offsetX - startPixelLeft
		const deltaY = info.offsetY - startPixelTop

		const divisionChangeX = Math.round(deltaX / PATTERN_GRID.DIVISION_WIDTH)
		const divisionChangeY = Math.round(deltaY / PATTERN_GRID.ROW_HEIGHT)

		const newStartDivisions = startDivisionsAtDragStart + divisionChangeX
		const newToneIndex = toneIndexAtDragStart + divisionChangeY

		const newTone = patternStore.getActiveToneWithIndex(newToneIndex)
		const toneId = newTone?.id ?? signal.toneId

		const finalStartDivisions = Math.max(0, newStartDivisions)
		const durationDivisions = signal.durationDivisions
		const endDivisions = finalStartDivisions + durationDivisions

		patternStore.updateSignal({
			id: props.id,
			toneId,
			startDivisions: finalStartDivisions,
			endDivisions,
			durationDivisions
		})
	}

	let signalDragOptions: DragOptions = $derived({
		bounds: 'parent',
		onDragStart,
		onDragEnd,
		onDrag,
		threshold: { distance: 2, delay: 15 },
		grid: [10, 32],
		position: dragPosition
	})

	const selectSignal = (event: MouseEvent) => {
		event.preventDefault()
		event.stopPropagation()
		const isShift = inputStore.isPressedShift
		const isAlt = inputStore.isPressedAlt
		if (isShift && !isAlt) patternStore.addSelectedSignalIds([props.id])
		else if (isAlt && !isShift) patternStore.removeSelectedSignalIds([props.id])
		else patternStore.setSelectedSignalIds([props.id])
	}

	let isHovered = $state(false)
</script>

{#if shouldShow}
	{#if !isDragging}
		<SignalHandle id={props.id} side="left" {isHovered} />
	{/if}
	<div
		onmouseenter={() => (isHovered = true)}
		onmouseleave={() => (isHovered = false)}
		class="signal"
		role="button"
		tabindex="0"
		data-signal-id={props.id}
		style:width={signal.durationDivisions * PATTERN_GRID.DIVISION_WIDTH + 'px'}
		class:isDragging
		class:isSelected
		onclick={selectSignal}
		use:draggable={signalDragOptions}
	></div>
	{#if !isDragging}
		<SignalHandle id={props.id} side="right" {isHovered} />
	{/if}
{/if}

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../styles/utilities.css';

	@layer components {
		.signal {
			@apply absolute h-[30px] bg-silver-950 border border-silver-200 rounded-sm;
			@apply transition-all duration-[20ms] ease-in;
			@apply hover:bg-silver-500;
			@apply z-10 min-w-[10px];
			background: linear-gradient(to top, #000, var(--color-silver-950));
		}

		body:has(.signal.isDragging) {
			cursor: none !important;
		}

		.signal.isDragging {
			box-shadow: var(--shadow-lg);
		}

		.signal.isSelected:not(.isDragging) {
			box-shadow: var(--shadow-mini);
		}
	}
</style>
