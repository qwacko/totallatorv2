<script lang="ts">
  import type { AccountsResponse } from "$lib/pocketbase/generated-types";
  import Selectable from "./Selectable.svelte";
  import { accountsStore } from "./accountStore";

  export let value: string;
  export let changeAction: (id: string) => unknown | Promise<unknown>;

  const filterFunction = (item: AccountsResponse, inputValue: string) => {
    // Example string normalization function. Replace as needed.
    const normalize = (str: string) => str.normalize().toLowerCase();
    const normalizedInput = normalize(inputValue);
    return (
      normalizedInput === "" || normalize(item.title).includes(normalizedInput)
    );
  };

  const itemToString = (item: AccountsResponse) => item.title;
  const itemToSecondString = (item: AccountsResponse) => item.type;
</script>

<Selectable
  items={$accountsStore?.items || []}
  {value}
  {changeAction}
  {filterFunction}
  {itemToString}
  {itemToSecondString}
  placeholder="Select Account"
/>
