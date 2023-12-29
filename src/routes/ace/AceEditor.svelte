<!-- AceEditor.svelte -->

<script>
    import { onMount } from 'svelte';
    let editor = null
    onMount(() => {
        editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/javascript");
        editor.resize()

        setTimeout(function() {
            console.log(editor.getValue())
        }, 20000);
    });

</script>
  
<style>
#editor {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 20rem;
    widows: 30rem;
}
</style>

<div id="editor"></div>
