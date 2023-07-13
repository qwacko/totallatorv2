<script lang="ts">
  import { metadata } from "$lib/app/stores";
  import { pbAccounts } from "$lib/pocketbase/pbAccounts";
  import TextInputForm from "./TextInputForm.svelte";

  $metadata.title = "Journals";

  const { paramsStore, resultStore } = pbAccounts.journals.subscribeList({
    initialQueryParams: {
      filter: { description: "" },
      sort: [
        { key: "transaction.date", dir: "desc" },
        { key: "amount", dir: "desc" },
      ],
      expand: "account.title",
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
    {#each $resultStore.items as currentJournal}
      <tr>
        <td>
          <button
            class="border border-gray-600 px-2 py-1 rounded-md bg-gray-200"
            on:click={() => pbAccounts.journals.delete(currentJournal.id)}
            >x</button
          >
        </td>
        <td>{new Date(currentJournal.date).toISOString().slice(0, 10)}</td>
        <td>{currentJournal.description}</td>
        <td>
          <TextInputForm
            value={currentJournal.description}
            updateAction={(newValue) => {
              pbAccounts.journals.update({
                id: currentJournal.id,
                data: { description: newValue },
              });
            }}
          />
        </td>
        <td>{currentJournal.account}</td>
        <td>{currentJournal.amount}</td>
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
