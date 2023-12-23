<script>
    import  CreateFunction from "./createFunction.svelte";
    import  ListFunctions  from "./listFunctions.svelte";
    let newFucntion =false
</script>

<main>
    <button on:click={() => (newFucntion = !newFucntion)}>Create Function</button>
    {#if newFucntion}
    <CreateFunction/>
    {/if}
    <ListFunctions/>
</main>