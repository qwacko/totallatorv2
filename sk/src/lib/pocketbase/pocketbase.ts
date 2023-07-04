import { browser } from "$app/environment";
import type {
  ListResult,
  RecordListQueryParams,
  RecordService,
} from "pocketbase";
import { writable, derived, get, readable } from "svelte/store";
import type { BaseSystemFields } from "./generated-types";

export type ExportFilteredStoreParams = {
  collection: RecordService;
  initialQueryParams?: RecordListQueryParams;
};

// realtime subscription on a collection, with pagination
export function subscribeFilteredStore<
  T extends Record<string, any> & BaseSystemFields<unknown>
>({
  collection,
  initialQueryParams,
}: ExportFilteredStoreParams) {
  const date = new Date();
  const queryParamsStore = writable(initialQueryParams);
  
  const autoTriggerStore = readable(date, (set) => {
    if (browser) {
      const triggerUnsubscribe = collection.subscribe("*", () => {
        const subscribeDate = new Date();
        set(subscribeDate);
      });

      const triggerUnsubscribeRemapped = triggerUnsubscribe;

      const unsubFunction = () => {
        const asynbUnsubFunction = async () => {
          await (
            await triggerUnsubscribeRemapped
          )();
        };
        asynbUnsubFunction();
      };

      return unsubFunction;
    }

    return () => {};
  });
  const triggerStores = [
    queryParamsStore,
    autoTriggerStore,
  ] satisfies [any,  any];
  const resultStore = derived<typeof triggerStores, ListResult<T>>(
    [queryParamsStore, autoTriggerStore],
    (stores, set) => {
      const [currentQueryParams] = stores;

      const currentPage = currentQueryParams.page || 0
      const neededUpdating = makePageWithRange(currentPage, get(resultStore));

      if (neededUpdating) {
        return;
      }

      collection
        .getList<T>(currentPage, currentQueryParams.perPage || 20, {
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
        queryParamsStore.update((v) => ({...v, page: maxPage}))
        return true;
      }

      if (page < minPage) {
        queryParamsStore.update((v) => ({...v, page: minPage}))
        return true;
      }

      return false;
    }
  };


  async function setPage(newPage: number) {
    const minPage = 1;
    const maxPage = get(resultStore).totalPages;

    if (newPage <= maxPage && newPage >= minPage) {      
      queryParamsStore.update((v) => ({...v, page: newPage}))
    }
  }

  return {
    ...resultStore,
    queryParamsStore,
    setPage,
    async next() {
      setPage((get(queryParamsStore).page || 0) + 1);
    },
    async prev() {
      setPage((get(queryParamsStore).page || 0) - 1);
    },
  };
}
