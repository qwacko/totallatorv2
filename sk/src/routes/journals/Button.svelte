<script lang="ts">
  export let style: "primary" | "secondary" | "danger" = "primary";
  export let color: "blue" | "red" | "green" = "blue";
  export let grouped: boolean = false;
</script>

<button
  type="button"
  class={`bg-${color}-500 hover:bg-${color}-700 text-white border-0 font-bold py-2 px-2 m-0 ${
    style === "primary" ? "" : "border"
  }`}
  class:first:rounded-l={grouped}
  class:last:rounded-r={grouped}
  class:rounded={!grouped}
  on:click
  {...$$restProps}><slot /></button
>
