<script>
	import { onMount } from 'svelte'
	import ChordGrid from '$lib/components/chord-grid.svelte'
	import PatternEditor from '$lib/components/pattern-editor.svelte'
	import { outputStore } from '$lib/stores/output.svelte'
	import { inputStore } from '$lib/stores/input.svelte'
	import { theory } from '$lib/modules/theory'
	import Icon from '@iconify/svelte'

	onMount(() => {
		theory.initialize()
		inputStore.start()
		outputStore.initialize()
	})
</script>

<div class="page row gap-2 max-w-full">
	<div class="sideBar column gap-2 p-[24px] w-[64px]">
		<Icon icon="mdi:music-note" font-size="24px" class="text-silver-500" />
		<Icon icon="mdi:music-note" font-size="24px" class="text-silver-500" />
		<Icon icon="mdi:music-note" font-size="24px" class="text-silver-500" />
		<Icon icon="mdi:music-note" font-size="24px" class="text-silver-500" />
		<Icon icon="mdi:music-note" font-size="24px" class="text-silver-500" />
	</div>
	<div class="layout column gap-2 w-full">
		<PatternEditor />
		<ChordGrid />
	</div>
</div>

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../lib/styles/utilities.css';

	.page {

	}

	.layout {
    width: calc(100vw - 94px);
    flex-basis: auto;
	}
</style>
