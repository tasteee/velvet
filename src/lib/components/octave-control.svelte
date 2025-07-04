<script>
	import Icon from "@iconify/svelte";
	import { patternStore } from "../stores/pattern.svelte";

</script>

<div class="octaveControl">
	<div class="octaveButton UpButton">
		<Icon icon="mingcute:up-fill" font-size="1rem" />
	</div>
	<div class="octaveButton downButton">
		<Icon icon="mingcute:down-fill" font-size="1rem" />
	</div>
</div>

<style lang="postcss">
	@reference "tailwindcss";
	@reference "../styles/utilities.css";



		 .octaveControl {
			@apply row;
			@apply w-[64px] h-[32px] min-h-[32px];
			@apply border-b border-black;
		}

		 .octaveButton {
			@apply w-[32px] h-[100%];
			@apply flex flex-row items-center justify-center;
			@apply border-r border-black;
			@apply hover:bg-black hover:text-white;
		}

</style>
