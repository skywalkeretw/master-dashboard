<script>
    import AceEditor from './AceEditor.svelte';
    function onChangeCode(event) {
      console.log(event.detail)
    }
  </script>
  
  <main>
    <AceEditor on:contentChange={onChangeCode}/>

  </main>