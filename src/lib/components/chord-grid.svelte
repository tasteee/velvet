<script lang="ts">
	import RootNoteSelect from './root-note-select.svelte'
	import ScaleTypeSelect from './scale-type-select.svelte'
	import Button from '$lib/components/bats/bats-button.svelte'
</script>

<div class="chordGridBox row">
	<div class="leftColumn column"></div>
	<div class="rightColumn column">
		<div class="optionsRow row gap-4">
			<RootNoteSelect />
			<ScaleTypeSelect />
		</div>
	</div>
</div>

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../styles/utilities.css';

	@layer components {
		:global {
			.chordGridBox {
				@apply w-full h-full xCenter yCenter;
				border: 1px solid var(--border-color);
				border-radius: var(--border-radius);
			}

			.leftColumn {
				@apply w-1/4 h-full;
			}

			.rightColumn {
				@apply w-3/4 h-full;
			}

			.chordGrid {
				@apply grid grid-cols-4 gap-4;
			}
		}
	}
</style>
