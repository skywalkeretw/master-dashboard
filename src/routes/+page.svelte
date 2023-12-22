<script>
    import  CreateFunction from "./createFunction.svelte";
    let newFucntion =false
</script>

<main>
    <button on:click={() => (newFucntion = !newFucntion)}>Create Function</button>
    {#if newFucntion}
    <CreateFunction/>
    {/if}
</main>