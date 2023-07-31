<script lang="ts">
  import { createLabel } from "@melt-ui/svelte";

  const root = createLabel();

  export let value: string;
  export let updateAction: (newValue: string) => void | Promise<void>;
  export let showLabel = false;

  $: valueSubstring = value.substring(0, 10);

  $: internalValue = valueSubstring;
  $: changed = valueSubstring !== internalValue;
  $: {
    if (internalValue === "" && valueSubstring !== "") {
      internalValue = valueSubstring;
    }
  }

  $: console.log("Internal Value", internalValue);

  let loading = false;

  const handleKeypress = (
    e: KeyboardEvent & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    if (e.code === "Enter") {
      handleChange();
    }
    if (e.code === "Escape") {
      internalValue = valueSubstring;
    }
  };

  const handleChange = async () => {
    if (valueSubstring !== internalValue) {
      loading = true;
      await updateAction(`${internalValue} 00:00:00.000Z`);
      loading = false;
    }
  };
</script>

<div class="flex flex-col items-start justify-center">
  {#if showLabel}
    <label
      use:root
      for="inputItem"
      class="mb-0.5 font-medium"
      data-melt-part="root"
    >
      <span>Description</span>
    </label>
  {/if}
  <input
    type="date"
    id="inputItem"
    class="h-10 w-[300px] rounded-md px-3 py-2 text-gray-700 border"
    class:bg-blue-100={changed}
    disabled={loading}
    bind:value={internalValue}
    on:blur={handleChange}
    on:keyup={handleKeypress}
  />
</div>
