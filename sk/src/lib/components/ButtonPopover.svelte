<script lang="ts">
  import Icon from "@iconify/svelte";
  import { createPopover } from "@melt-ui/svelte";
  import { fade } from "svelte/transition";

  export let buttonText = "Accept";
  export let action: () => void = () => {};
  export let style: "primary" | "secondary" | "danger" = "primary";
  export let color: "blue" | "red" | "green" = "blue";
  export let grouped: boolean = true;

  const { trigger, content, open, arrow, close } = createPopover();
</script>

<button
  melt={$trigger}
  class="trigger text-white border-0 font-bold py-2 px-2 m-0"
  class:border={style !== "primary"}
  class:bg-green-500={color === "green"}
  class:hover:bg-green-700={color === "green"}
  class:bg-red-500={color === "red"}
  class:hover:bg-red-700={color === "red"}
  class:bg-blue-500={color === "blue"}
  class:hover:bg-blue-700={color === "blue"}
  class:first:rounded-l={grouped}
  class:last:rounded-r={grouped}
  class:rounded={!grouped}
  {...$$restProps}><slot /></button
>

{#if $open}
  <div
    melt={$content}
    transition:fade={{ duration: 100 }}
    class="z-10 w-60 rounded-[4px] border border-gray-600 bg-white p-5 shadow-sm"
  >
    <div melt={$arrow} class="border-l border-t border-gray-600" />
    <button
      class="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center text-blue-900 transition-colors hover:bg-blue-500/10 focus-visible:ring focus-visible:ring-blue-400 focus-visible:ring-offset-2 bg-white p-0 text-sm font-medium"
      melt={$close}
    >
      <div class="text-md"><Icon icon="mdi:window-close" /></div>
    </button>
    <div class="flex flex-col grow">
      <div class="flex">
        <slot name="content" />
      </div>
      <div class="flex justify-end">
        <button
          class="text-xs hover:bg-blue-500/30 p-2 rounded-sm bg-blue-500/10 border-blue-500/60 border"
          on:click={() => {
            action();
            $open = false;
          }}>{buttonText}</button
        >
      </div>
    </div>
  </div>
{/if}
