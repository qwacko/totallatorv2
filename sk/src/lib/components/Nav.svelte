<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import Login from "./Login.svelte";
  const links = [
    ["Home", "/"],
    ["Transactions", "/transactions/"],
    ["Journals", "/journals/"],
    ["Accounts", "/accounts/"],
    ["Tags", "/tags/"],
    ["Categories", "/categories/"],
    ["Bills", "/bills/"],
    ["Budgets", "/budgets/"],
    ["Bulk", "/bulk/"],
    ["Test", "/test/"],
  ].map(([text, href]) => [text, href]);
</script>

<nav>
  {#each links as [text, href]}
    <a class:active={href === $page.url.pathname} {href}>{text}</a>
  {/each}
</nav>

<style lang="scss">
  nav {
    a {
      padding: 0.5em 1em;
      margin: 0;
      background: var(--background-alt);
      &.active {
        background: var(--background);
        font-weight: bold;
        border-bottom: solid;
      }
    }
  }
</style>
