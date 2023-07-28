<script lang="ts">
  import Button from "./Button.svelte";
  import Modal from "./Modal.svelte";

  export let showModal = false;
  export let buttonText = "Accept";
  export let cancelText = "Cancel";
  export let title: string;
  export let action: () => void = () => {};
</script>

<Button on:click={() => (showModal = true)} {...$$restProps}><slot /></Button>

<Modal bind:showModal {buttonText} {cancelText} {title} on:action={action}>
  <slot name="modalContent" /></Modal
>
