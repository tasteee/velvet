<script lang="ts">
	import { Select as BitsSelect } from 'bits-ui'
	import Icon from '@iconify/svelte'
	import type { SelectOptionT } from './types'

	import CaretDoubleUp from 'phosphor-svelte/lib/CaretDoubleUp'
	import CaretDoubleDown from 'phosphor-svelte/lib/CaretDoubleDown'
	import TinyCheckIcon from './icons/tiny-check-icon.svelte'
	import CaretDownIcon from './icons/caret-down-icon.svelte'

	type PropsT = {
		value?: string
		placeholder?: string
		icon?: string | null
		options: SelectOptionT[]
		class?: string
		width?: string
		isDisabled?: boolean
		isRequired?: boolean
		onchange?: (value: string) => void
	}

	const props: PropsT = $props()
	const matchValue = (option: SelectOptionT) => option.value === props.value
	const selectedOption = $derived(props.options.find(matchValue) as SelectOptionT)
	const style = $derived(`--selectWidth: ${props.width || '200px'}`)

	const onContentClick = (event: MouseEvent) => {
		if (event.button === 0) return
		event.stopPropagation()
		event.preventDefault()
	}
</script>

<BitsSelect.Root
	type="single"
	value={props.value}
	items={props.options}
	onValueChange={props.onchange}
	required={props.isRequired}
	disabled={props.isDisabled}
>
	<BitsSelect.Trigger class="selectTrigger {props.class}" aria-label={props.placeholder} {style}>
		{#if props.icon}
			<Icon icon={props.icon} class="selectTriggerIcon" />
		{/if}

		{#if props.value}
			<span class="selectTriggerValue">
				{selectedOption.label}
			</span>
		{:else}
			<span class="selectPlaceholder">{props.placeholder}</span>
		{/if}
		<CaretDownIcon />
	</BitsSelect.Trigger>
	<BitsSelect.Portal>
		<BitsSelect.Content
			class="selectContent shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-hidden z-50 h-96 max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)] select-none rounded-xl border px-1 py-3 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
			sideOffset={10}
			onclick={onContentClick}
			{style}
		>
			<BitsSelect.ScrollUpButton class="selectContentMoreButton">
				<CaretDoubleUp class="selectContentMoreIcon" />
			</BitsSelect.ScrollUpButton>
			<BitsSelect.Viewport class="selectViewport">
				{#each props.options as option}
					<BitsSelect.Item class="selectItem" value={option.value} label={option.label}>
						<span class:selectedItem={props.value === option.value}>
							{option.label}
						</span>

						{#if props.value === option.value}
							<div class="selectCheck">
								<TinyCheckIcon />
							</div>
						{/if}
					</BitsSelect.Item>
				{/each}
			</BitsSelect.Viewport>
			<BitsSelect.ScrollDownButton class="selectContentMoreButton">
				<CaretDoubleDown class="selectContentMoreIcon" />
			</BitsSelect.ScrollDownButton>
		</BitsSelect.Content>
	</BitsSelect.Portal>
</BitsSelect.Root>

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../../styles/utilities.css';

	:global(.selectTrigger) {
		@apply text-sm monoFont border border-black rounded-sm shadow-sm;
		@apply inline-flex items-center px-[10px] transition-colors;
		@apply focus:outline-none touch-none select-none bg-gray-100;
		width: var(--selectWidth);
		color: #111;
		font-weight: 500;
		gap: 0.5rem;
	}

	:global(.selectTriggerIcon) {
		@apply size-5 text-gray-800 mr-[9px];
		flex-shrink: 0;
	}
	:global(.selectPlaceholder) {
		@apply text-gray-400;
	}
	:global(.selectTrigger .caretDownIcon) {
		@apply size-6 text-gray-800 ml-auto;
		flex-shrink: 0;
	}
	:global(.selectContent) {
		@apply border border-black rounded-sm shadow-sm bg-gray-100 monoFont transition-colors;
		scroll-behavior: smooth;
		overscroll-behavior: contain;
		width: var(--selectWidth);
		max-height: 300px;
		z-index: 50;
		padding: 0.25rem 0;
		overflow: auto;
	}
	:global(.selectViewport) {
		@apply p-1;
	}

	:global(.selectContentMoreButton) {
		@apply size-4 flex w-full items-center justify-center py-2;
	}

	:global(.selectContentMoreIcon) {
		@apply size-3;
	}
	:global(.selectItem) {
		@apply flex items-center w-full px-4 py-2 rounded-sm cursor-pointer transition-colors;
		color: #111;
		background: transparent;
		font-family: inherit;
		font-size: 1rem;
		min-height: 2.5rem;
		position: relative;
		outline: none;
	}

	:global .selectItem .tinyCheckIcon {
		@apply size-4;
	}

	:global(.selectItem[data-highlighted]) {
		@apply bg-gray-200;
	}
	:global(.selectedItem) {
		color: #111;
		font-weight: bold;
	}
	:global(.selectOptionIcon) {
		@apply size-5 mr-2 text-gray-700;
		flex-shrink: 0;
	}
	:global(.selectCheck) {
		@apply ml-auto;
		color: #111;
		display: flex;
		align-items: center;
	}
</style>
