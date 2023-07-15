<script lang="ts">
  import type { BudgetsResponse } from "$lib/pocketbase/generated-types";
  import Selectable from "./Selectable.svelte";
  import { budgetsStore } from "./budgetStore";

  export let value: string;
  export let changeAction: (id: string) => unknown | Promise<unknown>;

  const filterFunction = (item: BudgetsResponse, inputValue: string) => {
    // Example string normalization function. Replace as needed.
    const normalize = (str: string) => str.normalize().toLowerCase();
    const normalizedInput = normalize(inputValue);
    return (
      normalizedInput === "" || normalize(item.title).includes(normalizedInput)
    );
  };

  const itemToString = (item: BudgetsResponse) => item.title;
  const itemToSecondString = (item: BudgetsResponse) => item.title;
</script>

<Selectable
  items={$budgetsStore?.items || []}
  {value}
  {changeAction}
  {filterFunction}
  {itemToString}
  {itemToSecondString}
  placeholder="Select Budget"
/>
