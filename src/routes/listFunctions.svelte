<script>
    import functionsList from "./functions";

</script>

{#each $functionsList as func }
<div>
    <p>id: {func.id} name: {func.name}</p>
</div>
{/each}