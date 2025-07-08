<script lang="ts">
	import { Toolbar } from 'bits-ui'

	type PropsT = {
		class?: string
        children?: any
	}

	const props: PropsT = $props()
</script>

<Toolbar.Root class={`batsToolbar ${props.class ?? ''}`}>
	{@render props.children()}
</Toolbar.Root>

<style lang="postcss">
	@reference 'tailwindcss'
	@reference '../../styles/utilities.css'
	@reference '../../styles/tokens.css'

	:global {
		.batsToolbar {
			@apply flex min-w-max items-center justify-center gap-1 px-1 py-[2px] border rounded-sm shadow-mini;
			height: 32px;
			background: linear-gradient(180deg, var(--color-silver-50), var(--color-silver-300));
			border-color: var(--black);
		}

		/* Toggle group buttons */
		.batsToolbar .batsToggleGroup {
			@apply flex items-center gap-1;
		}

		.batsToolbar .batsToggleGroupItem {
			@apply inline-flex items-center justify-center rounded-sm transition-all active:scale-[0.98];
			width: 28px;
			height: 28px;
			color: var(--black);
			background: transparent;
		}

		.batsToolbar .batsToggleGroupItem:hover {
			background: var(--color-silver-100);
		}

		.batsToolbar .batsToggleGroupItem[data-state='on'] {
			color: var(--white);
			background: linear-gradient(to top, #000, var(--color-silver-950));
			box-shadow: var(--shadow-mini);
		}

		.batsToolbar .batsToggleGroupItem[data-state='on']:hover {
			background: linear-gradient(to top, #000, var(--color-silver-900));
			box-shadow: var(--shadow-lg);
		}

		/* Buttons inside toolbar */
		.batsToolbar .batsButton {
			@apply inline-flex items-center justify-center rounded-sm px-3 text-sm font-bold transition-all active:scale-[0.98];
			height: 28px;
			box-shadow: var(--shadow-mini);
		}

		.batsToolbar .batsButton:disabled {
			opacity: 0.4;
			pointer-events: none;
		}

		/* Select and others can be added here */
		.batsToolbar .batsSelect {
			height: 28px;
			@apply rounded-sm px-2 text-sm;
		}
	}
</style>
