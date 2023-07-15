<script lang="ts">
  import type { BillsResponse } from "$lib/pocketbase/generated-types";
  import Selectable from "./Selectable.svelte";
  import { billsStore } from "./billStore";

  export let value: string;
  export let changeAction: (id: string) => unknown | Promise<unknown>;

  const filterFunction = (item: BillsResponse, inputValue: string) => {
    // Example string normalization function. Replace as needed.
    const normalize = (str: string) => str.normalize().toLowerCase();
    const normalizedInput = normalize(inputValue);
    return (
      normalizedInput === "" || normalize(item.title).includes(normalizedInput)
    );
  };

  const itemToString = (item: BillsResponse) => item.title;
  const itemToSecondString = (item: BillsResponse) => item.title;
</script>

<Selectable
  items={$billsStore?.items || []}
  {value}
  {changeAction}
  {filterFunction}
  {itemToString}
  {itemToSecondString}
  placeholder="Select Bill"
/>
