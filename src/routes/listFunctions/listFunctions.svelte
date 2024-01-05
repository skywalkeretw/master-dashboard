<script>
    import { onMount } from "svelte";
    import functionsList from "./functions";
    onMount(()=> {
        fetch("url")
        .then(res =>{
            return res.json()
        })
        .then(data => {
            console.log(data)
        })
        .catch(err => {

        })
    })

</script>

{#each $functionsList as func }
<div>
    <p>id: {func.id} name: {func.name}</p>
</div>
{/each}