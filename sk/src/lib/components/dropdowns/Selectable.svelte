<script lang="ts">
  import { createCombobox } from "@melt-ui/svelte";
  import Icon from "@iconify/svelte";

  type T = $$Generic<{ id: string }>;
  type StringFunction = (item: T) => string;

  export let items: T[];
  export let filterFunction: (item: T, inputValue: string) => boolean;
  export let itemToString: StringFunction;
  export let itemToSecondString: undefined | StringFunction;
  export let placeholder: string | undefined = undefined;

  export let value: string;
  export let changeAction: (id: string) => unknown | Promise<unknown>;

  const {
    open,
    input,
    menu,
    item,
    inputValue,
    isSelected,
    filteredItems,
    updateItems,
    selectedItem,
  } = createCombobox({
    filterFunction,
    items,
    itemToString,
  });

  const setSelectedItem = (id: string, items: T[]) => {
    if (items) {
      const target = items.find((item) => item.id === id);
      if (target) {
        $selectedItem = target;
        $inputValue = itemToString(target);
      }
    }
  };

  const handleChange = async (newSelectedItem: T) => {
    if (newSelectedItem && newSelectedItem.id !== value) {
      await changeAction(newSelectedItem.id);
    }
  };

  $: setSelectedItem(value, items);
  $: updateItems(() => items);
  $: handleChange($selectedItem);
</script>

<label class="cursor-pointer">
  <div class="relative">
    <input
      {...$input}
      class="flex h-10 items-center justify-between rounded-md bg-white
            px-3 pr-12 text-red-700"
      {placeholder}
      use:input
      value={$inputValue}
    />
    <div class="absolute right-1 top-1/2 z-10 -translate-y-1/2 text-red-700">
      {#if $open}
        <Icon icon="mdi:chevron-up" />
      {:else}
        <Icon icon="mdi:chevron-down" />
      {/if}
    </div>
  </div>
</label>

<div
  class="z-10 flex max-h-[300px] flex-col overflow-hidden rounded-md"
  {...$menu}
  use:menu
>
  <ul class="flex max-h-full flex-col gap-2 overflow-y-auto bg-white px-2 py-2">
    {#if $open}
      {#if $filteredItems.length !== 0}
        {#each $filteredItems as current, index (index)}
          <li
            {...$item({
              index,
              item: current,
            })}
            use:item
            class="relative cursor-pointer rounded-md py-1 pl-8 pr-4 text-neutral-800
                        data-[highlighted]:bg-red-100 data-[highlighted]:text-red-700
                        data-[disabled]:opacity-50"
          >
            {#if $isSelected(current)}
              <div class="check"><Icon icon="mdi:check" /></div>
            {/if}
            <div>
              <span>{itemToString(current)}</span>
              {#if itemToSecondString}
                <span class="block text-sm opacity-70"
                  >{itemToSecondString(current)}</span
                >
              {/if}
            </div>
          </li>
        {/each}
      {:else}
        <li
          class="relative cursor-pointer rounded-md py-1 pl-8 pr-4
                    text-neutral-800 data-[highlighted]:bg-red-100
                    data-[highlighted]:text-red-700"
        >
          No results found
        </li>
      {/if}
    {/if}
  </ul>
</div>

<style lang="postcss">
  .check {
    @apply absolute left-2 top-1/2 text-red-500;
    translate: 0 calc(-50% + 1px);
  }
</style>
