<!-- App.svelte -->

<script>
  import AceEditor from './AceEditor.svelte';

  let parentEditorCode = "function bar(items) {\n  var y = 'New code from parent';\n  return y;\n}";

  function handleContentChange(newContent) {
    console.log("Parent component received content change:", newContent);
    // Handle the content change as needed in the parent component
  }
</script>

<style>
  /* Add your styles if needed */
</style>

<h1>Parent Component</h1>

<AceEditor bind:initialCode={parentEditorCode} on:contentChange={handleContentChange} />

<p>Parent Editor Code: {parentEditorCode}</p>
