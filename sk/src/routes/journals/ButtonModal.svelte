<script lang="ts">
  import Modal from "./Modal.svelte";

  let showModal = false;
</script>

<button on:click={() => (showModal = true)}>Open Modal</button>
<Modal
  bind:showModal
  buttonText="Go"
  cancelText="Cancel"
  title="Modal Title"
  on:action={(e) => console.log(e)}
>
  This Is The Modal Content</Modal
>
