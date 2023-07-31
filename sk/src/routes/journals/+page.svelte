<script lang="ts">
  import { metadata } from "$lib/app/stores";
  import { pbAccounts } from "$lib/pocketbase/pbAccounts";
  import AccountSelection from "$lib/components/dropdowns/AccountSelection.svelte";
  import TagSelection from "$lib/components/dropdowns/TagSelection.svelte";
  import TextInputForm from "$lib/components/TextInputForm.svelte";
  import DateInputForm from "$lib/components/DateInputForm.svelte";
  import CategorySelection from "$lib/components/dropdowns/CategorySelection.svelte";
  import BillSelection from "$lib/components/dropdowns/BillSelection.svelte";
  import BudgetSelection from "$lib/components/dropdowns/BudgetSelection.svelte";
  import { AccountsTypeOptions } from "$lib/pocketbase/generated-types";
  import Button from "$lib/components/Button.svelte";
  import Icon from "@iconify/svelte";
  import ButtonPopover from "$lib/components/ButtonPopover.svelte";
  import CurrencyInputForm from "$lib/components/CurrencyInputForm.svelte";
  import { createPagination } from "@melt-ui/svelte";

  $metadata.title = "Journals";

  const {
    options,
    prevButton,
    nextButton,
    pages,
    page,
    pageTrigger,
    range,
    root,
  } = createPagination({
    count: 0,
    page: 0,
    perPage: 20,
    siblingCount: 2,
  });

  const { paramsStore, resultStore } = pbAccounts.journals.displayWithTotal({
    filter: {
      accountType: [AccountsTypeOptions.asset, AccountsTypeOptions.liability],
    },
    sort: [
      { key: "transaction.date", dir: "desc" },
      { key: "amount", dir: "desc" },
    ],
    expand: "account.title",
  });

  $: $resultStore?.totalItems &&
    options.update((val) => ({ ...val, count: $resultStore.totalItems }));
  $: $paramsStore.page = $page;

  // TODO : Add Functionality To Have Selection Checkboxes
  // TODO : Add Buttons to change mode (validated, reconciled, complete etc....)
  // TODO : Add functionality to add a new journal entry
  // TODO : Add Bulk Actions Menu, and Bulk Actions
</script>

<div class="flex flex-col items-start gap-1 px-2 pb-4">
  <div>Description Filter</div>
  <input
    bind:value={$paramsStore.filter.description}
    type="text"
    class="flex border"
  />
</div>

{#if $resultStore?.items}
  <div class="font-bold">
    Count: {$resultStore.totalItems}
  </div>

  <!-- TODO : Pagination needs to be in another file -->
  <nav
    class="flex flex-col items-center gap-4"
    aria-label="pagination"
    melt={$root}
  >
    <p class="text-center">
      Showing items {$range.start} - {$range.end}
    </p>
    <div class="flex items-center gap-2">
      <button
        class="grid h-8 items-center rounded-sm bg-white px-3 text-sm text-magnum-700 shadow-sm
      hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 data-[selected]:bg-magnum-900
      data-[selected]:text-white"
        melt={$prevButton}><Icon icon="mdi:chevron-left" /></button
      >
      {#each $pages as page (page.key)}
        {#if page.type === "ellipsis"}
          <span>...</span>
        {:else}
          <button
            class="grid h-8 items-center rounded-sm bg-white px-3 text-sm text-magnum-700 shadow-sm
          hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 data-[selected]:bg-magnum-900
        data-[selected]:text-white"
            melt={$pageTrigger(page)}>{page.value}</button
          >
        {/if}
      {/each}
      <button
        class="grid h-8 items-center rounded-sm bg-white px-3 text-sm text-magnum-700 shadow-sm
      hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 data-[selected]:bg-magnum-900
    data-[selected]:text-white"
        melt={$nextButton}><Icon icon="mdi:chevron-right" /></button
      >
    </div>
  </nav>
  <table class="space-x-2 space-y-2 text-xs">
    {#each $resultStore.items as currentJournal, i}
      <tr>
        <td>
          <div class="inline-flex gap-0" role="group">
            <ButtonPopover
              color="red"
              action={() => pbAccounts.journals.delete(currentJournal.id)}
              buttonText="Delete"
            >
              <Icon icon="mdi:delete" />
              <svelte:fragment slot="content">
                <div class="text-xs">Delete Transaction?</div>
              </svelte:fragment>
            </ButtonPopover>
            <Button
              color="blue"
              style="danger"
              on:click={() =>
                pbAccounts.customEndpoints.bulkCloneTransactions([
                  currentJournal.transaction,
                ])}><Icon icon="mdi:content-copy" /></Button
            >
          </div>
        </td>
        <td>
          <DateInputForm
            value={currentJournal.date}
            updateAction={(newValue) => {
              pbAccounts.journals.update({
                id: currentJournal.id,
                data: { dateText: newValue.substring(0, 10) },
              });
            }}
          />
        </td>
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
        <td>
          <CurrencyInputForm
            value={currentJournal.amount}
            updateAction={(newValue) => {
              pbAccounts.journals.update({
                id: currentJournal.id,
                data: { amount: newValue },
              });
            }}
          />
        </td>
        <td>
          {currentJournal.total.toFixed(2)}
        </td>
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
