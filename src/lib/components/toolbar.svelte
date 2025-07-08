<script lang="ts">
	import Icon from '@iconify/svelte'
</script>

<div class="toolbarContainer flex items-center justify-center">
	<div class="toolbar">
		<Icon icon="clarity:pencil-solid" color="black" font-size="20px" />
		<Icon icon="ph:selection-plus-bold" color="black" font-size="20px" />
		<Icon icon="solar:eraser-bold" color="black" font-size="20px" />
	</div>
</div>

<style lang="postcss">
	@reference "tailwindcss";
	@reference "../styles/utilities.css";

	@layer components {
		.toolbarContainer {
			@apply relative;
			@apply top-0 left-0;
			@apply h-[64px] w-[64px];
		}

		.toolbar {
			@apply bg-silver-200;
			@apply border border-black;
			@apply rounded-sm;
			@apply shadow-sm;
			@apply column aCenter jStart gap-4 p-1 py-2;
		}
	}
</style>
