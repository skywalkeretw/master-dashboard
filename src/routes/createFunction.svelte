<script>
    // imports 
    import parseFunction from "../helpers/parseFunction";
    import { TextInput, NativeSelect, SimpleGrid, Text, Space, Checkbox, Button } from '@svelteuidev/core';
    import AceEditor from './ace/AceEditor.svelte'


    let languages=[
        {label: "Python", value: "python"},
        {label: "NodeJS", value: "javascript"},
        {label: "Golang", value: "golang"}
    ]

    let name = "";
    let lang = 'javascript';

    let codeInput = "function foo(items) {\n  var x = 'All this is syntax highlighted';\n  return x;\n}";
    let code = "";

    let modes = [
        { id: "", label: 'HTTP Sync', value: true },
        { id: "", label: 'HTTP Async', value: false },
        { id: "", label: 'Messaging Sync', value: true },
        { id: "", label: 'Messaging Async ', value: false }
    ]

    let parametersInput = ""
    let parameters = ""

    let returnDataInput = ""
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

        if (file && file.type === 'text/plain') {
            const reader = new FileReader();

            reader.onload = () => {
                code = reader.result;
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
            <NativeSelect
                data={languages}
                bind:value={lang}
                label="Language"
                description="Select The Programming language you want to use"
            />
            <Space h="xl"/>
            <Text>Modes</Text>
            {#each modes as item, index}
                <Checkbox bind:checked={modes[index].value} label={item.label} />
            {/each}
        </div>

        <div>
            <AceEditor
                language={lang}
                editorId="code"
                editorContent={codeInput}
                on:contentChange={handleCodeEditorContentChange}
            />
            <input type="file" accept=".txt" on:change={handleFileInputChange} />
        </div>
        <div>
            <AceEditor
                language={"json"}
                editorId="parameters"
                editorContent={parametersInput}
                on:contentChange={handleParametersEditorContentChange}
            />
            <AceEditor
                language={"json"}
                editorId="return"
                editorContent={returnDataInput}
                on:contentChange={handleReturnDataEditorContentChange}
            />
        </div>
    </SimpleGrid>
    <Button type="submit">Create Function</Button>
    <hr>
</form>