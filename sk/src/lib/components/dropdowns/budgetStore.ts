import { pbAccounts } from "$lib/pocketbase/pbAccounts";

const budgetStoreCore = pbAccounts.budgets.subscribeList({
  initialQueryParams: {
    sort: [{ key: "title", dir: "asc" }],
    filter: {},
    page: 0,
    perPage: 1000,
  },
});

export const budgetsStore = budgetStoreCore.resultStore;
