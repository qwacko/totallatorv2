import type { ListResult, RecordService } from "pocketbase";
import type { RecordListQueryParamsStoreParameters } from "./recordListQueryParamsStore";
import type { BaseSystemFields } from "../generated-types";
import { subscribePB } from "./subscribePBGeneral";

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
  const dataUpdater = ({
    params,
    setParams,
    setData,
  }: {
    params: RecordListQueryParamsStoreParameters<
      FilterType,
      SortType
    >["initialParams"];
    setParams: (
      d: RecordListQueryParamsStoreParameters<
        FilterType,
        SortType
      >["initialParams"]
    ) => void;
    setData: (newData: ListResult<ReturnType>) => void;
  }) => {
    console.log("Running Data Updater");
    const page = params.page || 0;
    const perPage = params.perPage || 20;

    const { filter, sort, ...otherParams } = params;

    collection
      .getList<ReturnType>(page, perPage, {
        $autoCancel: false,
        filter: filterToText(filter),
        sort: sortToText(sort),
        ...otherParams,
      })
      .then((newData) => {
        console.log("Subscription New Data", newData);
        if (newData.totalPages === 0 && newData.page !== 1) {
          setParams({ ...params, page: 1 });
          return;
        }
        if (newData.page > newData.totalPages && newData.totalPages > 0) {
          setParams({ ...params, page: newData.totalPages });
          return;
        }
        setData(newData);
      });
  };

  return subscribePB({
    collections: [collection],
    dataUpdater,
    initialParameters: initialParams,
  });
};
