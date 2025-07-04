<script lang="ts">
	const props = $props()
</script>

<div>
	<div class="">
		<p class="ml-[12px]">{props.title}</p>
	</div>

	<div padding="8px">
		{@render props.children()}
	</div>
</div>
