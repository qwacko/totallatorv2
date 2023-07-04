<script lang="ts">
  import { metadata } from "$lib/app/stores";
  import {
    generateAccounts,
    getAndLogAccounts,
    removeAccounts,
  } from "$lib/pocketbase/seed/bulkActions";

  $metadata.title = "Bulk Actions";

  let loading = false;

  const functionWithLoading = (action: () => Promise<void>) => {
    const actionInternal = async () => {
      loading = true;
      await action();
      loading = false;
    };
    actionInternal();
  };
</script>

{loading ? "Loading" : "Not Loading"}

{#if loading}
  <div class="bg-red p-2">Loading...</div>
{:else}
  <div class="flex flex-col gap-2 px-2">
    <button class="flex" on:click={() => functionWithLoading(getAndLogAccounts)}>Log Account</button>
    <button
      class="flex bg-gray-100 border border-gray-500 p-1 rounded-sm hover:bg-gray-500"
      on:click={() =>
        functionWithLoading(async () => {
          await generateAccounts({
            countAssets: 30,
            countLiabilities: 10,
            countExpenses: 200,
            countIncome: 20,
          });
        })}>Create Accounts</button
    >
    <button class="flex" on:click={() => functionWithLoading(removeAccounts)}
      >Remove Accounts</button
    >
  </div>
{/if}
