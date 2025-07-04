<script>
	import range from 'array-range'
	import SignalGrid from '$lib/components/signal-grid.svelte'
	import { patternStore } from '../stores/pattern.svelte'
	import OctaveControl from './octave-control.svelte'
	const columnIndexes = $derived(range(128))
</script>

<div class="p-12 w-full h-full row xCenter yCenter">
	<div class="patternEditor row">
		<div class="leftSide column w-[64px]">
			<OctaveControl />
			<div class="toneLabels">
				{#each patternStore.activeTones as tone, index}
					<div class="toneLabelBox">
						<p class="toneLabel">
							{tone.id}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="rightSide column w-full">
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
		.patternEditor {
			@apply w-full row monoFont;
			@apply border border-black rounded-sm shadow-sm;
			@apply bg-gray-100;
		}

		.patternEditor .leftSide {
			@apply column border-r border-black;
			@apply h-full;
		}

		.rightSide {
			@apply h-full;
			@apply overflow-scroll;
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
			@apply w-[32px] min-w-[32px];
			@apply border-r border-black;
		}

		.timingLabelBox:last-of-type {
			@apply border-r-0;
		}

		.timingLabels .timingLabel {
			@apply text-center text-sm;
			@apply text-gray-400 text-xs font-medium;
		}

		.timingLabels .timingLabelBox:nth-of-type(4n - 3) .timingLabel {
			@apply text-gray-500 text-sm font-bold;
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

		.toneLabels .toneLabelBox:last-of-type {
			@apply border-b-0;
		}
	}
</style>
