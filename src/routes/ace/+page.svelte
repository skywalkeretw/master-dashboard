<!-- ParentComponent.svelte -->

<script>
  import AceEditor from './AceEditor.svelte';
  let parentContent =  "function foo(items) {\n  var x = 'All this is syntax highlighted';\n  return x;\n}";
  let jsonContent ="{}"
  let jsonContent2 ="{\"lol\":123}"
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

  function handleJSONEditorContentChange2(newContent) {
    console.log("Received update from JSON editor:", newContent.detail);
    //out = newContent.detail;
  }
  function updateEditorContent() {
    // Send new code to the editor
    parentContent = out;
  }
</script>

<style>
  .editor {
    width: 80%;
  }

</style>

<label for="language">language</label>
<select bind:value={lang}>
    {#each languages as language}
    <option value="{language.value}">{language.lable}</option>
    {/each}
</select>

<AceEditor
  class="editor"
  language={lang}
  editorId="js-editor"
  editorContent={parentContent}
  on:contentChange={handleEditorContentChange}
/>
<!-- <AceEditor language={lang} editorContent={parentContent} on:contentChange={handleEditorContentChange} /> -->

<button on:click={updateEditorContent}>Update Editor Content</button>


<br>
<textarea class="editor" bind:value={out}></textarea>

<!-- <AceEditor language={"json"} editorContent={jsonContent} on:contentChange={handleJSONEditorContentChange} /> -->

<div class="editor">
  <AceEditor
  class="editor"
  language="json"
  editorId="json-editor"
  editorContent={jsonContent}
  on:contentChange={handleJSONEditorContentChange}
/>
</div>


<AceEditor
  class="editor"
  language="json"
  editorId="json-editor2"
  editorContent={jsonContent2}
  on:contentChange={handleJSONEditorContentChange2}
/>