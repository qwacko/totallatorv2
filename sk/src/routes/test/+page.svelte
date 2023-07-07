<script lang="ts">
  import { metadata } from "$lib/app/stores";
  import { AccountsTypeOptions } from "$lib/pocketbase/generated-types";
  import { pbAccounts } from "$lib/pocketbase/pbAccounts";

  $metadata.title = "Testing";

  const clickAction = async () => {
    console.log("Button Pressed");
    // const fromAccount = (
    //   await pbAccounts.accounts.getList({
    //     filter: { type: [AccountsTypeOptions.asset] },
    //     sort: [],
    //   })
    // ).items[0].id;
    // const toAccount = (
    //   await pbAccounts.accounts.getList({
    //     filter: { type: [AccountsTypeOptions.expense] },
    //     sort: [],
    //   })
    // ).items[0].id;
    const response = await fetch("/api/custom/addBulk", {
      method: "POST",
      body: JSON.stringify({
        data: Array(2).fill({
          description: "This Is A Test",
          date: new Date().toISOString(),
          //   toAccount: toAccount,
          //   fromAccount: fromAccount,
          amount: 105,
        }),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("Response Data", data);
  };
</script>

<button on:click={clickAction}>Test</button>
