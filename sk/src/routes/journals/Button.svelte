<script lang="ts">
  export let style: "primary" | "secondary" | "danger" = "primary";
  export let color: "blue" | "red" | "green" = "blue";
  export let grouped: boolean = true;
</script>

<button
  type="button"
  class="text-white border-0 font-bold py-2 px-2 m-0"
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
  on:click
  {...$$restProps}><slot /></button
>
