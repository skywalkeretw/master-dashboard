<script>
    let languages = [
        {"lable": "Python", "value": ""},
        {"lable": "NodeJS", "value": ""},
        {"lable": "Golang", "value": ""}
    ]

    function handleFileInputChange(event){
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                fileContent = reader.result;
            };

            reader.readAsText(file);
        }

    }
</script>

<form on:submit|preventDefault={()=> console.log("submit")}>
    <label for="name">Function Name</label>
    <input type="text" id="name" >
    <label for="language">language</label>
    <select name="lang">
        {#each languages as language}
        <option value="{language.value}">{language.lable}</option>
        {/each}
    </select>
    <label for="functionCode">Function Code</label>
    <textarea id="functionCode" ></textarea>
    <input id="codeFile" type="file" on:change={handleFileInputChange}>

    <button type="submit">Deploy Function</button>
</form>