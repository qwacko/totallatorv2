import { pbAccounts } from "$lib/pocketbase/pbAccounts";

const accountStoreCore = pbAccounts.accounts.subscribeList({
  initialQueryParams: {
    sort: [{ key: "title", dir: "asc" }],
    filter: {},
    page: 0,
    perPage: 1000,
  },
});

export const accountsStore = accountStoreCore.resultStore;
