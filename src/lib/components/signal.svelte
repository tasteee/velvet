<script>
	import { patternStore } from '../stores/pattern.svelte'

	const props = $props()
	const signal = $derived(patternStore.signals[props.id])
	const tone = $derived(patternStore.tones[signal.toneId])
	const shouldShow = $derived(patternStore.activeToneIds.includes(signal.toneId))
	const positionTop = $derived(tone.index * 32 + 'px')
</script>

<div class="signal" data-hidden-signal={shouldShow} style:top={positionTop}>
	<div class="signalHandle leftHandle"></div>
	<div class="signalHandle rightHandle"></div>
</div>

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../styles/utilities.css';

	[data-hidden-signal='true'] {
		display: none;
	}

	.signal {
		@apply absolute h-[30px] bg-gray-300 border border-gray-400 rounded-sm;
		@apply transition-all duration-300 ease-in-out;
		@apply hover:bg-gray-400;
		@apply cursor-pointer;
		@apply z-10 min-w-[10px];
	}

	.signalHandle {
		@apply relative w-[8px] h-[30px] bg-gray-400 border border-gray-950 rounded-sm;
	}

	.leftHandle {
		@apply left-[8px];
	}

	.rightHandle {
		@apply right-[8px];
	}
</style>
