<script lang="ts">
  import { metadata } from "$lib/app/stores";
  import { pbAccounts } from "$lib/pocketbase/pbAccounts";

  $metadata.title = "Budgets";

  const { paramsStore, resultStore } = pbAccounts.budgets.subscribeList({
    initialQueryParams: {
      filter: { title: "" },
      sort: [{ key: "title", dir: "asc" }],
    },
  });
</script>

<div class="flex flex-col gap-1 items-start px-2 pb-4">
  <div>Title Filter</div>
  <input
    bind:value={$paramsStore.filter.title}
    type="text"
    class="flex border"
  />
</div>
{#if $resultStore?.items}
  <table>
    {#each $resultStore.items as currentBudget}
      <tr>
        <td>
          <button
            class="border border-gray-600 px-2 py-1 rounded-md bg-gray-200"
            on:click={() => pbAccounts.budgets.delete(currentBudget.id)}
            >x</button
          >
        </td>
        <td>{currentBudget.title}</td>
      </tr>
    {/each}
  </table>
  <button on:click={() => ($paramsStore.page = ($paramsStore.page || 0) - 1)}
    >Prev</button
  >
  {$resultStore.page} / {$resultStore.totalPages}
  <button on:click={() => ($paramsStore.page = ($paramsStore.page || 0) + 1)}
    >Next</button
  >
{/if}
