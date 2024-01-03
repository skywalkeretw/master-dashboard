<!-- ParentComponent.svelte -->

<script>
  import AceEditor from './AceEditor.svelte';
  let parentContent =  "function foo(items) {\n  var x = 'All this is syntax highlighted';\n  return x;\n}";
  let jsonContent ="{}"
  let out = ""
  let lang = "python"
  let languages = [
        {"lable": "Python", "value": "python"},
        {"lable": "NodeJS", "value": "javascript"},
        {"lable": "Golang", "value": "golang"}
    ]

  function handleEditorContentChange(newContent) {
    console.log("Received update from editor:", newContent.detail);
    out = newContent.detail;
  }
  function handleJSONEditorContentChange(newContent) {
    console.log("Received update from JSON editor:", newContent.detail);
    //out = newContent.detail;
  }
  function updateEditorContent() {
    // Send new code to the editor
    parentContent = out;
  }
</script>

<label for="language">language</label>
<select bind:value={lang}>
    {#each languages as language}
    <option value="{language.value}">{language.lable}</option>
    {/each}
</select>

<AceEditor
  language="javascript"
  editorId="js-editor"
  editorContent={parentContent}
  on:contentChange={handleEditorContentChange}
/>
<!-- <AceEditor language={lang} editorContent={parentContent} on:contentChange={handleEditorContentChange} /> -->

<button on:click={updateEditorContent}>Update Editor Content</button>


<br>
<textarea bind:value={out}></textarea>

<!-- <AceEditor language={"json"} editorContent={jsonContent} on:contentChange={handleJSONEditorContentChange} /> -->


<AceEditor
  language="json"
  editorId="json-editor"
  editorContent={jsonContent}
  on:contentChange={handleJSONEditorContentChange}
/>