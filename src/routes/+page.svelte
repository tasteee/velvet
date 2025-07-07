<script>
	import ChordGrid from '$lib/components/chord-grid.svelte'
	import PatternEditor from '$lib/components/pattern-editor.svelte'
	import { onMount } from 'svelte'
	import { outputStore } from '$lib/stores/output.svelte'

	onMount(() => {
		outputStore.prepareOutput()
	})
</script>

<div class="p-12 w-full h-full column xCenter yCenter">
	<PatternEditor />
	<ChordGrid />
</div>

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../lib/styles/utilities.css';
</style>
