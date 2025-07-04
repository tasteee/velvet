<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import { Button } from 'bits-ui'
	import Box from '$lib/components/box.svelte'
	import Card from '$lib/components/card.svelte'

	let currentPage: any = $state(page.route.id)
</script>

<div class="column gap-[24px] p-[16px]">
	<h1>Welcome to SvelteKit!</h1>
	<p>This is the root page of your SvelteKit application.</p>
	<p>Current page: {currentPage}</p>

	<div class="row gap-[12px]">
		<Button.Root class="BUTTON BOLD">Save Project</Button.Root>
		<Button.Root class="BUTTON SUBTLE">About</Button.Root>
	</div>

	<div class="row w-[100px] h-[100px]"></div>

	<div class="CARD">
		<div class="HEADER">
			<p>Cmaj7sus4</p>
		</div>
		<p>Chord: Cmaj7sus4</p>
		<p>Notes: C, D, E, G, B</p>
	</div>
</div>
