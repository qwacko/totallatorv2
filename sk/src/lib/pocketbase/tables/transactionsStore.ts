import type { RecordService } from "pocketbase";
import type {
  TransactionsRecord,
  TransactionsResponse,
} from "../generated-types";
import { pocketbaseHelper } from "../helpers/pocketbaseHelper";

export type TransactionFilterType = {
  description?: string | undefined;
  date?: {
    gt?: Date;
    lt?: Date;
  };
};

export const transactionFilter = (filter: TransactionFilterType) => {
  let filterArray: string[] = [];
  if (filter.description) {
    filterArray.push(`description ~ '${filter.description}'`);
  }
  if (filter.date && filter.date.gt) {
    filterArray.push(`date >= ${filter.date.gt.toISOString()}`);
  }
  if (filter.date && filter.date.lt) {
    filterArray.push(`date <= ${filter.date.lt.toISOString()}`);
  }

  return filterArray.join(" && ");
};

export type TransactionSortType = {
  key: keyof TransactionsRecord;
  dir: "asc" | "desc";
}[];

export const transactionSort = (sort: TransactionSortType) => {
  return sort
    .map((item) => {
      if (item.dir === "desc") {
        return `-${item.key}`;
      }
      return item.key;
    })
    .join(",");
};

export const transactions = (collection: RecordService) =>
  pocketbaseHelper<
    TransactionsResponse,
    TransactionFilterType,
    TransactionSortType,
    TransactionsRecord
  >({
    collection,
    filterToText: transactionFilter,
    sortToText: transactionSort,
    defaultQueryParams: {
      filter: { description: "" },
      sort: [{ key: "date", dir: "desc" }],
    },
  });
