import type { RecordService } from "pocketbase";
import type {  BudgetsRecord,  BudgetsResponse } from "../generated-types";
import { pocketbaseHelper } from "../helpers/pocketbaseHelper";

export type BudgetFilterType = {
  title?: string | undefined;
};

export const budgetFilter = (filter: BudgetFilterType) => {
  let filterArray: string[] = [];
  if (filter.title) {
    filterArray.push(`title ~ '${filter.title}'`);
  }

  return filterArray.join(" && ");
};

export type BudgetSortType = {
  key: keyof BudgetsRecord;
  dir: "asc" | "desc";
}[];

export const budgetSort = (sort: BudgetSortType) => {
  return sort
    .map((item) => {
      if (item.dir === "desc") {
        return `-${item.key}`;
      }
      return item.key;
    })
    .join(",");
};

export const budgets = (collection: RecordService) =>
  pocketbaseHelper<BudgetsResponse, BudgetFilterType, BudgetSortType, BudgetsRecord>({
    collection,
    filterToText: budgetFilter,
    sortToText: budgetSort,
    defaultFilter: { title: "" },
    defaultSort: [{ key: "title", dir: "asc" }],
  });
