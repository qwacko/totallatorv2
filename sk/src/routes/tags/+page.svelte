<script lang="ts">
  import { metadata } from "$lib/app/stores";
  import { pbAccounts } from "$lib/pocketbase/pbAccounts";

  $metadata.title = "Tags";

  const { paramsStore, resultStore } = pbAccounts.categories.subscribeList({
    initialQueryParams: {
      filter: { title: "" },
      sort: [
        { key: "group", dir: "asc" },
        { key: "title", dir: "asc" },
      ],
    },
  });

  //TODO : Make This Have Editing etc... (align with journals structure)
</script>

<div class="flex flex-col gap-1 items-start px-2 pb-4">
  <div>Group Filter</div>
  <input
    bind:value={$paramsStore.filter.group}
    type="text"
    class="flex border"
  />
  <div>Single Filter</div>
  <input
    bind:value={$paramsStore.filter.title}
    type="text"
    class="flex border"
  />
</div>
{#if $resultStore?.items}
  <table>
    {#each $resultStore.items as currentTag}
      <tr>
        <td>
          <button
            class="border border-gray-600 px-2 py-1 rounded-md bg-gray-200"
            on:click={() => pbAccounts.categories.delete(currentTag.id)}
            >x</button
          >
        </td>
        <td>{currentTag.group}</td>
        <td>{currentTag.title}</td>
        <td>{currentTag.combinedTitle}</td>
      </tr>
    {/each}
  </table>
  <button on:click={() => ($paramsStore.page = ($paramsStore.page || 0) - 1)}
    >Prev</button
  >
  {$resultStore.page} / {$resultStore.totalPages}
  <button on:click={() => ($paramsStore.page = ($paramsStore.page || 0) + 1)}
    >Next</button
  >
{/if}
