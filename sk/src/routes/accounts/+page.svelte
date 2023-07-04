<script lang="ts">
  import { metadata } from "$lib/app/stores";
  import { pbAccounts } from "$lib/pocketbase/pbAccounts";

  $metadata.title = "Accounts";

  const { filterStore, ...accountsStore } =
    pbAccounts.accounts.subscribeList({
      initialFilter: { title: "" },
      initialSort: [{ key: "title", dir: "asc" }],
    });
</script>

<input bind:value={$filterStore.title} type="text" class="flex" />
{#if $accountsStore?.items}
  <table>
    {#each $accountsStore.items as currentAccount}
      <tr>
        <td><button class="border border-gray-600 px-2 py-1 rounded-md bg-gray-200" on:click={() => pbAccounts.accounts.delete(currentAccount.id)}>x</button></td>
        <td>{currentAccount.title}</td>
      </tr>
    {/each}
  </table>
  <button on:click={accountsStore.prev}>Prev</button>
  {$accountsStore.page} / {$accountsStore.totalPages}
  <button on:click={accountsStore.next}>Next</button>
{/if}
<form on:submit|preventDefault={(e) => console.log(e)}>
  <input type="text" id="title" />
</form>
