<!-- AceEditor.svelte -->

<script>
  import { onMount, createEventDispatcher, afterUpdate } from 'svelte';
  import { writable } from 'svelte/store';

  const dispatch = createEventDispatcher();
  let editor;

  // Import writable store for editor content

  export let initialCode = "function foo(items) {\n  var x = 'All this is syntax highlighted';\n  return x;\n}";
  export let editorContent = ""; 

  onMount(() => {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");

    // Set the initial content of the editor
    editor.setValue(initialCode);
    dispatch("contentChange", initialCode);

    // Listen for changes in the editor and update the store
    editor.getSession().on("change", function () {
      const newContent = editor.getValue();
      dispatch("contentChange", newContent);
    });
  });


  $: if (editorContent !== null ){
    console.log(editorContent);
    // set editor value
  }
   
</script>

<style>
  #editor-container {
    width: 600px;
    height: 200px;
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
</style>

<div id="editor-container">
  <div id="editor"></div>
</div>
