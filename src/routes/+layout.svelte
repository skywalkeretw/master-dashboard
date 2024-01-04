<script>
	import { SvelteUIProvider } from '@svelteuidev/core';
	import HeadContent from './headContent.svelte';
</script>

<SvelteUIProvider withGlobalStyles>
	<HeadContent/>
	<slot />
</SvelteUIProvider>