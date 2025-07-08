<script lang="ts">
	import { patternStore } from '$lib/stores/pattern.svelte'
	import { PATTERN_GRID } from '$lib/constants/general'
	import Signal from '$lib/components/signal.svelte'
	import SelectionBox from '$lib/components/selection-box.svelte'

	let gridRef = $state<HTMLElement>(null!)
	let gridRect: DOMRect = null!

	let isSelecting = $state(false)
	let selectionOriginX = $state(0)
	let selectionOriginY = $state(0)
	let selectionCurrentX = $state(0)
	let selectionCurrentY = $state(0)

	let mouseDownX = 0
	let mouseDownY = 0
	let startX = 0
	let startY = 0

	const onMouseDown = (event: MouseEvent) => {
		event.preventDefault()
		if (event.button !== 0) return
		const target = event.target as HTMLElement
		const isSignal = target.closest('.signal')
		const isHandle = target.closest('.signalHandle')
		if (isSignal || isHandle) return

		gridRect = gridRef.getBoundingClientRect()
		startX = event.clientX - gridRect.left
		startY = event.clientY - gridRect.top
		mouseDownX = event.clientX
		mouseDownY = event.clientY

		selectionOriginX = startX
		selectionOriginY = startY
		selectionCurrentX = startX
		selectionCurrentY = startY
		isSelecting = false

		window.addEventListener('mousemove', onMouseMove)
		window.addEventListener('mouseup', onMouseUp)
	}

	const onMouseUp = () => {
		window.removeEventListener('mousemove', onMouseMove)
		window.removeEventListener('mouseup', onMouseUp)
		if (isSelecting) return onSelectMouseUp()
		onClickMouseUp()
	}

	// when user mouse up while isSelecting, just
	// turn off isSelecting, which will trigger
	// SelectionBox to unmount, at which point
	// it calculates intersected signals and
	// handles selection logic.
	const onSelectMouseUp = () => {
		isSelecting = false
	}

	const onMouseMove = (moveEvent: MouseEvent) => {
		const distanceX = Math.abs(moveEvent.clientX - mouseDownX)
		const distanceY = Math.abs(moveEvent.clientY - mouseDownY)
		const meetsSelectThreshold = distanceX > 6 || distanceY > 6

		// If we previously were not selecting, but the movement has
		// exceeded the threshold, we start selecting, which will
		// render the SelectionBox. If threshold is not met and
		// we are not selecting yet, do nothing.
		if (!isSelecting && meetsSelectThreshold) isSelecting = true
		if (!isSelecting) return

		const currentX = moveEvent.clientX - gridRect.left
		const currentY = moveEvent.clientY - gridRect.top
		selectionCurrentX = currentX
		selectionCurrentY = currentY
	}

	const TONE_SNAP_MAP = {
		8: 7,
		7: 6,
		6: 5,
		5: 4,
		4: 3,
		3: 2,
		2: 1,
		1: 0,
	}

	// On mouse up when isSelecting is false, we find the
	// division where the mouse was clicked and insert
	// a signal there.
	const onClickMouseUp = () => {
		console.log('startY', startY)
		console.log('divided', startY / PATTERN_GRID.ROW_HEIGHT)
		console.log('floored', Math.floor(startY / PATTERN_GRID.ROW_HEIGHT))
		
		const snappedLeft = Math.floor(startX / PATTERN_GRID.DIVISION_WIDTH)
		const toneSnapIndex = Math.floor(startY / PATTERN_GRID.ROW_HEIGHT)
		console.log('toneSnapIndex', toneSnapIndex)
		const snappedTop = TONE_SNAP_MAP[toneSnapIndex as keyof typeof TONE_SNAP_MAP] || 0
		console.log('snappedTop', snappedTop)
		const tone = patternStore.getActiveToneWithIndex(snappedTop)
		// console.log({ toneSnapIndex, snappedTop, toneId: tone?.id })
		patternStore.clearSelectedSignalIds()

		console.log('creating signal on tone', { tone, id: tone.id })

		patternStore.addSignal({
			toneId: tone.id,
			startDivisions: snappedLeft,
			endDivisions: snappedLeft + 4,
			durationDivisions: 4
		})
	}
</script>

<div id="signalGrid" role="button" tabindex="0" onmousedown={onMouseDown} bind:this={gridRef}>
	{#each patternStore.signalIds as signalId, index}
		<Signal id={signalId} {index} />
	{/each}

	<SelectionBox
		{isSelecting}
		originX={selectionOriginX}
		originY={selectionOriginY}
		currentX={selectionCurrentX}
		currentY={selectionCurrentY}
	/>
</div>

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../styles/utilities.css';

	@layer components {
		:global #signalGrid {
			--beatWidth: 40px;

			--bgNoDragging: repeating-linear-gradient(
					to right,
					transparent 0px,
					transparent calc(var(--beatWidth) - 1px),
					rgba(0, 0, 0, 0.2) var(--beatWidth),
					rgba(0, 0, 0, 0.2) var(--beatWidth)
				),
				/* Beat group shading */
					repeating-linear-gradient(
						to right,
						rgba(0, 0, 0, 0.02) 0px,
						rgba(0, 0, 0, 0.02) calc(var(--beatWidth) * 4),
						rgba(0, 0, 0, 0.05) calc(var(--beatWidth) * 4),
						rgba(0, 0, 0, 0.05) calc(var(--beatWidth) * 8)
					),
				/* Main horizontal lines */
					repeating-linear-gradient(
						to bottom,
						transparent 0px,
						transparent 31px,
						rgba(0, 0, 0, 0.2) 32px,
						rgba(0, 0, 0, 0.2) 32px
					),
				/* Horizontal group shading */
					repeating-linear-gradient(
						to bottom,
						rgba(0, 0, 0, 0.02) 0px,
						rgba(0, 0, 0, 0.02) 128px,
						rgba(0, 0, 0, 0.05) 128px,
						rgba(0, 0, 0, 0.05) 256px
					);

			--bgDragging: repeating-linear-gradient(
					to right,
					transparent 0px,
					transparent calc(var(--beatWidth) - 1px),
					rgba(0, 0, 0, 0.2) var(--beatWidth),
					rgba(0, 0, 0, 0.2) var(--beatWidth)
				),
				repeating-linear-gradient(
					to right,
					transparent 0px,
					transparent calc(var(--beatWidth) / 4 - 1px),
					rgba(0, 0, 0, 0.07) calc(var(--beatWidth) / 4),
					rgba(0, 0, 0, 0.07) calc(var(--beatWidth) / 4),
					transparent calc(var(--beatWidth) / 4 + 1px),
					transparent calc(var(--beatWidth) / 2 - 1px),
					rgba(0, 0, 0, 0.07) calc(var(--beatWidth) / 2),
					rgba(0, 0, 0, 0.07) calc(var(--beatWidth) / 2),
					transparent calc(var(--beatWidth) / 2 + 1px),
					transparent calc(var(--beatWidth) * 3 / 4 - 1px),
					rgba(0, 0, 0, 0.07) calc(var(--beatWidth) * 3 / 4),
					rgba(0, 0, 0, 0.07) calc(var(--beatWidth) * 3 / 4),
					transparent calc(var(--beatWidth) * 3 / 4 + 1px),
					transparent var(--beatWidth)
				),
				/* Beat group shading */
					repeating-linear-gradient(
						to right,
						rgba(0, 0, 0, 0.02) 0px,
						rgba(0, 0, 0, 0.02) calc(var(--beatWidth) * 4),
						rgba(0, 0, 0, 0.05) calc(var(--beatWidth) * 4),
						rgba(0, 0, 0, 0.05) calc(var(--beatWidth) * 8)
					),
				/* Main horizontal lines */
					repeating-linear-gradient(
						to bottom,
						transparent 0px,
						transparent 31px,
						rgba(0, 0, 0, 0.2) 32px,
						rgba(0, 0, 0, 0.2) 32px
					),
				/* Horizontal group shading */
					repeating-linear-gradient(
						to bottom,
						rgba(0, 0, 0, 0.02) 0px,
						rgba(0, 0, 0, 0.02) 128px,
						rgba(0, 0, 0, 0.05) 128px,
						rgba(0, 0, 0, 0.05) 256px
					);

			@apply h-full relative overflow-hidden;
			width: calc(var(--beatWidth) * 128);
			background: var(--bgNoDragging);
		}

		:global body.isDraggingSignal #signalGrid {
			background: var(--bgDragging);
		}
	}
</style>
