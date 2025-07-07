<script lang="ts">
	import { onDestroy } from 'svelte'
	import { patternStore } from '$lib/stores/pattern.svelte'
	import { inputStore } from '$lib/stores/input.svelte'

	const props = $props()
	let selectionBoxWidth = $state(0)
	let selectionBoxHeight = $state(0)
	let selectionBoxLeft = $state(0)
	let selectionBoxTop = $state(0)

	$effect(() => {
		const minX = Math.min(props.originX, props.currentX)
		const minY = Math.min(props.originY, props.currentY)
		const maxX = Math.max(props.originX, props.currentX)
		const maxY = Math.max(props.originY, props.currentY)

		selectionBoxLeft = minX
		selectionBoxTop = minY
		selectionBoxWidth = maxX - minX
		selectionBoxHeight = maxY - minY
	})

	const checkIntersection = (a: DOMRect, b: DOMRect): boolean => {
		return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
	}

	onDestroy(() => {
		const shift = inputStore.isPressedShift
		const alt = inputStore.isPressedAlt
		const allSignals = Array.from(document.querySelectorAll('[data-signal-id]'))

		const boxRect = new DOMRect(
			selectionBoxLeft,
			selectionBoxTop,
			selectionBoxWidth,
			selectionBoxHeight
		)

		const intersectedIds = allSignals.reduce((final, element: Element) => {
			const rect = element.getBoundingClientRect()
			const doesIntersect = checkIntersection(boxRect, rect)
			if (!doesIntersect) return final
			const id = element.getAttribute('data-signal-id') as string
			final.push(id)
			return final
		}, [] as string[])

		if (shift && !alt) return patternStore.addSelectedSignalIds(intersectedIds)
		if (alt && !shift) return patternStore.removeSelectedSignalIds(intersectedIds)
		patternStore.setSelectedSignalIds(intersectedIds)
	})
</script>

<div
	class="selectionBox"
	style:left={selectionBoxLeft + 'px'}
	style:top={selectionBoxTop + 'px'}
	style:width={selectionBoxWidth + 'px'}
	style:height={selectionBoxHeight + 'px'}
></div>

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../styles/utilities.css';

	@layer components {
		.selectionBox {
			@apply absolute border-2 border-dashed border-gray-500 bg-gray-100 opacity-50;
			@apply pointer-events-none;
			@apply z-20;
		}
	}
</style>
