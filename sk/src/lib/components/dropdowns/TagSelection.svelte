<script lang="ts">
  import type { TagsResponse } from "$lib/pocketbase/generated-types";
  import Selectable from "./Selectable.svelte";
  import { tagsStore } from "./tagStore";

  export let value: string;
  export let changeAction: (id: string) => unknown | Promise<unknown>;

  const filterFunction = (item: TagsResponse, inputValue: string) => {
    // Example string normalization function. Replace as needed.
    const normalize = (str: string) => str.normalize().toLowerCase();
    const normalizedInput = normalize(inputValue);
    return (
      normalizedInput === "" ||
      normalize(item.combinedTitle).includes(normalizedInput)
    );
  };

  const itemToString = (item: TagsResponse) => item.combinedTitle;
  const itemToSecondString = (item: TagsResponse) => item.group;
</script>

<Selectable
  items={$tagsStore?.items || []}
  {value}
  {changeAction}
  {filterFunction}
  {itemToString}
  {itemToSecondString}
  placeholder="Select Tag"
/>
