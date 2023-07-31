<script lang="ts">
  import { metadata } from "$lib/app/stores";
  import { pbAccounts } from "$lib/pocketbase/pbAccounts";

  $metadata.title = "Accounts";

  const { paramsStore, resultStore } = pbAccounts.accounts.subscribeList({
    initialQueryParams: {
      filter: { title: "" },
      sort: [{ key: "title", dir: "asc" }],
    },
  });
</script>

<input bind:value={$paramsStore.filter.title} type="text" class="flex" />
{#if $resultStore?.items}
  <table>
    {#each $resultStore.items as currentAccount}
      <tr>
        <td
          ><button
            class="border border-gray-600 px-2 py-1 rounded-md bg-gray-200"
            on:click={() => pbAccounts.accounts.delete(currentAccount.id)}
            >x</button
          ></td
        >
        <td>{currentAccount.title}</td>
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
