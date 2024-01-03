<!-- AceEditor.svelte -->

<script>
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let editor;

  // Import writable store for editor content
  //export let initialCode = "";
  export let editorContent = "";
  export let language = "";
  let mount = false;
  
  function setEditor(code){
    editor.setValue(code);
    validate();
    dispatch("contentChange", code);
  }

  function setMode() {
    console.log(language)
    editor.session.setMode("ace/mode/" + language);
  }

  function validate() {
    editor.session.clearAnnotations();
    var lines = editor.session.getDocument().getAllLines();
    let annotations = [];
    for (var i in lines) {
        if (!/^[\w\s]*$/.test(lines[i])) {
            annotations.push({
                row: i,
                type: "error",
                text: "This line contains special symbols!"
            });
        }
        else if (/\d/.test(lines[i])) {
            annotations.push({
                row: i,
                type: "warning",
                text: "This line contains numbers!"
            });
        }
        else if (/_/.test(lines[i])) {
            annotations.push({
                row: i,
                type: "info",
                text: "This line contains _!"
            });
        }

    }
    editor.session.setAnnotations(annotations);
}

  onMount(() => {
    editor = ace.edit("editor");
    ace.require('ace/ext/settings_menu').init(editor);
    editor.setTheme("ace/theme/monokai");
    setMode()
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
    setEditor(editorContent)
  }

  // change the langauge of the editor
  $: if (language !== "" && mount) {
    setMode()
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
<button on:click={editor.showSettingsMenu()}>Show Settings Menu</button>