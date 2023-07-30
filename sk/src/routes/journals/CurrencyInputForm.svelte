<script lang="ts">
  import { createLabel } from "@melt-ui/svelte";
  import { debounce } from "lodash";

  const root = createLabel();

  export let value: number;
  export let updateAction: (newValue: number) => void | Promise<void>;
  export let showLabel = false;

  let loading = false;

  $: internalValue = formatCurrency(value);
  $: changed = value !== formatNumber(tidyCurrency(internalValue));
  $: negative = formatNumber(tidyCurrency(internalValue)) < 0;

  const handleKeypress = (
    e: KeyboardEvent & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    if (e.code === "Enter") {
      handleChange();
    }
    if (e.code === "Escape") {
      internalValue = formatCurrency(value);
    }
  };

  const handleChange = async () => {
    if (changed) {
      loading = true;
      await updateAction(formatNumber(tidyCurrency(internalValue)));
      loading = false;
    }
  };

  const formatCurrency = (value: number) => {
    const currencyValue = value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return currencyValue;
  };

  const formatNumber = (value: string) => {
    return parseFloat(value.replace(/[^0-9.-]+/g, ""));
  };

  const tidyCurrency = (value: string) => {
    return formatCurrency(formatNumber(value));
  };

  const debouncedUpdate = debounce(async () => {
    // Tidy up the value
    internalValue = tidyCurrency(internalValue);
  }, 1000);

  const handleInput = (e: InputEvent & { target: HTMLInputElement }) => {
    internalValue = e.target.value;
    debouncedUpdate();
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
    value={internalValue}
    type="string"
    id="inputItem"
    class="h-10 w-[100px] rounded-md px-3 py-2 text-gray-700 border text-right font-bold"
    class:bg-blue-200={changed}
    class:text-red-400={negative}
    disabled={loading}
    on:input={handleInput}
    on:blur={handleChange}
    on:keyup={handleKeypress}
  />
</div>
