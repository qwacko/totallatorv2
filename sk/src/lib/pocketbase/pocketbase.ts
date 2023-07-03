import { browser } from "$app/environment";
import type {
  ListResult,
  RecordListQueryParams,
  RecordService,
} from "pocketbase";
import { writable, derived, get } from "svelte/store";
import type { BaseSystemFields, Collections } from "./generated-types";

export type ExportFilteredStoreParams = {
  collection: RecordService;
  initialQueryParams?: RecordListQueryParams;
  initialPage?: number;
  initialPerPage?: number;
};

// realtime subscription on a collection, with pagination
export function subscribeFilteredStore<
  T extends Record<string, any> & BaseSystemFields<unknown>
>({
  collection,
  initialQueryParams,
  initialPage = 1,
  initialPerPage = 20,
}: ExportFilteredStoreParams) {
  const date = new Date();
  const dateStore = writable(date.getTime());
  const pageStore = writable<number>(initialPage);
  const perPageStore = writable<number>(initialPerPage);
  const queryParamsStore = writable(initialQueryParams);
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

  const makePageWithRange = (
    page: number,
    results: ListResult<T> | undefined
  ) => {
    if (results && results.totalPages !== undefined) {
      const minPage = 1;
      const maxPage = results.totalPages;

      if (page > maxPage) {
        pageStore.set(maxPage);
        return true;
      }

      if (page < minPage) {
        pageStore.set(minPage);
        return true;
      }

      return false;
    }
  };

  //Make sure the page number is correct (not outside range).
  //Checks the page number and results when either changes to allow
  //for external modification of page store (outside of this function)
  resultStore.subscribe((newResults) => {
    makePageWithRange(get(pageStore), newResults);
  });
  pageStore.subscribe((newPage) => {
    const neededUpdating = makePageWithRange(newPage, get(resultStore));
    if (!neededUpdating) {
      queryParamsStore.update((t) => ({ ...t, page: newPage }));
    }
  });

  //Automatically Triggers Update On Change in underlying dataset.
  //This is done by updating a value (dateStore) that the derived store listens to.
  //Not the most efficient as this repeats the current request, but seems the simplest way.
  if (browser) {
    collection.subscribe("*", () => {
      const subscribeDate = new Date();
      dateStore.set(subscribeDate.getTime());
    });
  }

  async function setPage(newPage: number) {
    const minPage = 1;
    const maxPage = get(resultStore).totalPages;

    if (newPage <= maxPage && newPage >= minPage) {
      pageStore.set(newPage);
    }
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
