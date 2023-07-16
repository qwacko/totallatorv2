<script lang="ts">
  import { metadata } from "$lib/app/stores";
  import { pbAccounts } from "$lib/pocketbase/pbAccounts";
  import AccountSelection from "$lib/components/dropdowns/AccountSelection.svelte";
  import TagSelection from "$lib/components/dropdowns/TagSelection.svelte";
  import TextInputForm from "./TextInputForm.svelte";
  import CategorySelection from "$lib/components/dropdowns/CategorySelection.svelte";
  import BillSelection from "$lib/components/dropdowns/BillSelection.svelte";
  import BudgetSelection from "$lib/components/dropdowns/BudgetSelection.svelte";
  import { AccountsTypeOptions } from "$lib/pocketbase/generated-types";

  $metadata.title = "Journals";

  const { paramsStore, resultStore } = pbAccounts.journals.subscribeList({
    initialQueryParams: {
      filter: {
        accountType: [AccountsTypeOptions.asset, AccountsTypeOptions.liability],
      },
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
  <table class="space-x-0 space-y-0 text-xs">
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
        <td>
          <AccountSelection
            value={currentJournal.account}
            changeAction={async (newValue) => {
              console.log("Updating Acccount ", newValue);
              await pbAccounts.journals.update({
                id: currentJournal.id,
                data: { account: newValue },
              });
            }}
          />
        </td>
        <td>
          <AccountSelection
            value={currentJournal.otherAccount}
            changeAction={async (newValue) => {
              console.log("Updating Other Acccount ", newValue);
              await pbAccounts.journals.update({
                id: currentJournal.id,
                data: { otherAccount: newValue },
              });
            }}
          />
        </td>
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
        <td>{currentJournal.amount}</td>
        <td>
          <TagSelection
            value={currentJournal.tag}
            changeAction={async (newValue) => {
              console.log("Updating Tag", newValue);
              await pbAccounts.journals.update({
                id: currentJournal.id,
                data: { tag: newValue },
              });
            }}
          />
        </td>
        <td>
          <CategorySelection
            value={currentJournal.category}
            changeAction={async (newValue) => {
              console.log("Updating Category", newValue);
              await pbAccounts.journals.update({
                id: currentJournal.id,
                data: { category: newValue },
              });
            }}
          />
        </td>
        <td>
          <BillSelection
            value={currentJournal.bill}
            changeAction={async (newValue) => {
              console.log("Updating Bill", newValue);
              await pbAccounts.journals.update({
                id: currentJournal.id,
                data: { bill: newValue },
              });
            }}
          />
        </td>
        <td>
          <BudgetSelection
            value={currentJournal.budget}
            changeAction={async (newValue) => {
              console.log("Updating Budget", newValue);
              await pbAccounts.journals.update({
                id: currentJournal.id,
                data: { budget: newValue },
              });
            }}
          />
        </td>
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
