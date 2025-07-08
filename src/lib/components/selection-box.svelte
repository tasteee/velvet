<script lang="ts">
	import { onDestroy, untrack } from 'svelte'
	import { patternStore } from '$lib/stores/pattern.svelte'
	import { inputStore } from '$lib/stores/input.svelte'

	const props = $props()

	let ref = $state<HTMLElement>(null!)
	let hasInitialized = $state(false)
	let previousIsSelecting = $state(false)

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
		// Track the previous selecting state
		if (props.isSelecting) {
			previousIsSelecting = true
			return
		}

		// If we WERE previously selecting and now we are not.
		// That means selection ended, and we need to do our calculations.
		if (!props.isSelecting && previousIsSelecting) {
			previousIsSelecting = false

			// Use untrack to prevent this effect from running again due to store updates
			untrack(() => {
				const isShift = inputStore.isPressedShift
				const isAlt = inputStore.isPressedAlt
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

				if (isShift && !isAlt) return patternStore.addSelectedSignalIds(intersectedIds)
				if (isAlt && !isShift) return patternStore.removeSelectedSignalIds(intersectedIds)
				patternStore.setSelectedSignalIds(intersectedIds)
			})
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
			@apply absolute border-3 border-dashed border-dress-300 bg-dress-100 opacity-50;
			@apply pointer-events-none;
			@apply z-20;
			@apply bg-dress-500/5;
		}
	}
</style>
