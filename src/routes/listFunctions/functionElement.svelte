<script>
    import { afterUpdate, onMount } from "svelte";
    import {
        Accordion,
        Badge,
        Button,
        Card,
        Group,
        Title,
        Text,
        Space,
        NativeSelect,
    } from "@svelteuidev/core";
    import axios from "axios";

    export let editorId = Math.random().toString(36).substr(2, 9); // Generate a unique ID for each editor

    export let fn = {};

    let badges = [
        { text: "Python", color: "pink" },
        { text: "v1.2.0", color: "green" },
        { text: "other", color: "blue" },
    ];
    function badgeColor(type) {
        let color = "blue";
        switch (type) {
            case "runtime":
                color = "pink";
                break;
            case "version":
                color = "green";
                break;
        }
        return color;
    }

    let selectedMode = "";
    // supported modes
    let modes = [];

    function onDataReceived() {
        badges = [];
        for (const key in fn.tags) {
            if (fn.tags.hasOwnProperty(key)) {
                // Get the value corresponding to the key
                const value = fn.tags[key];
                // Call badgeColor function to determine badge color
                const color = badgeColor(key);
                // Add new badge object to the badges array
                badges.push({ text: value, color: color });
            }
        }
    }
    onMount(() => {
        modes = [];
        for (const mode in fn.modes) {
            if (fn.modes.hasOwnProperty(mode)) {
                const value = fn.modes[mode];
                // changeDisabledValue(mode, value);
                let label = "";
                switch (mode) {
                    case "httpsync":
                        label = "HTTP Sync";
                        break;
                    case "httpasync":
                        label = "HTTP Async";
                        break;
                    case "messagingsync":
                        label = "Messaging Sync";
                        break;
                    case "messagingasync":
                        label = "Messaging Async";
                        break;
                }
                if (selectedMode === "" && value) {
                    selectedMode = mode;
                }
                modes = [
                    ...modes,
                    { label: label, value: mode, disabled: !value },
                ];
            }
        }
    });
    // Watch for changes to myObject and run onDataReceived function
    afterUpdate(() => {
        onDataReceived();
    });

    // Programming Language used an options
    let lang = "javascript";
    let languages = [
        { label: "Python", value: "python" },
        { label: "NodeJS", value: "javascript" },
        { label: "Golang", value: "golang" },
    ];

    function downloadAdapterCode() {
        console.log(
            "language ",
            lang,
            "function: ",
            fn.name,
            "mode ",
            selectedMode,
        );

        axios
            .post(
                "http://localhost:8081/api/v1/generateadaptercode",
                {
                    function: fn.name,
                    mode: selectedMode,
                    language: lang,
                },
                {
                    responseType: "blob", // Set the responseType to blob to receive the file as binary data
                },
            )
            .then(function (response) {
                // Get filename from response headers
                console.log(response)
                console.log(response.headers)
                console.log(response.data)
                const contentDisposition = response.headers["content-disposition"];
                const fileNameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
                const fileName = fileNameMatch ? fileNameMatch[1] : "downloaded-file";

                // Create a new Blob object from the response data
                const file = new Blob([response.data], {
                    type: response.headers["content-type"],
                });

                // Create a temporary link element
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(file);
                link.download = fileName; // Set the filename obtained from the response
                link.click(); // Trigger the download
            })
            .catch(function (error) {
                console.log(error);
            });
    }
</script>

<Accordion.Item value="control-{editorId}">
    <div slot="control">
        <Group position="apart">
            <Title>{fn.name}</Title>
            <div>
                {#each badges as { text, color }}
                    <Badge {color}>
                        {text}
                    </Badge>
                {/each}
            </div>
        </Group>
    </div>
    <Group position="apart">
        <Text weight={500}>{fn.description}</Text>
    </Group>

    <Space h="xl" />

    <Group position="apart">
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
        <Button on:click={downloadAdapterCode} variant="light" color="blue"
            >Download Adapter Code</Button
        >
    </Group>
</Accordion.Item>
