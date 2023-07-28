import type { ListResult, RecordService } from "pocketbase";
import {
  recordListQueryParamsStore,
  type RecordListQueryParamsStoreParameters,
} from "./recordListQueryParamsStore";
import { derived, readable, writable } from "svelte/store";
import { browser } from "$app/environment";
import type { BaseSystemFields } from "../generated-types";

export const subscribePBList = <
  ReturnType extends Record<string, any> & BaseSystemFields<unknown>,
  FilterType extends Record<string, any>,
  SortType extends Array<Record<string, any>>,
>({
  filterToText,
  sortToText,
  initialParams,
  collection,
}: RecordListQueryParamsStoreParameters<FilterType, SortType> & {
  collection: RecordService;
}) => {
  const { paramsStore, transformedParamsStore } = recordListQueryParamsStore({
    filterToText,
    sortToText,
    initialParams,
  });

  const date = new Date();
  const subscriptionStore = readable(date, (set) => {
    if (browser) {
      const triggerUnsubscribe = collection.subscribe("*", () => {
        const subscribeDate = new Date();
        set(subscribeDate);
      });

      const unsubFunction = () => {
        const asyncUnsub = async () => {
          await (
            await triggerUnsubscribe
          )();
        };
        asyncUnsub();
      };

      return unsubFunction;
    }
    return () => {};
  });

  const resultStore = derived<
    [typeof transformedParamsStore, typeof subscriptionStore],
    ListResult<ReturnType>
  >([transformedParamsStore, subscriptionStore], (stores, set) => {
    const [currentQueryParams] = stores;

    const page = currentQueryParams.page || 0;
    const perPage = currentQueryParams.perPage || 20;

    collection
      .getList<ReturnType>(page, perPage, {
        $autoCancel: false,
        ...currentQueryParams,
      })
      .then((newData) => {
        if (newData.totalPages === 0 && newData.page !== 1) {
          paramsStore.update((v) => ({ ...v, page: 1 }));
          return;
        }
        if (newData.page > newData.totalPages && newData.totalPages > 0) {
          paramsStore.update((v) => ({ ...v, page: newData.totalPages }));
          return;
        }
        set(newData);
      });
  });

  return { paramsStore, resultStore };
};
