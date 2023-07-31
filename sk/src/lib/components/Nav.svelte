<script lang="ts">
  import { page } from "$app/stores";
  const links = [
    ["Home", "/"],
    ["Journals", "/journals/"],
    ["Accounts", "/accounts/"],
    ["Tags", "/tags/"],
    ["Categories", "/categories/"],
    ["Bills", "/bills/"],
    ["Budgets", "/budgets/"],
    ["Bulk", "/bulk/"],
    ["Test", "/test/"],
  ].map(([text, href]) => [text, href]);

  //TODO : Add "Stats" page
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
