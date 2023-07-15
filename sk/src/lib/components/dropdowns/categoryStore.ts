import { pbAccounts } from "$lib/pocketbase/pbAccounts";

const categoryStoreCore = pbAccounts.categories.subscribeList({
  initialQueryParams: {
    sort: [
      { key: "group", dir: "asc" },
      { key: "title", dir: "asc" },
    ],
    filter: {},
    page: 0,
    perPage: 1000,
  },
});

export const categoriesStore = categoryStoreCore.resultStore;
