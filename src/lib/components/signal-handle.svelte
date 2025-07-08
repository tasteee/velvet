<script lang="ts">
	import { PATTERN_GRID } from '$lib/constants/general'
	import { durationClamp, startClamp } from '$lib/modules/clamps'
	import { patternStore } from '../stores/pattern.svelte'
	import { draggable, type DragEventData, type DragOptions } from '@neodrag/svelte'

	type PropsT = {
		id: string
		isHovered?: boolean
		side: 'left' | 'right'
	}

	const props: PropsT = $props()
	const signal = $derived(patternStore.state.signalMap[props.id])
	const tone = $derived(patternStore.state.toneMap[signal.toneId])
	const isLeftHandle = props.side === 'left'
	let isHovering = $state(false)
	const isHovered = $derived(props.isHovered || isHovering)
	let isResizing = $state(false)
	let initialStartDivisions = 0
	let initialDurationDivisions = 0
	let startX = 0

	const position = $derived.by(() => {
		const top = tone.index * PATTERN_GRID.ROW_HEIGHT
		const leftLeft = signal.startDivisions * PATTERN_GRID.DIVISION_WIDTH
		const endDivisions = signal.startDivisions + signal.durationDivisions
		const rightLeft = endDivisions * PATTERN_GRID.DIVISION_WIDTH
		const left = props.side === 'left' ? leftLeft : rightLeft
		return { x: left, y: top }
	})

	const onDragStart = (event: DragEventData) => {
		event.event.stopPropagation()
		isResizing = true
		startX = event.event.clientX
		initialStartDivisions = signal.startDivisions
		initialDurationDivisions = signal.durationDivisions
	}

	const getNewDurationDivisions = (divisionChangeX: number) => {
		const addedDivisions = initialDurationDivisions + divisionChangeX
		const subtractedDivisions = initialDurationDivisions - divisionChangeX
		const newDivisions = isLeftHandle ? subtractedDivisions : addedDivisions
		return durationClamp(newDivisions)
	}

	const onDrag = (event: DragEventData) => {
		const deltaX = event.event.clientX - startX
		const divisionChangeX = Math.round(deltaX / PATTERN_GRID.DIVISION_WIDTH)
		const newDurationDivisions = getNewDurationDivisions(divisionChangeX)
		const newStartDivisions = startClamp(initialStartDivisions + divisionChangeX)
		const rightEndDivisions = signal.startDivisions + newDurationDivisions

		isLeftHandle &&
			patternStore.updateSignal({
				id: props.id,
				startDivisions: newStartDivisions,
				durationDivisions: newDurationDivisions
			})

		!isLeftHandle &&
			patternStore.updateSignal({
				id: props.id,
				endDivisions: rightEndDivisions,
				durationDivisions: newDurationDivisions
			})
	}

	const onDragEnd = () => {
		isResizing = false
	}

	const handleDragOptions: DragOptions = $derived({
		axis: 'x',
		bounds: 'parent',
		position,
		onDragStart,
		onDrag,
		onDragEnd
	})
</script>

<div
	class="signalHandle"
	class:isResizing
	onmouseenter={() => (isHovering = true)}
	onmouseleave={() => (isHovering = false)}
	class:isHovered
	role="button"
	tabindex="0"
	use:draggable={handleDragOptions}
></div>

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../styles/utilities.css';

	@layer components {
		.signalHandle {
			position: absolute;
			height: 32px;
			width: 2px;
			background: var(--color-lavender-500);
			@apply cursor-ew-resize;
			@apply z-20;
			opacity: 0;
		}

		.signalHandle.isResizing {
			opacity: 0 !important;
		}

		.signalHandle.isHovered {
			opacity: 1;
		}
	}

	:global body:has(.signalHandle.isResizing) {
		cursor: ew-resize !important;
	}
</style>
