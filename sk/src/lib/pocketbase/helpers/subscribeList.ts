import type { RecordListQueryParams, RecordService } from "pocketbase";
import type { BaseSystemFields } from "../generated-types";

import { subscribePBList } from "./subscribePBList";
import type {
  RecordListQueryParamsOriginal,
  RecordListQueryParamsStoreParameters,
} from "./recordListQueryParamsStore";

export type ExportFilteredStoreParams = {
  collection: RecordService;
  initialQueryParams?: RecordListQueryParams;
};

export type SubscribeListInnerParams<
  FilterType extends Record<string, any>,
  SortType extends Array<Record<string, any>>
> = Omit<
  ExportFilteredStoreParams,
  "initialQueryParams" | "idOrName" | "collection"
> & {
  initialQueryParams?: RecordListQueryParamsOriginal<FilterType, SortType>;
};

export type SubscribeListOuterType<
  FilterType extends Record<string, any>,
  SortType extends Array<Record<string, any>>
> = {
  collection: RecordService;
  filterToText: (data: FilterType) => string;
  sortToText: (data: SortType) => string;
  defaultQueryParams: RecordListQueryParamsOriginal<FilterType, SortType>;
};

export const subscribeList = <
  ResponseType extends Record<string, any> & BaseSystemFields<unknown>,
  FilterType extends Record<string, any>,
  SortType extends Array<Record<string, any>>
>({
  collection,
  filterToText,
  sortToText,
  defaultQueryParams,
}: SubscribeListOuterType<FilterType, SortType>) => {
  return ({
    initialQueryParams,
  }: SubscribeListInnerParams<FilterType, SortType>) => {
    return subscribePBList<ResponseType, FilterType, SortType>({
      collection,
      filterToText,
      sortToText,
      initialParams: { ...defaultQueryParams, ...initialQueryParams },
    });
  };
};
