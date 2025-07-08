<script lang="ts">
	import { ToggleGroup } from 'bits-ui'
	import Icon from '@iconify/svelte'

	type ItemT = {
		value: string
		icon: string
		label?: string
	}

	type PropsT = {
		value: string
		type?: 'single' | 'multiple'
		items: ItemT[]
		class?: string
		onchange?: (value: string) => void
	}

	const props: PropsT = $props()
  const type = $derived(props.type ?? 'single')
  const className = $derived('batsToggleGroup ' + props.class || '')
  const selectedValue = $derived(props.value)
</script>

<ToggleGroup.Root
    value={props.value}
    onchange={props.onchange as any}
    type={type as any}
	  class={className}
>
	{#each props.items as item (item.value)}
		<ToggleGroup.Item
			value={item.value}
			aria-label={item.label ?? item.value}
			class="batsToggleGroupItem {selectedValue === item.value ? 'isSelected' : ''}"
		>
			<Icon icon={item.icon} class="batsToggleGroupItemIcon" />
		</ToggleGroup.Item>
	{/each}
</ToggleGroup.Root>

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../../styles/utilities.css';
	@reference '../../styles/tokens.css';

	:global {
		.batsToggleGroup {
			@apply flex items-center gap-2;
      @apply border border-black rounded-sm;
			background: linear-gradient(180deg, var(--color-silver-50), var(--color-silver-300));
      padding: 0px 4px;
		}

		.batsToggleGroupItem {
			@apply rounded-sm transition-all active:scale-[0.98];
			width: 28px;
			height: 26px;
			color: var(--black);
			background: transparent;
      padding: 0px 2px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
		}

		.batsToggleGroupItem:hover {
      background: var(--white);
		}

    .batsToggleGroupItem.isSelected {

    }

		.batsToggleGroupItem[data-state='on'] {
      background: linear-gradient(to top, #000, var(--color-silver-950));
      color: var(--white);
		}

		.batsToggleGroupItem[data-state='on']:hover {
		}

		.batsToggleGroupItemIcon {
			@apply size-5;
		}

    .batsToggleGroupItem[data-state='on'] .batsToggleGroupItemIcon {
      color: var(--white);
    }

    .batsToggleGroupItem:not([data-state='on']) .batsToggleGroupItemIcon {
      color: var(--black);
    }
	}
</style>
