import { browser } from "$app/environment";
import type { ListResult, RecordListQueryParams } from "pocketbase";
import { writable, derived, get } from "svelte/store";
import type { BaseSystemFields, Collections } from "./generated-types";
import { client } from ".";

// realtime subscription on a collection, with pagination
export function subscribeFilteredStore<
  T extends Record<string, any> & BaseSystemFields<unknown>
>(
  idOrName: Collections,
  initalQueryParams: RecordListQueryParams,
  initialPage = 1,
  initialPerPage = 20
) {
  const collection = client.collection(idOrName);

  const date = new Date();
  const dateStore = writable(date.getTime());
  const pageStore = writable<number>(initialPage);
  const perPageStore = writable<number>(initialPerPage);
  const queryParamsStore = writable(initalQueryParams);
  const triggerStores = [
    queryParamsStore,
    pageStore,
    perPageStore,
    dateStore,
  ] satisfies [any, any, any, any];
  const resultStore = derived<typeof triggerStores, ListResult<T>>(
    triggerStores,
    (stores, set) => {
      const [currentQueryParams, currentPage, currentPerPage] = stores;
      collection
        .getList<T>(currentPage, currentPerPage, {
          $autoCancel: false,
          ...currentQueryParams,
        })
        .then((newData) => {
          set(newData);
        });
    }
  );

  //Automatically Triggers Update On Change in underlying dataset.
  //This is done by updating a value (dateStore) that the derived store listens to.
  if (browser) {
    collection.subscribe("*", () => {
      const subscribeDate = new Date();
      dateStore.set(subscribeDate.getTime());
    });
  }

  async function setPage(newPage: number) {
    pageStore.set(newPage);
  }

  return {
    ...resultStore,
    perPageStore,
    queryParamsStore,
    pageStore,
    setPage,
    async next() {
      setPage(get(pageStore) + 1);
    },
    async prev() {
      setPage(get(pageStore) - 1);
    },
  };
}
