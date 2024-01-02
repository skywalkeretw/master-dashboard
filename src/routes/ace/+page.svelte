<!-- ParentComponent.svelte -->

<script>
  import AceEditor from './AceEditor.svelte';
  let parentContent = "This is content from the parent";
  let out = ""
  function handleEditorContentChange(newContent) {
    console.log("Received update from editor:", newContent.detail);
    out = newContent.detail;
  }

  function updateEditorContent() {
    // Send new code to the editor
    parentContent = "New content from the parent";
  }
</script>

<AceEditor editorContent={parentContent} on:contentChange={handleEditorContentChange} />

<button on:click={updateEditorContent}>Update Editor Content</button>


<br>
<textarea value={out}></textarea>