<script>
    // imports
    import parseFunction from "../../helpers/parseFunction";
    import {
        TextInput,
        Textarea,
        NativeSelect,
        SimpleGrid,
        Text,
        Space,
        Checkbox,
        Button,
        FileUpload,
        Group,
    } from "@svelteuidev/core";
    import AceEditor from "../ace/AceEditor.svelte";
    import { parseTSCode } from "./parseTSFunction.js";
    import { parseGoCode } from "./parseGolangFunction.js";
    import { parsePyCode } from "./parsePythonFunction.js";
    import axios from "axios";

    // Variables used to create the Function
    // Function Name
    let name = "";
    let description = "";
    // Programming Language used an options
    let lang = "javascript";
    let languages = [
        { label: "Python", value: "python" },
        { label: "NodeJS", value: "javascript" },
        { label: "Golang", value: "golang" },
    ];
    // modes the function should support
    // let modes = [
    //     { id: "", label: 'HTTP Sync', value: true },
    //     { id: "", label: 'HTTP Async', value: false },
    //     { id: "", label: 'Messaging Sync', value: true },
    //     { id: "", label: 'Messaging Async ', value: false }
    // ]
    let modes = {
        httpsync: { label: "HTTP Sync", value: true },
        httpasync: { label: "HTTP Async", value: false },
        messagingsync: { label: "Messaging Sync", value: true },
        messagingasync: { label: "Messaging Async ", value: false },
    };

    let codeInput =
        "function foo(items) {\n  var x = 'All this is syntax highlighted';\n  return x;\n}";
    let code = "";

    let parametersInput = "{}";
    let parameters = "";

    let returnDataInput = "{}";
    let returnData = "";

    function handleCodeEditorContentChange(newContent) {
        code = newContent.detail;
    }

    function handleParametersEditorContentChange(newContent) {
        parameters = newContent.detail;
    }

    function handleReturnDataEditorContentChange(newContent) {
        returnData = newContent.detail;
    }

    function handleFileInputChange(event) {
        if (code !== "") {
            if (!confirm("Overwrite current code, params and return?")) {
                return;
            }
        }
        const fileInput = event.target;
        const file = fileInput.files[0];
        console.log(file);

        if (file && file.type === "text/plain") {
            const reader = new FileReader();

            reader.onload = () => {
                codeInput = reader.result;
                fileInput.value = "";
            };

            reader.readAsText(file);
        } else {
            alert("Please select a valid text file (.txt)");
            fileInput.value = "";
        }
    }

    function parseCode() {
        let parsedData = {};
        console.log("parseCode:", lang);
        switch (lang) {
            case "python":
                parsedData = parsePyCode(code);
                break;
            case "golang":
                parsedData = parseGoCode(code);
                break;
            case "javascript":
                parsedData = parseTSCode(code);
                break;
        }
        return parsedData;
    }

    function parseName(event) {
        event.preventDefault();
        name = parseCode().name;
    }

    function parseParameters(event) {
        event.preventDefault();
        parametersInput = JSON.stringify(parseCode().parameters);
    }

    function parseReturn(event) {
        event.preventDefault();
        returnDataInput = JSON.stringify(parseCode().return);
    }

    function createFunction() {
        console.log("submit");
        let data = {
            name: name,
            description: description,
            language: lang,
            sourcecode: btoa(code),
            inputparameters: btoa(parameters),
            returnvalue: btoa(returnData),
            functionmodes: {
                httpsync: modes.httpsync.value,
                httpasync: modes.httpasync.value,
                messagingsync: modes.messagingsync.value,
                messagingasync: modes.messagingasync.value
            },
        };
        console.log(data);

        axios.post("http://localhost:8081/api/v1/createfunction", data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
</script>

<form on:submit|preventDefault={createFunction}>
    <SimpleGrid
        breakpoints={[
            { maxWidth: 980, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
        cols={3}
        spacing="xl"
    >
        <div>
            <TextInput
                bind:value={name}
                placeholder="Function Name"
                label="Function Name"
                size="md"
            />
            <Button on:click={parseName}>Get Name</Button>
            <Space h="xl" />
            <Textarea
                placeholder="Function Description"
                label="Function Description"
                rows={6}
                bind:value={description}
                size="md"
            />
            <Space h="xl" />
            <NativeSelect
                data={languages}
                bind:value={lang}
                label="Language"
                description="Select The Programming language you want to use"
            />
            <Space h="xl" />
            <Text>Modes</Text>
            {#each Object.entries(modes) as [modeId, { label, value }]}
                <Checkbox bind:checked={modes[modeId].value} {label} />
            {/each}
        </div>

        <div>
            <AceEditor
                label="Code"
                language={lang}
                editorId="code"
                editorContent={codeInput}
                on:contentChange={handleCodeEditorContentChange}
            />
            <!-- <FileUpload accept=".txt" on:change={handleFileInputChange} /> -->
            <FileUpload
                reset={false}
                preview={false}
                on:change={handleFileInputChange}
            />
            <!-- <input type="file" accept=".txt" on:change={handleFileInputChange} /> -->
        </div>
        <div>
            <AceEditor
                label="Parameters"
                language={"json"}
                editorId="parameters"
                editorContent={parametersInput}
                on:contentChange={handleParametersEditorContentChange}
            />
            <Button on:click={parseParameters}>Update Params</Button>
            <Space h="md" />
            <AceEditor
                label="Return"
                language={"json"}
                editorId="return"
                editorContent={returnDataInput}
                on:contentChange={handleReturnDataEditorContentChange}
            />
            <Button on:click={parseReturn}>Update Return</Button>
        </div>
    </SimpleGrid>
    <Button type="submit">Create Function</Button>
</form>
