<script>
	import { patternStore } from "../stores/pattern.svelte";
	const tones = Object.values(patternStore.state.tones);
</script>

<div class="PATTERN_EDITOR column w-full">
	<div class="head">
		<div class="octaveControl"></div>
		<div class="timingLabels"></div>
	</div>
	<div class="body"></div>
</div>