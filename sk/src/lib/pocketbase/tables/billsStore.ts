import type { RecordService } from "pocketbase";
import type { BillsRecord, BillsResponse } from "../generated-types";
import { pocketbaseHelper } from "../helpers/pocketbaseHelper";

export type BillFilterType = {
  title?: string | undefined;
};

export const billFilter = (filter: BillFilterType) => {
  let filterArray: string[] = [];
  if (filter.title) {
    filterArray.push(`title ~ '${filter.title}'`);
  }

  return filterArray.join(" && ");
};

export type BillSortType = {
  key: keyof BillsRecord;
  dir: "asc" | "desc";
}[];

export const billSort = (sort: BillSortType) => {
  return sort
    .map((item) => {
      if (item.dir === "desc") {
        return `-${item.key}`;
      }
      return item.key;
    })
    .join(",");
};

export const bills = (collection: RecordService) =>
  pocketbaseHelper<BillsResponse, BillFilterType, BillSortType, BillsRecord>({
    collection,
    filterToText: billFilter,
    sortToText: billSort,
    defaultQueryParams: {
      filter: { title: "" },
      sort: [{ key: "title", dir: "asc" }],
    },
  });
