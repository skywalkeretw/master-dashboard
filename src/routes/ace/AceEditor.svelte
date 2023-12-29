<!-- AceEditor.svelte -->

<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let editorWidth = 300; // Initial width value
  let editorContent = "function foo(items) {\n  var x = 'All this is syntax highlighted';\n  return x;\n}";

  onMount(() => {
    const editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");

    // Set the initial content of the editor
    editor.setValue(editorContent);

    // Listen for changes in the editor and dispatch the contentChange event
    editor.getSession().on("change", function () {
      const newContent = editor.getValue();
      dispatch("contentChange", newContent);
    });
  });

  function showAlert() {
    alert("Button clicked!");
  }
</script>
  
<style>
  #editor-container {
    width: 600px; /* Adjust the width as needed */
    height: 200px; /* Adjust the height as needed */
    border: 1px solid #ccc;
    position: relative;
  }

  #editor {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  button {
    margin-top: 10px;
  }
</style>

<div id="editor-container">
    <div id="editor"></div>
</div>
  
<button on:click={showAlert}>Show Alert</button>