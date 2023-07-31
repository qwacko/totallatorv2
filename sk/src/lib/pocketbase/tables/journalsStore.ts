import type { RecordService } from "pocketbase";
import {
  AccountsTypeOptions,
  type JournalsRecord,
  type JournalsResponse,
} from "../generated-types";
import { pocketbaseHelper } from "../helpers/pocketbaseHelper";

export type JournalFilterType = {
  description?: string | undefined;
  date?: {
    gt?: Date;
    lt?: Date;
  };
  accountType?: AccountsTypeOptions[];
};

export const journalFilter = (filter: JournalFilterType) => {
  let filterArray: string[] = [];
  if (filter.description) {
    filterArray.push(`transaction.description ~ '${filter.description}'`);
  }
  if (filter.date && filter.date.gt) {
    filterArray.push(`transaction.date >= ${filter.date.gt.toISOString()}`);
  }
  if (filter.date && filter.date.lt) {
    filterArray.push(`transaction.date <= ${filter.date.lt.toISOString()}`);
  }
  if (filter.accountType && filter.accountType.length > 0) {
    const newText = `(${filter.accountType
      .map((item) => `account.type = "${item}"`)
      .join(" || ")})`;
    filterArray.push(newText);
  }

  return filterArray.join(" && ");
};

type JournalSortOptions =
  | "transaction.date"
  | "transaction.description"
  | "account"
  | "amount";

export type JournalSortType = {
  key: JournalSortOptions;
  dir: "asc" | "desc";
}[];

export const journalSort = (sort: JournalSortType) => {
  return sort
    .map((item) => {
      if (item.dir === "desc") {
        return `-${item.key}`;
      }
      return item.key;
    })
    .join(",");
};

export const journals = (collection: RecordService) =>
  pocketbaseHelper<
    JournalsResponse,
    JournalFilterType,
    JournalSortType,
    JournalsRecord
  >({
    collection,
    filterToText: journalFilter,
    sortToText: journalSort,
    defaultQueryParams: {
      filter: {
        accountType: [AccountsTypeOptions.asset, AccountsTypeOptions.liability],
      },
      sort: [{ key: "transaction.date", dir: "desc" }],
    },
  });
