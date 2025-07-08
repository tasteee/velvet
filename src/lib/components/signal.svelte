<script lang="ts">
	import { PATTERN_GRID } from '$lib/constants/general'
	import { inputStore } from '$lib/stores/input.svelte'
	import { patternStore } from '../stores/pattern.svelte'
	import SignalHandle from './signal-handle.svelte'

	let ref: HTMLElement
	const props = $props()
	const signal = $derived(patternStore.state.signalMap[props.id])
	const tone = $derived(patternStore.state.toneMap[signal.toneId])
	const shouldShow = $derived(patternStore.activeToneIds.includes(signal.toneId))
	const isSelected = $derived(patternStore.state.selectedSignalIds.includes(props.id))
	const statePositionLeft = $derived(signal.startDivisions * PATTERN_GRID.DIVISION_WIDTH)
	const statePositionTop = $derived(tone.index * PATTERN_GRID.ROW_HEIGHT)
	let isDragging = $state(false)
	let tempLeft = $state(0)
	let tempTop = $state(0)

	const position = $derived({
		left: isDragging ? tempLeft : statePositionLeft,
		top: isDragging ? tempTop : statePositionTop
	})

	let isHovered = $state(false)

	const SIGNAL_HEIGHT = 30
	let dragOffsetX = 0
	let dragOffsetY = 0
	let dragStartX = 0
	let dragStartY = 0
	let pointerStartX = 0
	let pointerStartY = 0
	let startDivisionsAtDragStart = 0
	let toneIndexAtDragStart = 0

	const eraseSignal = (event: PointerEvent) => {
		const isRightButton = event.button === 2
		if (!isRightButton && !inputStore.isRightClicked) return
		event.preventDefault()
		event.stopPropagation()
		patternStore.eraseSignal(props.id)
	}

	const onMouseEnter = (event: MouseEvent) => {
		if (inputStore.isRightClicked) return eraseSignal(event as PointerEvent)
		if (isDragging) return
		isHovered = true
	}

	function onPointerDown(event: PointerEvent) {
		if (event.button === 2) return eraseSignal(event)
		if (event.button !== 0) return

		tempLeft = statePositionLeft
		tempTop = statePositionTop
		isDragging = true
		ref.setPointerCapture(event.pointerId)

		pointerStartX = event.clientX
		pointerStartY = event.clientY
		dragStartX = statePositionLeft
		dragStartY = statePositionTop
		startDivisionsAtDragStart = signal.startDivisions
		toneIndexAtDragStart = tone.index
		patternStore.setSelectedSignalIds([props.id]) // Ensure the signal is selected on drag start
	}

	function onPointerMove(event: PointerEvent) {
		if (!isDragging) return
		dragOffsetX = event.clientX - pointerStartX
		dragOffsetY = event.clientY - pointerStartY
		tempLeft = dragStartX + dragOffsetX
		tempTop = dragStartY + dragOffsetY
	}

	function onPointerUp(event: PointerEvent) {
		if (!isDragging) return
		ref.releasePointerCapture(event.pointerId)

		const totalDeltaX = dragStartX + dragOffsetX
		const divisionChangeX =
			Math.round(totalDeltaX / PATTERN_GRID.DIVISION_WIDTH) - startDivisionsAtDragStart
		const newStartDivisions = startDivisionsAtDragStart + divisionChangeX

		// Use the vertical center of the signal for tone calculation
		const finalTop = dragStartY + dragOffsetY
		const centerY = finalTop + SIGNAL_HEIGHT / 2
		const newToneIndex = Math.floor(centerY / PATTERN_GRID.ROW_HEIGHT)

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

		// Reset drag state
		dragOffsetX = 0
		dragOffsetY = 0

		setTimeout(() => {
			tempLeft = 0
			tempTop = 0
			isDragging = false
		}, 10)
	}

	$effect(() => {
		if (isDragging) {
			document.body.style.cursor = 'none'
			document.body.classList.add('isDraggingSignal')
		}

		if (!isDragging) {
			document.body.style.cursor = ''
			document.body.classList.remove('isDraggingSignal')
		}
	})

	function selectSignal(event: MouseEvent) {
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
	{#if !isDragging}
		<SignalHandle id={props.id} side="left" {isHovered} />
	{/if}
	<button
		bind:this={ref}
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onmouseenter={onMouseEnter}
		onmouseleave={() => (isHovered = false)}
		aria-label="signal {props.id}"
		class="signal"
		tabindex="0"
		data-signal-id={props.id}
		style:width={signal.durationDivisions * PATTERN_GRID.DIVISION_WIDTH + 'px'}
		class:isDragging
		class:isSelected
		onclick={selectSignal}
		style:left={position.left + 'px'}
		style:top={position.top + 0.5 + 'px'}
		style:z-index={isDragging ? 1000 : 10}
	></button>
	{#if !isDragging}
		<SignalHandle id={props.id} side="right" {isHovered} />
	{/if}
{/if}

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../styles/utilities.css';

	@layer components {
		.signal {
			all: unset;
			@apply absolute h-[30px] bg-silver-950 border border-silver-200 rounded-sm;
			@apply transition-all duration-[20ms] ease-in;
			@apply hover:bg-silver-500;
			@apply z-10 min-w-[10px];
			background: linear-gradient(to top, #000, var(--color-silver-950));
			touch-action: none; /* Prevent scrolling while dragging on touch */
			user-select: none;
			cursor: pointer;
		}
		body:has(.signal.isDragging) {
			cursor: none !important;
		}
		.signal.isDragging {
			box-shadow: var(--shadow-lg);
			cursor: grabbing;
		}

		.signal.isSelected {
			background: linear-gradient(to top, var(--color-lavender-950), var(--color-lavender-800));
			border-color: var(--color-lavender-300);	
		}

		.signal.isSelected:not(.isDragging) {
			box-shadow: var(--shadow-mini);
		}
	}
</style>
