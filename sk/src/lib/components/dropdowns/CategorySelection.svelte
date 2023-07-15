<script lang="ts">
  import type { CategoriesResponse } from "$lib/pocketbase/generated-types";
  import Selectable from "./Selectable.svelte";
  import { categoriesStore } from "./categoryStore";

  export let value: string;
  export let changeAction: (id: string) => unknown | Promise<unknown>;

  const filterFunction = (item: CategoriesResponse, inputValue: string) => {
    // Example string normalization function. Replace as needed.
    const normalize = (str: string) => str.normalize().toLowerCase();
    const normalizedInput = normalize(inputValue);
    return (
      normalizedInput === "" ||
      normalize(item.combinedTitle).includes(normalizedInput)
    );
  };

  const itemToString = (item: CategoriesResponse) => item.combinedTitle;
  const itemToSecondString = (item: CategoriesResponse) => item.group;
</script>

<Selectable
  items={$categoriesStore?.items || []}
  {value}
  {changeAction}
  {filterFunction}
  {itemToString}
  {itemToSecondString}
  placeholder="Select Category"
/>
