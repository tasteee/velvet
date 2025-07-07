<script lang="ts">
	import { Button, Tooltip } from 'bits-ui'
	import Icon from '@iconify/svelte'

	type PropsT = {
		icon?: string
		label?: string
		tip?: string
		isDisabled?: boolean
		variant?: 'solid' | 'subtle' | 'ghost'
		onclick?: (event: MouseEvent) => void
		id?: string
		class?: string
		style?: string
		href?: string
		children?: any
	}

	const props: PropsT = $props()

	const variantClass = $derived.by(() => {
		const isSolid = props.variant === 'solid'
		const isSubtle = props.variant === 'subtle'
		const isGhost = props.variant === 'ghost'
		if (isSolid) return 'solidKind'
		if (isSubtle) return 'subtleKind'
		if (isGhost) return 'ghostKind'
	})

	const baseClass = $derived(`batsButton ${props.class || ''}`)
	const combinedClass = $derived(`${baseClass} ${variantClass}`)
</script>

{#snippet content()}
	{#if props.icon}
		<Icon class="batsButtonIcon" icon={props.icon} />
	{/if}
	{#if props.label}
		{props.label}
	{/if}
	{#if props.children}
		{@render props.children()}
	{/if}
{/snippet}

{#snippet button()}
	<Button.Root
		disabled={props.isDisabled}
		class={combinedClass}
		style={props.style}
		id={props.id}
		href={props.href}
		onclick={props.onclick}
	>
		{@render content()}
	</Button.Root>
{/snippet}

{#if props.tip}
	<Tooltip.Provider>
		<Tooltip.Root delayDuration={200}>
			<Tooltip.Trigger>
				{@render button()}
			</Tooltip.Trigger>
			<Tooltip.Content sideOffset={8}>
				<div class="batsTooltipContent">
					{props.tip}
				</div>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{:else}
	{@render button()}
{/if}

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../../styles/utilities.css';
	@reference '../../styles/tokens.css';

	:global {
		.batsTooltipContent {
			@apply rounded-sm shadow-md;
		}

		.batsButton {
			@apply sansFont;
			@apply rounded-sm font-bold;
		}

		.batsButton.solidKind {
			color: var(--white);
			box-shadow: var(--shadow-mini);
			background: linear-gradient(to top, #000, var(--color-silver-950));
		}

		.batsButton.solidKind:hover {
			background: linear-gradient(to top, #000, var(--color-silver-900));
			box-shadow: var(--shadow-lg);
		}

		.batsButton.subtleKind {
			border: 1px solid var(--black);
			background: var(--white);
			color: var(--black);
			background: linear-gradient(180deg, var(--color-silver-50), var(--color-silver-300));
			box-shadow: var(--shadow-mini);
			transition: all 0.25s ease-in-out;
		}

		.batsButton.subtleKind:hover {
			background: linear-gradient(180deg, var(--color-silver-50), var(--color-silver-100));
			box-shadow: var(--shadow-md);
		}

		.batsButton.ghostKind {
			background: transparent;
			color: var(--black);
		}

		.batsButton.ghostKind:hover {
			background: var(--color-silver-100);
		}
	}
</style>
