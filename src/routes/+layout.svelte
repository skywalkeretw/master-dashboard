<script>
	import { SvelteUIProvider } from '@svelteuidev/core';
	import HeadContent from './headContent.svelte';
</script>

<style>
	.content{
		margin: 0.5rem;
		padding: 1.5rem;
	}
</style>

<SvelteUIProvider withGlobalStyles>
	<HeadContent/>
	<div class="content">
		<slot />
	</div>
</SvelteUIProvider>