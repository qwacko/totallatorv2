<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let title: string;
  export let buttonText: string;
  export let cancelText: string;
  export let showModal: boolean;

  const dispatch = createEventDispatcher();

  function closeModal() {
    showModal = false;
  }

  function handleAction() {
    dispatch("action");
    closeModal();
  }

  function handleOverlayClick(event: Event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
</script>

{#if showModal}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
    on:click={handleOverlayClick}
  >
    <div class="bg-white p-4 w-96 rounded-md shadow-lg z-60">
      <h2 class="text-lg font-bold mb-4">{title}</h2>
      <div class="mb-4">
        <slot />
      </div>
      <div class="flex justify-between">
        <button
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          on:click={closeModal}
        >
          {cancelText}
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          on:click={handleAction}
        >
          {buttonText}
        </button>
      </div>
    </div>
  </div>
{/if}
