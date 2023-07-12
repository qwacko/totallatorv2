<script lang="ts">
  export let clickFunction: () => Promise<void>;

  let loading = false;

  const actionHandler = async () => {
    loading = true;
    const start = performance.now();
    await clickFunction();
    const end = performance.now();
    console.log(`Function took ${end - start} milliseconds to complete.`);

    loading = false;
  };

  const functionWithLoading = () => {
    actionHandler();
  };
</script>

{#if loading}
  <div class="flex">Loading...</div>
{:else}
  <button
    {...$$restProps}
    on:click={functionWithLoading}
    class="flex bg-gray-100 border border-gray-500 p-1 rounded-sm hover:bg-gray-500 hover:text-white"
  >
    <slot />
  </button>
{/if}
