<script>
  import { onMount, createEventDispatcher, onDestroy } from 'svelte';
  const dispatch = createEventDispatcher();
  let editor;
  let editorContainer;

  export let language = "";
  export let editorId = Math.random().toString(36).substr(2, 9); // Generate a unique ID for each editor
  export let editorContent = "";
  let mount = false;

  function setEditor(code) {
    editor.setValue(code);
    validate();
    dispatch("contentChange", code);
  }

  function setMode() {
    editor.session.setMode("ace/mode/" + language);
  }

  function validate() {
    // Validation logic remains the same
    // ...

    //editor.session.setAnnotations(annotations);
  }

  function setKeys(){
    editor.commands.addCommands([
      {
        name: "showSettingsMenu",
        bindKey: {
          win: "Ctrl-q",
          mac: "Ctrl-q"
        },
        exec: function (editor) {
          editor.showSettingsMenu();
        },
        readOnly: true
      }
    ]);
  }

  onMount(() => {
    editor = ace.edit(`editor-${editorId}`);
    ace.require('ace/ext/settings_menu').init(editor);
    editor.setTheme("ace/theme/monokai");
    setKeys()
    setMode();
    mount = true;
    
    // Set the initial content of the editor
    setEditor(editorContent)
    // Listen for changes in the editor and update the store
    editor.getSession().on("change", function () {
      const newContent = editor.getValue();
      dispatch("contentChange", newContent);
    });
    editor.on("input", () => {
      validate();
    });
  });

  // Update the content of the editor
  $: if (editorContent !== "" && mount) {
    setEditor(editorContent);
  }

  // change the language of the editor
  $: if (language !== "" && mount) {
    setMode();
  }

  onDestroy(() => {
    // Clean up when the component is destroyed
    // ace.edit(`editor-${editorId}`);
    //editor.container.destroy();
    console.log("destroy")
  });
</script>

<style>
  .editor-container {
    width: 100%; /* Adjust width as needed */
    height: 300px; /* Adjust height as needed */
    border: 1px solid #ccc;
    position: relative;
    margin-bottom: 20px; /* Add margin to separate multiple editors */
  }

  .editor {
    width: 100%;
    height: 100%;
  }
</style>

<div class="editor-container" bind:this={editorContainer}>
  <div class="editor" id={`editor-${editorId}`}></div>
</div>
<button on:click={() => editor.showSettingsMenu()}>Show Settings Menu</button>
