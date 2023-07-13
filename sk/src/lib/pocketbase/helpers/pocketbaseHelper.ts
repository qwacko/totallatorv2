import type { Record as PBRecord } from "pocketbase";
import type { BaseSystemFields } from "../generated-types";
import { subscribeList, type SubscribeListOuterType } from "./subscribeList";
import type { RecordListQueryParamsOriginal } from "./recordListQueryParamsStore";

export const pocketbaseHelper = <
  ResponseType extends Record<string, any> & BaseSystemFields<unknown>,
  FilterType extends Record<string, any>,
  SortType extends Array<Record<string, any>>,
  RecordType = PBRecord,
>({
  collection,
  filterToText,
  sortToText,
  defaultQueryParams,
}: SubscribeListOuterType<FilterType, SortType>) => {
  return {
    subscribeList: subscribeList<ResponseType, FilterType, SortType>({
      collection,
      filterToText,
      sortToText,
      defaultQueryParams,
    }),
    add: async (newItem: RecordType) =>
      collection.create<RecordType>(newItem as {}, { $autoCancel: false }),
    update: async ({ id, data }: { id: string; data: Partial<RecordType> }) =>
      collection.update<RecordType>(id, data, { $autoCancel: false }),
    delete: async (id: string) => collection.delete(id, { $autoCancel: false }),
    getList: async (
      params: RecordListQueryParamsOriginal<FilterType, SortType>
    ) => {
      const paramsModified = { ...defaultQueryParams, ...params };
      const data = await collection.getList<ResponseType>(
        paramsModified.page,
        paramsModified.perPage,
        {
          filter: filterToText(paramsModified.filter),
          sort: sortToText(paramsModified.sort),
          $autoCancel: false,
        }
      );
      return data;
    },
    getItem: async (id: string) => collection.getOne<ResponseType>(id),
  };
};
