<script>
    import { colorScheme, Stack, Title, Button, Switch } from '@svelteuidev/core';

    function toggleTheme() {
       colorScheme.update((v) => (v === 'light' ? 'dark' : 'light'));
   }
</script>

<style>
    .stack {
        padding: 2rem;
        display: flex;
        justify-content: space-between; /* Align items to the left and right */
        align-items: center;
    }
</style>

<div class="stack">
    <Title order={1}>Functions</Title>
    <Stack>
        <!-- Use the Button component for the button -->
        <!-- <Button on:click={() =>alert("ok")}>Button</Button> -->
        <Switch 
            size="lg"
            radius="sm"
            color="dark"
            on:change={toggleTheme}
        />
    </Stack>
</div>
