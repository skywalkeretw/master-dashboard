<script>
    import { onMount } from "svelte";
    import { Accordion, Loader, Center, Stack, Text } from '@svelteuidev/core';
    import FunctionElement from './functionElement.svelte'
    import axios from "axios";

    let loopCount = 5;
    let items = Array.from({ length: loopCount }, (_, index) => index);
    let functions = null

    onMount(()=> {
        getFunctions()
    })
    function getFunctions() {
        console.log("get function data")
        axios.get("http://localhost:8081/api/v1/function")
            .then(response => {
                functions = response.data
            })
            .catch(error => {
                console.log(error);
            });
    }

</script>
{#if functions !== null}
<Accordion variant="separated" radius="md">
    <!-- {#each items as item (item)}
    <FunctionElement/>
    {/each}  -->
    {#each functions as fn}
        <FunctionElement fn={fn}/>
    {/each}
</Accordion>
{:else}
<Center>
    <Stack>
        <Text>Loading</Text>
        <Loader variant='dots' />
    </Stack>
</Center>
{/if}


