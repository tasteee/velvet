<script lang="ts">
	import RootNoteSelect from './root-note-select.svelte'
	import ScaleTypeSelect from './scale-type-select.svelte'

	import { SCALE_CHORDS } from '$lib/constants/theory/scale-chords'
	import { projectStore } from '$lib/stores/project.svelte'
	import { theory } from '$lib/modules/theory'
	import Icon from '@iconify/svelte'
	import { ScrollArea } from 'bits-ui'

	const chords = $derived.by(() => {
		const scaleType = projectStore.state.scaleType
		const rootNote = projectStore.state.scaleRootNote
		const scale = `${rootNote} ${scaleType}`
		const key = scale as keyof typeof SCALE_CHORDS
		const scaleChordSymbols = SCALE_CHORDS[key]
		if (!scaleChordSymbols) return []
		const getChord = (symbol: string) => theory.getChord(symbol)
		const filterClean = (chord: any) => !!chord
		const list = scaleChordSymbols.map(getChord).filter(filterClean)
		return Array.from(new Set(list))
	})
</script>

<div class="chordGridBox row xCenter gap-5">
	<div class="chordGridLeftColumn column gap-10 xCenter pt-2">
		<Icon icon="mdi:music-note" font-size="24px" class="text-silver-500" />
		<Icon icon="mdi:music-note" font-size="24px" class="text-silver-500" />
		<Icon icon="mdi:music-note" font-size="24px" class="text-silver-500" />
		<Icon icon="mdi:music-note" font-size="24px" class="text-silver-500" />
		<Icon icon="mdi:music-note" font-size="24px" class="text-silver-500" />
	</div>
	<div class="chordGridRightColumn column gap-5">
		<div class="optionsRow row gap-4">
			<RootNoteSelect />
			<ScaleTypeSelect />
		</div>

		<ScrollArea.Root type="hover" class="chordGridScrollBox relative overflow-hidden">
			<ScrollArea.Viewport class="h-full max-h-[340px] w-full py-4">
				<div class="row gap-2 flex-wrap">
					{#each chords as chord (chord.symbol)}
						{#if chord.symbol}
							<div class="chordCard row gap-2 w-[200px]">
								<div class="chordCardLeftColumn w-full">
									<p class="chordCardSymbol">
										<span>
											{chord.symbol}
										</span>
									</p>
								</div>
								<div class="chordCardRightColumn column xCenter yAround">
									<Icon
										icon="material-symbols:edit-square"
										font-size="20px"
										class="chordCardIcon"
									/>
									<Icon icon="streamline-flex:heart-solid" font-size="20px" class="chordCardIcon" />
									<Icon icon="f7:clear-fill" font-size="22px" class="chordCardIcon" />
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</ScrollArea.Viewport>
			<ScrollArea.Scrollbar
				orientation="vertical"
				class="bg-muted hover:bg-dark-10 data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out-0 data-[state=visible]:fade-in-0 flex w-2.5 touch-none select-none rounded-full border-l border-l-transparent p-px transition-all duration-200 hover:w-3"
			>
				<ScrollArea.Thumb class="bg-muted-foreground flex-1 rounded-full" />
			</ScrollArea.Scrollbar>
		</ScrollArea.Root>
		{#if chords.length === 0}
			<span class="text-gray-500 italic">No chords available for this scale</span>
		{/if}
	</div>
</div>

<style lang="postcss">
	@reference 'tailwindcss';
	@reference '../styles/utilities.css';

	@layer components {
		:global {
			.chordGridScrollBox {
				padding: 0px 12px;
				border: 1px solid var(--black);
				background: var(--color-silver-200);
				width: 100%;
				height: 280px;
			}

			.chordCardRightColumn {
				width: 32px;
			}

			.chordCard {
				background: var(--color-silver-50);
				border: 1px solid var(--black);
				@apply h-[120px];
				@apply rounded-sm;
				@apply shadow-sm;
				@apply px-2 py-1;
				@apply text-sm monoFont;
				@apply sansFont;
			}

			.chordCard .chordCardLeftColumn {
			}

			.chordCardSymbol span {
				z-index: 50;
				position: relative;
				color: var(--color-silver-50);
			}

			.chordCardSymbol {
				margin-left: 8px;
				font-weight: 700;
				position: relative;

				&:before {
					content: '';
					font-weight: 400;
					background: var(--color-silver-950);
					border-radius: 3px 0px 4px 4px;
					height: 30px;
					width: 140px;
					position: absolute;
					right: 10px;
					top: -6px;
					color: var(--color-silver-50);
				}
			}

			.chordGridBox {
				margin-top: 12px;
				flex: 1 1 auto;
				border: 1px solid var(--border-color);
				border-radius: var(--border-radius);
			}

			.chordGridLeftColumn {
				width: 48px;
				min-width: 48px;
			}

			.chordGridRightColumn {
				width: 100%;
			}

			.chordGrid {
				@apply grid grid-cols-4 gap-4;
			}
		}
	}
</style>
