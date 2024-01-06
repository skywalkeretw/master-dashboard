<script>
    import { onMount } from "svelte";
    import { Accordion } from '@svelteuidev/core';
    import FunctionElement from './functionElement.svelte'

    let loopCount = 5;
    let items = Array.from({ length: loopCount }, (_, index) => index);


    // onMount(()=> {
    //     fetch("url")
    //     .then(res =>{
    //         return res.json()
    //     })
    //     .then(data => {
    //         console.log(data)
    //     })
    //     .catch(err => {

    //     })
    // })

</script>

<Accordion variant="separated" radius="md">
    {#each items as item (item)}
    <FunctionElement/>
    {/each} 
</Accordion>

