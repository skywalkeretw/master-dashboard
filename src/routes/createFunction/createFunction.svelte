<script>
    // imports 
    import parseFunction from "../../helpers/parseFunction";
    import { TextInput, Textarea, NativeSelect, SimpleGrid, Text, Space, Checkbox, Button, FileUpload, Group } from '@svelteuidev/core';
    import AceEditor from '../ace/AceEditor.svelte'
    
    // Variables used to create the Function
    // Function Name
    let name = "";
    let description = "";
    // Programming Language used an options
    let lang = 'javascript';
    let languages=[
        {label: "Python", value: "python"},
        {label: "NodeJS", value: "javascript"},
        {label: "Golang", value: "golang"}
    ]
    // modes the function should support
    // let modes = [
    //     { id: "", label: 'HTTP Sync', value: true },
    //     { id: "", label: 'HTTP Async', value: false },
    //     { id: "", label: 'Messaging Sync', value: true },
    //     { id: "", label: 'Messaging Async ', value: false }
    // ]
    let modes = {
        "httpsync": { label: 'HTTP Sync', value: true },
        "httpasync": { label: 'HTTP Async', value: false },
        "messagingsync": { label: 'Messaging Sync', value: true },
        "messagingasync": { label: 'Messaging Async ', value: false }
    }

    let codeInput = "function foo(items) {\n  var x = 'All this is syntax highlighted';\n  return x;\n}";
    let code = "";

    let parametersInput = "{}"
    let parameters = ""

    let returnDataInput = "{}"
    let returnData = ""

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
            if (!confirm("Overwrite current code, params and return?")){
                return
            }
        }
        const fileInput = event.target
        const file = fileInput.files[0];
        console.log(file)

        if (file && file.type === 'text/plain') {
            const reader = new FileReader();

            reader.onload = () => {
                codeInput = reader.result;
                fileInput.value = "";
            };

            reader.readAsText(file);
        } else {
            alert('Please select a valid text file (.txt)');
            fileInput.value = "";
        }
    };
    

    function parseCode() {
        let data = parseFunction(code, lang)
        console.log(data)
        parameters = (typeof data.params === 'object') ? JSON.stringify(data.params) : data.params;
        returnData = (typeof data.ret === 'object') ? JSON.stringify(data.ret) : data.ret;
    }
    
    function createFunction(){
        let data = {
            name: name,
            description: description,
            language: lang,
            modes: modes,
            code: code,
            parameters: parameters,
            returnData: returnData
        }
        console.log(data)
        // fetch("url", {

        // })
        // .then(res => {
        //     isLoading = false

        // })
        // .catch(err => {
        //     isLoading = false

        // })
    }
</script>

<form on:submit|preventDefault={createFunction}>
    <SimpleGrid
        breakpoints={[
            { maxWidth: 980, cols: 3, spacing: 'md' },
            { maxWidth: 755, cols: 2, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' }
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
            <Space h="xl"/>
            <Textarea  
                placeholder="Function Description"
                label="Function Description"
                rows={6}
                bind:value={description}
                size="md"
            />
            <Space h="xl"/>
            <NativeSelect
                data={languages}
                bind:value={lang}
                label="Language"
                description="Select The Programming language you want to use"
            />
            <Space h="xl"/>
            <Text>Modes</Text>
            {#each Object.entries(modes) as [modeId, { label, value }]}
                <Checkbox bind:checked={modes[modeId].value} label={label} />
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
            <FileUpload  reset={false} preview={false} on:change={handleFileInputChange}/>
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
            <Button>Update Params</Button>
            <Space h="md"/> 
            <AceEditor
                label="Return"
                language={"json"}
                editorId="return"
                editorContent={returnDataInput}
                on:contentChange={handleReturnDataEditorContentChange}
            />
            <Button>Update Return</Button>
        </div>
    </SimpleGrid>
    <Button type="submit">Create Function</Button>
</form>