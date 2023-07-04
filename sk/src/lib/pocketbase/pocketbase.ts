import { browser } from "$app/environment";
import type {
  ListResult,
  RecordListQueryParams,
  RecordService,
} from "pocketbase";
import {
  writable,
  derived,
  get,
  readable,
  type Writable,
  type Readable,
} from "svelte/store";
import type { BaseSystemFields } from "./generated-types";

export type ExportFilteredStoreParams = {
  collection: RecordService;
  initialQueryParams?: RecordListQueryParams;
};

// realtime subscription on a collection, with pagination
export function subscribeFilteredStore<
  T extends Record<string, any> & BaseSystemFields<unknown>
>({ collection, initialQueryParams }: ExportFilteredStoreParams) {
  const date = new Date();
  const queryParamsStore = writable(initialQueryParams);

  //This store handles the re-triggering of data fetching on
  //change to underlying collection. Also has an unsubscription
  //function, which is a bit awkward due to the need to be async, and the way the unsubscription
  //function provided by the underlying library operates.
  const autoTriggerStore = readable(date, (set) => {
    if (browser) {
      const triggerUnsubscribe = collection.subscribe("*", () => {
        const subscribeDate = new Date();
        set(subscribeDate);
      });

      const unsubFunction = () => {
        const asynbUnsubFunction = async () => {
          await (
            await triggerUnsubscribe
          )();
        };
        asynbUnsubFunction();
      };

      return unsubFunction;
    }

    return () => {};
  });

  // On Request Changes, or triggers from the subscription, this will validate the
  // request, and re-request the filtered data.
  const resultStore = derived<
    [Writable<RecordListQueryParams>, Readable<Date>],
    ListResult<T>
  >([queryParamsStore, autoTriggerStore], (stores, set) => {
    const [currentQueryParams] = stores;

    const currentPage = currentQueryParams.page || 0;
    const neededUpdating = makePageWithRange(currentPage, get(resultStore));

    if (neededUpdating) {
      return;
    }

    //Re-request and update, uses callbacks which is just fantastic.
    collection
      .getList<T>(currentPage, currentQueryParams.perPage || 20, {
        $autoCancel: false,
        ...currentQueryParams,
      })
      .then((newData) => {

        //Make sure the page lives within the new range. If not
        //then the page is updated. This will re-trigger the request
        //and so the data is only updated if the page is correct.s
        const neededUpdating = makePageWithRange(currentPage, newData);
        if (neededUpdating) {
          return;
        }
        set(newData);
      });
  });

  // Checks the current page is within the allowable range. If not then this will update the page
  // to be within the range.
  const makePageWithRange = (
    page: number,
    results: ListResult<T> | undefined
  ) => {
    if (results && results.totalPages !== undefined) {
      const minPage = 1;
      const maxPage = results.totalPages;

      if (page > maxPage) {
        queryParamsStore.update((v) => ({ ...v, page: maxPage }));
        return true;
      }

      if (page < minPage) {
        queryParamsStore.update((v) => ({ ...v, page: minPage }));
        return true;
      }

      return false;
    }
  };

  //Updates the page number relatively easily. Possibly not actually required as query params store can be updated directly.
  async function setPage(newPage: number) {
    const minPage = 1;
    const maxPage = get(resultStore).totalPages;

    if (newPage <= maxPage && newPage >= minPage) {
      queryParamsStore.update((v) => ({ ...v, page: newPage }));
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
