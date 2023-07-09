<script lang="ts">
  import { metadata } from "$lib/app/stores";
  import {
    generateAccounts,
    getAndLogAccounts,
    removeAccounts,
  } from "$lib/pocketbase/seed/bulkAccountActions";
  import {
    generateBills,
    removeBills,
  } from "$lib/pocketbase/seed/bulkBillActions";
  import {
    generateBudgets,
    removeBudgets,
  } from "$lib/pocketbase/seed/bulkBudgetActions";
  import {
    generateCategories,
    removeCategories,
  } from "$lib/pocketbase/seed/bulkCategoryActions";
  import {
    createTag,
    generateTags,
    removeTags,
  } from "$lib/pocketbase/seed/bulkTagActions";
  import BulkButton from "./BulkButton.svelte";
  import {
    generateTransactions,
    removeAllTransaction,
    removeTransactions,
  } from "$lib/pocketbase/seed/bulkTransactionActions";

  $metadata.title = "Bulk Actions";
</script>

<div class="flex flex-col gap-2 px-2">
  <h1 class="flex font-bold">Accounts</h1>
  <div class="flex flex-row gap-2">
    <BulkButton
      clickFunction={async () => {
        await generateAccounts({
          countAssets: 30,
          countLiabilities: 10,
          countExpenses: 200,
          countIncome: 20,
        });
      }}
    >
      Create Accounts
    </BulkButton>
    <BulkButton clickFunction={removeAccounts}>Remove Accounts</BulkButton>
  </div>
  <h1 class="flex font-bold">Tags</h1>
  <div class="flex flex-row gap-2">
    <BulkButton clickFunction={async () => generateTags(8)}>
      Create Tags
    </BulkButton>
    <BulkButton clickFunction={removeTags}>Remove Tags</BulkButton>
  </div>
  <h1 class="flex font-bold">Categories</h1>
  <div class="flex flex-row gap-2">
    <BulkButton clickFunction={async () => generateCategories(100)}>
      Create Categories
    </BulkButton>
    <BulkButton clickFunction={removeCategories}>Remove Categories</BulkButton>
  </div>
  <h1 class="flex font-bold">Bills</h1>
  <div class="flex flex-row gap-2">
    <BulkButton clickFunction={async () => generateBills(25)}>
      Create Bills
    </BulkButton>
    <BulkButton clickFunction={removeBills}>Remove Bills</BulkButton>
  </div>
  <h1 class="flex font-bold">Budgets</h1>
  <div class="flex flex-row gap-2">
    <BulkButton clickFunction={async () => generateBudgets(25)}>
      Create Budgets
    </BulkButton>
    <BulkButton clickFunction={removeBudgets}>Remove Budgets</BulkButton>
  </div>
  <h1 class="flex font-bold">Transactions</h1>
  <div class="flex flex-row gap-2">
    <BulkButton
      clickFunction={async () =>
        generateTransactions({ transferCount: 5000, incExpCount: 15000 })}
    >
      Create Transactions
    </BulkButton>
    <BulkButton clickFunction={removeTransactions}>
      Remove Transactions
    </BulkButton>
    <BulkButton clickFunction={removeAllTransaction}>
      Remove All Transactions
    </BulkButton>
  </div>
</div>
