<script lang="ts">
  import { metadata } from "$lib/app/stores";
  import {
    Collections,
    type AccountsResponse,
    AccountsTypeOptions,
  } from "$lib/pocketbase/generated-types";
  import { subscribeFilteredStore } from "$lib/pocketbase/pocketbase";
  import { writable } from "svelte/store";

  $metadata.title = "Accounts";

  const newAccounts = subscribeFilteredStore<AccountsResponse>(
    Collections.Accounts,
    { filter: "title ~ 'account'" },
    1,
    5
  );

  let titleFilter = writable("");

  type AccountFilterType = {
    title?: string | undefined;
    type?: AccountsTypeOptions[] | undefined;
  };
  const accountFilter = (filter: AccountFilterType | undefined) => {
    if (!filter) {
      return "";
    }
    let filterArray: string[] = [];
    if (filter.title) {
      filterArray.push(`title ~ '${filter.title}'`);
    }
    if(filter.type && filter.type.length > 0){
        const mappedFilter =  filter.type.map(item => `type = '${item}'`)
        const concatFilter = mappedFilter.join(" || ")
        filterArray.push("(" + concatFilter + ")")
    }

    return filterArray.join(" && ");
  };

  const updateFilter = (titleSearch: string) => {
    const filter = accountFilter({ title: titleSearch , type: [AccountsTypeOptions.asset]});
    newAccounts.queryParamsStore.set({ filter });
  };

  $: updateFilter($titleFilter);
</script>

<input bind:value={$titleFilter} type="text" class="flex" />
{$titleFilter}
{#if $newAccounts?.items}
  <table>
    {#each $newAccounts.items as currentAccount}
      <tr>
        <td>New - {currentAccount.title}</td>
      </tr>
    {/each}
  </table>
{/if}
