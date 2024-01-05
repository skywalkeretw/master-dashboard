<script>
    import { colorScheme, Stack, Title, Tooltip, Switch } from '@svelteuidev/core';

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
        border-bottom: solid 0.25rem;
        border-image: linear-gradient(to right, transparent, rgb(9, 83, 169), transparent);
        border-image-slice: 1;
    }
</style>

<div class="stack">
    <Title order={1}>Functions</Title>
    <Stack>
        <Tooltip
            wrapLines
            width={220}
            withArrow
            transitionDuration={200}
            openDelay={3000}
            closeDelay={500}
            label='Toggle Dark/Light Mode'
        >
            <Switch 
            size="lg"
            radius="sm"
            color="dark"
            on:change={toggleTheme}
            />
        </Tooltip>
    </Stack>
</div>
