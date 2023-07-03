import type { RecordService, RecordListQueryParams } from "pocketbase";
import type { BaseSystemFields } from "../generated-types";
import {
  subscribeFilteredStore,
  type ExportFilteredStoreParams,
} from "../pocketbase"; 
import { get, writable } from "svelte/store";

export type SubscribeListInnerParams<
  FilterType extends Record<string, any>,
  SortType extends Array<Record<string, any>>
> = Omit<
  ExportFilteredStoreParams,
  "initialQueryParams" | "idOrName" | "collection"
> & {
  initialFilter?: FilterType;
  initialSort?: SortType;
};

export type SubscribeListOuterType<
  FilterType extends Record<string, any>,
  SortType extends Array<Record<string, any>>
> = {
  collection: RecordService;
  filterToText: (data: FilterType) => string;
  sortToText: (data: SortType) => string;
  defaultFilter: FilterType;
  defaultSort: SortType;
  defaultPage?: number;
  defaultPerPage?: number;
};

export const subscribeList = <
  ResponseType extends Record<string, any> & BaseSystemFields<unknown>,
  FilterType extends Record<string, any>,
  SortType extends Array<Record<string, any>>
>({
  collection,
  filterToText,
  sortToText,
  defaultFilter,
  defaultSort,
  defaultPage = 1,
  defaultPerPage = 20,
}: SubscribeListOuterType<FilterType, SortType>) => {
  return ({
    initialFilter,
    initialSort,
    initialPage,
    initialPerPage,
  }: SubscribeListInnerParams<FilterType, SortType>) => {
    //Initialise the query.
    console.log("Running Inner Subscribe List")
    const initalFilterString = filterToText(initialFilter || defaultFilter);
    const initialSortString = sortToText(initialSort || defaultSort);
    const initialQueryParams: RecordListQueryParams = {
      page: initialPage || defaultPage,
      perPage: initialPerPage || defaultPerPage,
      filter: initalFilterString,
      sort: initialSortString,
    };

    //Initialise Stores
    const filterStore = writable<FilterType>(initialFilter || defaultFilter);
    const sortStore = writable<SortType>(initialSort || defaultSort);

    const listStore = subscribeFilteredStore<ResponseType>({
      collection,
      initialQueryParams,
      initialPage,
      initialPerPage,
    });

    //Generate Function to Update Query based on filtering and sorting
    const updateQueryParams = () => {
      console.log("Updating Query Parameters")
      listStore.queryParamsStore.update((currentQueryParams) => ({
        ...currentQueryParams,
        filter: filterToText(get(filterStore)),
        sort: sortToText(get(sortStore)),
      }));
    };

    //Make updating filtering and sorting also update the query filtering / sorting
    filterStore.subscribe(() => {
      updateQueryParams();
    });
    sortStore.subscribe(() => {
      updateQueryParams();
    });

    //Since query params are handled elsewhere, we don't need to return this store.
    const { queryParamsStore, ...returnData } = listStore;

    return { ...returnData, filterStore, sortStore };
  };
};
