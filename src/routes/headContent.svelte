<script>
    import { colorScheme, Burger, Stack, Space,Breadcrumbs, Title, Divider, Menu, Tooltip, Switch } from '@svelteuidev/core';
    import { page } from '$app/stores';  

    let dark = false;
    function toggleTheme() {
        colorScheme.update((v) => {
            dark = v === 'dark' ? false : true;
            return v === 'dark' ? 'light' : 'dark';
        });
    }

</script>

<style>
    .container {
        padding: 2rem;
        border-bottom: solid 0.25rem;
        border-image: linear-gradient(to right, transparent, rgb(9, 83, 169), transparent);
        border-image-slice: 1;
    }
    .stack {

        display: flex;
        justify-content: space-between; /* Align items to the left and right */
        align-items: center;
    }
</style>

<div class="container">
    <div class="stack">
        <Title order={1}>Functions</Title>
        <!-- <Menu {opened} on:open={onOpen} on:close={onClose}>
            <Burger slot="control" {opened} on:click={() => console.log("burger")} /> -->
        <Menu>
            <Burger slot="control" opened={false}/>
            <Menu.Label>Pages</Menu.Label>
            <Menu.Item root='a' href='/'>Home</Menu.Item>
            <Menu.Item root='a' href='/listFunctions'>List Functions</Menu.Item>
            <Menu.Item root='a' href='/createFunction'>Create Functions</Menu.Item>
            <Menu.Item root='a' href='/ace'>Ace</Menu.Item>
            <Divider></Divider>
            <Menu.Label>Settings</Menu.Label>
            <Menu.Item>
                <Stack>
                    <Tooltip
                        wrapLines
                        width={220}
                        withArrow
                        transitionDuration={200}
                        openDelay={2000}
                        closeDelay={1000}
                        label='Toggle Dark/Light Mode'
                    >
                        <Switch 
                        size="sm"
                        radius="sm"
                        color="dark"
                        bind:checked={dark}
                        on:change={toggleTheme}
                        />
                    </Tooltip>
                </Stack>
            </Menu.Item>
        </Menu>
    </div>
    <Space h="md"/>
    <div>
        <Breadcrumbs size="md" separator="→">
            <Breadcrumbs.Item active={$page.url.pathname === '/'} href="/">
                HOME
            </Breadcrumbs.Item>
            {#if $page.url.pathname !== '/' }
                <Breadcrumbs.Item active={true}>{$page.url.pathname.replace("/", "").replace(/([A-Z])/g, ' $1').toUpperCase()}</Breadcrumbs.Item>
            {/if}
        </Breadcrumbs>
    </div>    
</div>


