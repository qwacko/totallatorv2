import type { RecordListQueryParams } from "pocketbase";
import { derived, writable } from "svelte/store";

export type RecordListQueryParamsWithoutFilterSort = {
  page?: number;
  perPage?: number;
  expand?: string;
};

export type RecordListQueryParamsOriginal<
  FilterType extends Record<string, any>,
  SortType extends Array<Record<string, any>>,
> = {
  page?: number;
  perPage?: number;
  expand?: string;
  filter: FilterType;
  sort: SortType;
};

export type RecordListQueryParamsStoreParameters<
  FilterType extends Record<string, any>,
  SortType extends Array<Record<string, any>>,
> = {
  filterToText: (filter: FilterType) => string;
  sortToText: (sort: SortType) => string;
  initialParams: RecordListQueryParamsOriginal<FilterType, SortType>;
};

export const recordListQueryParamsStore = <
  FilterType extends Record<string, any>,
  SortType extends Array<Record<string, any>>,
>({
  filterToText,
  sortToText,
  initialParams,
}: RecordListQueryParamsStoreParameters<FilterType, SortType>) => {
  const paramsStore = writable(initialParams);
  const transformedParamsStore = derived(paramsStore, (value) => {
    return {
      ...value,
      filter: filterToText(value.filter),
      sort: sortToText(value.sort),
    };
  });

  return { paramsStore, transformedParamsStore };
};
