
<script>
	import { Accordion, Badge, Button, Card, Group, Title, Text, Space, NativeSelect} from '@svelteuidev/core';
    export let editorId = Math.random().toString(36).substr(2, 9); // Generate a unique ID for each editor

    export let name = 'myFunc'

    // Programming Language used an options
    let lang = 'javascript';
    let languages=[
        {label: "Python", value: "python"},
        {label: "NodeJS", value: "javascript"},
        {label: "Golang", value: "golang"}
    ]
    let selectedMode
    // supported modes
    export let modes = [
        { label: 'HTTP Sync', value: "httpsync", disabled: false },
        { label: 'HTTP Async', value: "httpasync", disabled: true },
        { label: 'Messaging Sync', value: "messagingsync", disabled: false },
        { label: 'Messaging Async ', value: "messagingasync", disabled: true }
    ]

    let badges = [
        { text: 'Python', color: 'pink' },
        { text: 'v1.2.0', color: 'green' },
        { text: 'other', color: 'blue' },
    ]
</script>

<Accordion.Item value="control-{editorId}">
    <div slot="control">
        <Group position='apart'>
            <Title>{ name }</Title>
            <div>
                {#each badges as {text, color}}
                <Badge color={color}>
                    {text}
                </Badge>
                {/each}
            </div>
        </Group>
    </div>
    <Group position='apart'>
		<Text weight={500}>Function description</Text>
	</Group>
   
    <Space h="xl"/>
    
    <Group position='apart'>
        <NativeSelect
            data={languages}
            bind:value={lang}
            label="Language"
            description="Select The Programming language you want to use"
        />
        <NativeSelect
            data={modes}
            bind:value={selectedMode}
            label="Mode"
            description="Select The Mode you want to use"
        />
        <Button variant='light' color='blue'>
            Download Adapter Code
        </Button>
    </Group>
</Accordion.Item>
<!-- 
<Card shadow='sm' padding='lg'>
    <Group position='apart'>
        <Title>{ name }</Title>
        <div>
            <Badge color='pink'>
                Python
            </Badge>
            <Badge color='green'>
                On Sale
            </Badge>
        </div>
    </Group>

    <Space h="xl"/>

	<Group position='apart'>
		<Text weight={500}>Portugal Porto Adventures</Text>
	</Group>
   
    <Space h="xl"/>
    
    <Group position='apart'>
        <NativeSelect
            data={languages}
            bind:value={lang}
            label="Language"
            description="Select The Programming language you want to use"
        />
        <NativeSelect
            data={modes}
            bind:value={selectedMode}
            label="Mode"
            description="Select The Mode you want to use"
        />
        <Button variant='light' color='blue'>
            Download Adapter Code
        </Button>
    </Group>

</Card>
<Space h="xl"/> -->