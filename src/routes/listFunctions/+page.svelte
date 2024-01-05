<script>
    import { Accordion } from '@svelteuidev/core';
    import FunctionElement from './functionElement.svelte'

    let loopCount = 5;
    let items = Array.from({ length: loopCount }, (_, index) => index);
</script>
<Accordion>
    {#each items as item (item)}
    <FunctionElement/>
    {/each} 
</Accordion>

