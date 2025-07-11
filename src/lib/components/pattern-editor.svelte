<script lang="ts">
	import range from 'array-range'
	import SignalGrid from '$lib/components/signal-grid.svelte'
	import { patternStore } from '../stores/pattern.svelte'
	import OctaveControl from './octave-control.svelte'
	import Toolbar from './pattern-editor-toolbar.svelte'
	import { PATTERN_GRID } from '$lib/constants/state'
	import { inputStore } from '$lib/stores/input.svelte'
	import { just } from '$lib/modules/just'
	import { numbers } from '$lib/modules/numbers'

	const columnIndexes = $derived(range(128))
	const beatsWidth = $derived(PATTERN_GRID.BEAT_WIDTH + 'px')

	// TODO: Show select box over tone row when hovering tone label.
	// TODO: Shift click / alt click tone label for fine grained selection.

	const selectAllToneSignals = (id: string) => {
		const signalIds = Object.values(patternStore.state.signalMap)
		.filter(signal => signal.toneId === id)
		.map(signal => signal.id)
		
		if (inputStore.isPressedShift) return patternStore.addSelectedSignalIds(signalIds)
		if (inputStore.isPressedAlt) return patternStore.removeSelectedSignalIds(signalIds)
		patternStore.setSelectedSignalIds(signalIds)
	}

	const onKeyDown = just.throttle(135, (event: KeyboardEvent) => {
		if (patternStore.selectedSignals.length === 0) return
		event.preventDefault()
		event.stopPropagation()

		const isCtrlPressed = event.ctrlKey || event.metaKey

		if (event.key === 'Escape') {
			patternStore.clearSelectedSignalIds()
		}

		if (event.key === 'Delete' || event.key === 'Backspace') {
			const ids = patternStore.state.selectedSignalIds
			patternStore.eraseSignals(ids)
		}

		if (event.key === 'ArrowLeft') {
			const signals = patternStore.selectedSignals
			const distance = isCtrlPressed ? 1 : 4

			signals.forEach(signal => {
				signal.startDivisions -= distance
				signal.endDivisions -= distance
			})
		}

		if (event.key === 'ArrowRight') {
			const signals = patternStore.selectedSignals
			const distance = isCtrlPressed ? 1 : 4

			signals.forEach(signal => {
				signal.startDivisions += distance
				signal.endDivisions += distance
			})
		}

		if (event.key === 'ArrowUp') {
			const signals = patternStore.selectedSignals

			signals.forEach(signal => {
				const tone = patternStore.state.toneMap[signal.toneId]
				const nextToneIndex = numbers.loopClamp(0, tone.totalIndex + 1, 39)
				const newTone = patternStore.getToneByTotalIndex(nextToneIndex)
				signal.toneId = newTone.id
			})
		}

		if (event.key === 'ArrowDown') {
			const signals = patternStore.selectedSignals

			signals.forEach(signal => {
				const tone = patternStore.state.toneMap[signal.toneId]
				const nextToneIndex = numbers.loopClamp(0, tone.totalIndex - 1, 39)
				const newTone = patternStore.getToneByTotalIndex(nextToneIndex)
				if (!newTone) debugger;
				signal.toneId = newTone.id	
			})
		}
	})


</script>

<svelte:window onkeydown={onKeyDown} />

<div
	role="table"
	class="patternEditorContainer column gap-2 xCenter yCenter"
	style:--beatWidth={beatsWidth}
	oncontextmenu={(event) => {
		event.preventDefault()
	}}
>
	<div class="patternEditorControls">
		<!-- <Toolbar /> -->
	</div>

	<div class="patternEditor row">
		<div class="leftSide column w-[64px]">
			<OctaveControl />
			<div class="toneLabels">
				{#each patternStore.activeTones as tone, index}
					<div class="toneLabelBox" onclick={() => selectAllToneSignals(tone.id)}>
						<p class="toneLabel">
							{tone.id}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<div id="rightSide" class="column">
			<div class="timingLabels">
				{#each columnIndexes as index}
					<div class="timingLabelBox">
						<p class="timingLabel">
							{index + 1}
						</p>
					</div>
				{/each}
			</div>
			<SignalGrid />
		</div>
	</div>
</div>

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../styles/utilities.css';

	@layer components {
		.patternEditorContainer {
			/* padding: 12px; */
		}

		.patternEditorControls {
		}

		.patternEditor {
			user-select: none;
			max-width: 100%;
			@apply border border-black rounded-sm shadow-sm;
			@apply bg-silver-100;
			height: 288px;
		}

		.patternEditor .leftSide {
			@apply column border-r border-black;
			@apply h-full;
		}

		#rightSide {
			@apply h-full;
			@apply overflow-scroll;
			width: 100%;
			overflow-y: hidden;

			&::-webkit-scrollbar {
				display: none;
			}
		}

		.timingLabels {
			@apply row;
			@apply h-[32px] min-h-[32px];
			@apply border-b border-black;
			width: fit-content;
		}

		.timingLabelBox {
			@apply h-full;
			@apply row aCenter jCenter;
			width: var(--beatWidth);
			min-width: var(--beatWidth);
			@apply border-r border-black;
		}

		.timingLabelBox:last-of-type {
			@apply border-r-0;
		}

		.timingLabels .timingLabel {
			@apply text-center text-sm;
			@apply text-silver-800 text-xs font-medium;
		}

		.timingLabels .timingLabelBox:nth-of-type(4n - 3) .timingLabel {
			@apply text-silver-900 text-sm font-bold;
		}

		.toneLabels {
			@apply column h-full w-[64px];
			@apply border-r border-black;
		}

		.toneLabels .toneLabelBox {
			@apply h-[32px];
			@apply row aCenter;
			@apply border-b border-black;
			@apply px-1;
			@apply font-semibold;
		}

		.toneLabels .toneLabelBox:hover {
			background: var(--color-silver-200);
		}

		.toneLabels .toneLabelBox:last-of-type {
			@apply border-b-0;
			border-radius: 0px 0px 0px 4px;

			&:hover {
				border-bottom: 1px solid var(--black);
			}
		}
	}
</style>
