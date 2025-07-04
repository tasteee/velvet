<script>
	import { patternStore } from '$lib/stores/pattern.svelte'
	import Signal from '$lib/components/signal.svelte'
</script>

<div class="signalGrid">
	{#each patternStore.signalIds as signalId, index}
		<Signal id={signalId} {index} />
	{/each}
</div>

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../styles/utilities.css';

	@layer components {
		.signalGrid {
			@apply h-full w-full;

			/* Grid lines every 32px */
			background-image: 
				/* Vertical lines every 32px starting at 32px */
				repeating-linear-gradient(
					to right,
					transparent 0px,
					transparent 31px,
					rgba(0, 0, 0, 0.2) 32px,
					rgba(0, 0, 0, 0.2) 32px
				),
				/* Horizontal lines every 32px starting at 32px */
					repeating-linear-gradient(
						to bottom,
						transparent 0px,
						transparent 31px,
						rgba(0, 0, 0, 0.2) 32px,
						rgba(0, 0, 0, 0.2) 32px
					),
				/* Alternating background every 128px (32px * 4) */
					repeating-linear-gradient(
						to right,
						rgba(0, 0, 0, 0.02) 0px,
						rgba(0, 0, 0, 0.02) 128px,
						rgba(0, 0, 0, 0.05) 128px,
						rgba(0, 0, 0, 0.05) 256px
					),
				repeating-linear-gradient(
					to bottom,
					rgba(0, 0, 0, 0.02) 0px,
					rgba(0, 0, 0, 0.02) 128px,
					rgba(0, 0, 0, 0.05) 128px,
					rgba(0, 0, 0, 0.05) 256px
				);
		}
	}
</style>
