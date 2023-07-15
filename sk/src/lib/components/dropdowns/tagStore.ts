import { pbAccounts } from "$lib/pocketbase/pbAccounts";

const tagStoreCore = pbAccounts.tags.subscribeList({
  initialQueryParams: {
    sort: [{key:"group",dir:"asc"},{ key: "title", dir: "asc" }],
    filter: {},
    page: 0,
    perPage: 1000,
  },
});

export const tagsStore = tagStoreCore.resultStore;
