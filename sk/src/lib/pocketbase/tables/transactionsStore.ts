import type { RecordService } from "pocketbase";
import type {
  TransactionsRecord,
  TransactionsResponse,
} from "../generated-types";
import { pocketbaseHelper } from "../helpers/pocketbaseHelper";

export type TransactionFilterType = {
  description?: string | undefined;
};

export const transactionFilter = (filter: TransactionFilterType) => {
  let filterArray: string[] = [];
  if (filter.description) {
    filterArray.push(`description ~ '${filter.description}'`);
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
    defaultFilter: { description: "" },
    defaultSort: [{ key: "date", dir: "desc" }],
  });

