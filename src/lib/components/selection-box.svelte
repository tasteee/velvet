<script lang="ts">
	import { onDestroy } from 'svelte'
	import { patternStore } from '$lib/stores/pattern.svelte'
	import { inputStore } from '$lib/stores/input.svelte'

	const props = $props()

	let ref = $state<HTMLElement>(null!)
	let hasInitialized = $state(false)

	const minX = $derived(Math.min(props.originX, props.currentX))
	const minY = $derived(Math.min(props.originY, props.currentY))
	const maxX = $derived(Math.max(props.originX, props.currentX))
	const maxY = $derived(Math.max(props.originY, props.currentY))

	const selectionBoxLeft = $derived(minX)
	const selectionBoxTop = $derived(minY)
	const selectionBoxWidth = $derived(maxX - minX)
	const selectionBoxHeight = $derived(maxY - minY)

	const checkIntersection = (a: DOMRect, b: DOMRect): boolean => {
		const isSignalBottomLowerThanBoxTop = a.bottom > b.top
		const isSignalTopHigherThanBoxBottom = a.top < b.bottom
		const doesSignalStartInBox = b.left >= a.left && b.left <= a.right
		const doesSignalEndInBox = b.right >= a.left && b.right <= a.right
		const intersectsX = doesSignalStartInBox || doesSignalEndInBox
		const intersectsY = isSignalBottomLowerThanBoxTop && isSignalTopHigherThanBoxBottom
		const intersects = intersectsX && intersectsY
		return intersects
	}

	$effect(() => {
		// Once it begins selecting, initialize.
		// Then we will look out for when selecting
		// stops (!props.isSelecting) to do calculations.
		// We have to do the initialization so that we
		// do not do calculations before selection ever happens.
		if (props.isSelecting) {
			console.log('SelectionBox initialized')
			hasInitialized = true
			return
		}

		if (!props.isSelecting && hasInitialized) {
			console.log('selection stopped, running calculations...')
			const shift = inputStore.isPressedShift
			const alt = inputStore.isPressedAlt
			const allSignals = Array.from(document.querySelectorAll('[data-signal-id]'))
			const boxRect = ref.getBoundingClientRect()

			const intersectedIds = allSignals.reduce((final, element: Element) => {
				const rect = element.getBoundingClientRect()
				const id = element.getAttribute('data-signal-id') as string
				const doesIntersect = checkIntersection(boxRect, rect)
				if (!doesIntersect) return final
				final.push(id)
				return final
			}, [] as string[])

			if (shift && !alt) return patternStore.addSelectedSignalIds(intersectedIds)
			if (alt && !shift) return patternStore.removeSelectedSignalIds(intersectedIds)
			patternStore.setSelectedSignalIds(intersectedIds)
		}
	})
</script>

<div
	bind:this={ref}
	class="selectionBox"
	style:left={selectionBoxLeft + 'px'}
	style:top={selectionBoxTop + 'px'}
	style:width={selectionBoxWidth + 'px'}
	style:height={selectionBoxHeight + 'px'}
	style:opacity={props.isSelecting ? '1' : '0'}
></div>

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../styles/utilities.css';

	@layer components {
		.selectionBox {
			@apply absolute border-2 border-dashed border-silver-500 bg-silver-100 opacity-50;
			@apply pointer-events-none;
			@apply z-20;
			@apply bg-lavender-500/10;
		}
	}
</style>
