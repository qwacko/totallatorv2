import type { Record as PBRecord } from "pocketbase";
import type { BaseSystemFields } from "../generated-types";
import { subscribeList, type SubscribeListOuterType } from "./subscribeList";

export const pocketbaseHelper = <
  ResponseType extends Record<string, any> & BaseSystemFields<unknown>,
  FilterType extends Record<string, any>,
  SortType extends Array<Record<string, any>>,
  RecordType = PBRecord
>({
  collection,
  filterToText,
  sortToText,
  defaultFilter,
  defaultSort,
  defaultPage,
  defaultPerPage,
}: SubscribeListOuterType<FilterType, SortType>) => {
  return {
    subscribeList: subscribeList<ResponseType, FilterType, SortType>({
      collection,
      filterToText,
      sortToText,
      defaultFilter,
      defaultSort,
      defaultPage,
      defaultPerPage,
    }),
    add: async (newItem: RecordType) =>
      collection.create<RecordType>(newItem as {}, { $autoCancel: false }),
    update: async ({ id, data }: { id: string; data: Partial<RecordType> }) =>
      collection.update<RecordType>(id, data, { $autoCancel: false }),
    delete: async (id: string) => collection.delete(id, { $autoCancel: false }),
    getList: async ({
      filter = defaultFilter,
      sort = defaultSort,
      page = 1,
      perPage = 20,
    }: {
      filter?: FilterType;
      sort?: SortType;
      page?: number;
      perPage?: number;
    } = {}) => {
      const data = await collection.getList<ResponseType>(page, perPage, {
        filter: filterToText(filter),
        sort: sortToText(sort),
        $autoCancel: false,
      });
      return data;
    },
    getItem: async (id: string) => collection.getOne<ResponseType>(id),
  };
};
