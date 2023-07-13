<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let value: string;
  export let updateAction: (newValue: string) => void | Promise<void>;

  $: internalValue = value;

  let loading = false;

  const handleKeypress = (
    e: KeyboardEvent & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    if (e.code === "Enter") {
      handleChange();
    }
    if (e.code === "Esc") {
      internalValue = value;
    }
  };

  const handleChange = async () => {
    if (value !== internalValue) {
      loading = true;
      await updateAction(internalValue);
      loading = false;
    }
  };
</script>

<input
  type="text"
  disabled={loading}
  bind:value={internalValue}
  on:blur={handleChange}
  on:keypress={handleKeypress}
/>
