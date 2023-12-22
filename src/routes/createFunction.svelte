<script>
    let languages = [
        {"lable": "Python", "value": "python"},
        {"lable": "NodeJS", "value": "nodejs"},
        {"lable": "Golang", "value": "golang"}
    ]

    let name = ""
    let lang = "python"
    let code = "";
    let httpsync = true
    let httpasync = false
    let messagingsync = true
    let messagingasync = false


    function handleFileInputChange(event) {
        console.log(console.log(event))
        if (code != "") {
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
    
    $: console.log(name, lang)
</script>

<form on:submit|preventDefault={()=> console.log("submit")}>
    <label for="name">Function Name</label>
    <input type="text" bind:value={name} >

    <label for="language">language</label>
    <select bind:value={lang}>
        {#each languages as language}
        <option value="{language.value}">{language.lable}</option>
        {/each}
    </select>

    <label for="functionCode">Function Code</label>
    <textarea id="functionCode" bind:value={code} ></textarea>
    <input type="file" accept=".txt" on:change={handleFileInputChange} />

    <div>
        <h2>HTTP</h2>
        <input type="checkbox" bind:checked={httpsync}>
        <input type="checkbox" bind:checked={httpasync}>
        <h2>Messaging</h2>
        <input type="checkbox" bind:checked={messagingsync}>
        <input type="checkbox" bind:checked={messagingasync}>
    </div>

    <button type="submit">Deploy Function</button>
</form>