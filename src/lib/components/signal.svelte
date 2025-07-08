<script lang="ts">
	import { PATTERN_GRID } from '$lib/constants/state'
	import { inputStore } from '$lib/stores/input.svelte'
	import { onMount } from 'svelte'
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

	let dragOffsetX = 0
	let dragOffsetY = 0
	let dragStartX = 0
	let dragStartY = 0
	let pointerStartX = 0
	let pointerStartY = 0
	let startDivisionsAtDragStart = 0
	let toneIndexAtDragStart = 0
	let isPointerDown = $state(false)

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

		isPointerDown = true
		tempLeft = statePositionLeft
		tempTop = statePositionTop

		pointerStartX = event.clientX
		pointerStartY = event.clientY
		dragStartX = statePositionLeft
		dragStartY = statePositionTop
		startDivisionsAtDragStart = signal.startDivisions
		toneIndexAtDragStart = tone.index
	}

	// If the pointer escapes the signals bounds and then
	// pointer is releassed, we need to still handle the
	// pointerup. So we set up a global pointerup and IF
	// this signals state is isPointerDown, then onPointerUp.
	const handleGlobalPointerUp = (event: PointerEvent) => {
		if (isPointerDown) {
			onPointerUp(event)
		}
	}

	// The user clicks down on and immediately begins
	// dragging a signal -- we need to check to see if
	// it IS being dragged but it is NOT selected, then
	// make it the selected signal.
	$effect(() => {
		if (!isDragging) return
		if (!isSelected) patternStore.setSelectedSignalIds([props.id])
	})

	onMount(() => {
		document.addEventListener('pointerup', handleGlobalPointerUp)
		return () => document.removeEventListener('pointerup', handleGlobalPointerUp)
	})

	function onPointerMove(event: PointerEvent) {
		if (!isPointerDown) return

		if (!isDragging) {
			const deltaX = Math.abs(event.clientX - pointerStartX)
			const deltaY = Math.abs(event.clientY - pointerStartY)
			const exceedsThreshold = deltaX >= 6 || deltaY >= 6
			if (!exceedsThreshold) return
			isDragging = true
			ref.setPointerCapture(event.pointerId)
		}

		dragOffsetX = event.clientX - pointerStartX
		dragOffsetY = event.clientY - pointerStartY
		tempLeft = dragStartX + dragOffsetX
		tempTop = dragStartY + dragOffsetY
	}

	function onPointerUp(event: PointerEvent) {
		isPointerDown = false
		if (!isDragging) return
		ref.releasePointerCapture(event.pointerId)
		const newStartDivisions = Math.max(0, Math.round(tempLeft / PATTERN_GRID.DIVISION_WIDTH))
		const centerY = tempTop + 30 / 2
		const newToneIndex = Math.floor(centerY / PATTERN_GRID.ROW_HEIGHT)
		const newTone = patternStore.getActiveToneWithIndex(newToneIndex)
		const toneId = newTone?.id ?? signal.toneId
		const durationDivisions = signal.durationDivisions
		const endDivisions = newStartDivisions + durationDivisions

		patternStore.updateSignal({
			id: props.id,
			toneId,
			startDivisions: newStartDivisions,
			endDivisions,
			durationDivisions
		})

		setTimeout(() => {
			isDragging = false
			tempLeft = 0
			tempTop = 0
			dragOffsetX = 0
			dragOffsetY = 0
			dragStartX = 0
			dragStartY = 0
			pointerStartX = 0
			pointerStartY = 0
			startDivisionsAtDragStart = 0
			toneIndexAtDragStart = 0
		}, 25)
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

	const onClick = (event: MouseEvent) => {
		if (isDragging) return

		event.preventDefault()
		event.stopPropagation()
		const isShift = inputStore.isPressedShift
		const isAlt = inputStore.isPressedAlt
		const selectedIds = [...patternStore.state.selectedSignalIds]
		console.log({ isAlt, selectedIds, id: props.id })

		if (isShift && !isAlt) {
			if (isSelected) {
				return patternStore.removeSelectedSignalIds([props.id])
			} else {
				return patternStore.addSelectedSignalIds([props.id])
			}
		} else if (isAlt && !isShift) {
			return patternStore.removeSelectedSignalIds([props.id])
		} else {
			patternStore.setSelectedSignalIds([props.id])
		}
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
		onclick={onClick}
		style:left={position.left + 'px'}
		style:top={position.top + 0.5 + 'px'}
		style:z-index={isSelected ? 1000 : 10}
	></button>
	{#if !isDragging}
		<SignalHandle id={props.id} side="right" {isHovered} />
	{/if}
{/if}

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../styles/utilities.css';

	@layer components {
		:global {
			body:has(.signal.isDragging) {
				cursor: none !important;
			}

			.signal {
				all: unset;
				@apply absolute h-[30px] bg-silver-950 border border-silver-200 rounded-sm;
				@apply hover:bg-silver-500;
				@apply z-10 min-w-[10px];
				background: linear-gradient(to top, #000, var(--color-silver-950));
				touch-action: none; /* Prevent scrolling while dragging on touch */
				user-select: none;
				cursor: pointer;
			}

			.signal.isDragging {
				/* transition: all 0.025s ease-in-out; */
				box-shadow: var(--shadow-lg);
				cursor: grabbing;
				transition: none;
			}

			.signal.isSelected {
				/* transition: all 0.05s ease-in-out; */
				@apply bg-gradient-to-t from-dress-800 to-dress-600 border-lavender-300;
				border: none;
				outline: inset 2px var(--color-dress-950);
				z-index: 250000;
			}

			.signal.isSelected:not(.isDragging) {
				box-shadow: var(--shadow-mini);
			}
		}
	}
</style>
