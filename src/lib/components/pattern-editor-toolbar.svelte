<script lang="ts">
	import BatsToolbar from '$lib/components/bats/bats-toolbar.svelte'
	import BatsToggleGroup from '$lib/components/bats/bats-toggle-group.svelte'
	import TextB from 'phosphor-svelte/lib/TextB'
	import TextItalic from 'phosphor-svelte/lib/TextItalic'
	import TextStrikethrough from 'phosphor-svelte/lib/TextStrikethrough'
	import BatsButton from '$lib/components/bats/bats-button.svelte'
	import Icon from '@iconify/svelte'

	let tool = $state('add')
	const setTool = (value: string) => tool = value
	const handleClick = () => console.log('clicked')
</script>

<BatsToolbar class="w-full row gap-2">
	<BatsToggleGroup
		value={tool}
		onchange={setTool}
		items={[
			{ value: 'add', icon: 'mdi:add-bold' },
			{ value: 'subtract', icon: 'mdi:minus-thick' },
			{ value: 'select', icon: 'mdi:selection' },
		]}
	/>

	<!-- <BatsButton
		class="batsButton subtleKind"
    style="padding: 0px 4px"
		onclick={handleClick}
	>
  <Icon icon="ic:baseline-deselect" class="batsButtonIcon" style="width: 22px; height: 22px;" />
  </BatsButton> -->
  	<BatsButton
		class="batsButton"
    variant="white"
    label="Deselect"
		onclick={handleClick}
	/>
</BatsToolbar>
