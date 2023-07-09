<script lang="ts">
  import { metadata } from "$lib/app/stores";
  import { pbAccounts } from "$lib/pocketbase/pbAccounts";

  $metadata.title = "Transactions";

  const { paramsStore, resultStore } = pbAccounts.transactions.subscribeList({
    initialQueryParams: {
      filter: { description: "" },
      sort: [
        { key: "date", dir: "desc" },
        { key: "amount", dir: "desc" },
      ],
    },
  });
</script>

<div class="flex flex-col gap-1 items-start px-2 pb-4">
  <div>Description Filter</div>
  <input
    bind:value={$paramsStore.filter.description}
    type="text"
    class="flex border"
  />
</div>
{#if $resultStore?.items}
  <table>
    {#each $resultStore.items as currentTransaction}
      <tr>
        <td>
          <button
            class="border border-gray-600 px-2 py-1 rounded-md bg-gray-200"
            on:click={() =>
              pbAccounts.transactions.delete(currentTransaction.id)}>x</button
          >
        </td>
        <td>{new Date(currentTransaction.date).toISOString().slice(0, 10)}</td>
        <td>{currentTransaction.description}</td>
        <td>{currentTransaction.amount}</td>
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
