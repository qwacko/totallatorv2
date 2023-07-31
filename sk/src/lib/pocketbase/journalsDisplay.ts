import { client } from ".";
import { Collections, type JournalsResponse } from "./generated-types";
import { customEndpoints } from "./tables/customEndpoints";
import {
  type JournalFilterType,
  type JournalSortType,
  journalFilter,
  journalSort,
} from "./tables/journalsStore";
import { subscribePB } from "./helpers/subscribePBGeneral";
import type { RecordListQueryParamsOriginal } from "./helpers/recordListQueryParamsStore";
import type { ListResult } from "pocketbase";

type JournalsParams = RecordListQueryParamsOriginal<
  JournalFilterType,
  JournalSortType
>;
export const journalsDisplay = (initialParams: JournalsParams) =>
  subscribePB<JournalsParams, ListResult<JournalsResponse & { total: number }>>(
    {
      collections: [client.collection(Collections.Journals)],
      initialParameters: initialParams,
      dataUpdater: async ({ params, setParams, setData }) => {
        const page = params.page || 0;
        const perPage = params.perPage || 20;

        if (page < 0) {
          setParams({ ...params, page: 0 });
          return;
        }

        const { filter, sort, ...otherParams } = params;

        const journalData = client
          .collection(Collections.Journals)
          .getList<JournalsResponse & { total: number }>(page, perPage, {
            $autoCancel: false,
            filter: journalFilter(filter),
            sort: journalSort(sort),
            ...otherParams,
          });

        const totalData = customEndpoints.getTotal({
          filters: filter,
          sort,
          page,
          perPage,
        });

        const [{ items, ...journalDataResult }, totalDataResult] =
          await Promise.all([journalData, totalData]);

        if (totalDataResult.total === null) {
          return;
        }

        if (journalDataResult.page !== page) {
          setParams({ ...params, page: journalDataResult.page });
          return;
        }

        if (
          journalDataResult.totalPages === 0 &&
          journalDataResult.page !== 0
        ) {
          console.log("Page is too low, resetting");
          setParams({ ...params, page: 0 });
          return;
        }

        if (
          journalDataResult.page > journalDataResult.totalPages &&
          journalDataResult.totalPages > 0
        ) {
          console.log("Page is too high, resetting");
          setParams({ ...params, page: journalDataResult.totalPages });
          return;
        }

        const journalDataResultWithTotal = items.map((item, index) => {
          const runningTotal = items.slice(0, index).reduce((acc, item) => {
            return acc - (item.amount || 0);
          }, totalDataResult.total || 0);
          return {
            ...item,
            total: runningTotal,
          };
        });

        setData({ ...journalDataResult, items: journalDataResultWithTotal });
      },
    }
  );
