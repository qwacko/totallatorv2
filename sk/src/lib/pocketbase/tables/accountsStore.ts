import type { RecordService } from "pocketbase";
import type {
  AccountsTypeOptions,
  AccountsRecord,
  AccountsResponse,
} from "../generated-types";
import { pocketbaseHelper } from "../helpers/pocketbaseHelper";

export type AccountFilterType = {
  title?: string | undefined;
  type?: AccountsTypeOptions[] | undefined;
};

export const accountFilter = (filter: AccountFilterType) => {
  let filterArray: string[] = [];
  if (filter.title) {
    filterArray.push(`title ~ '${filter.title}'`);
  }
  if (filter.type && filter.type.length > 0) {
    const mappedFilter = filter.type.map((item) => `type = '${item}'`);
    const concatFilter = mappedFilter.join(" || ");
    filterArray.push("(" + concatFilter + ")");
  }

  return filterArray.join(" && ");
};

export type AccountSortType = {
  key: keyof AccountsRecord;
  dir: "asc" | "desc";
}[];

export const accountSort = (sort: AccountSortType) => {
  return sort
    .map((item) => {
      if (item.dir === "desc") {
        return `-${item.key}`;
      }
      return item.key;
    })
    .join(",");
};

export const accounts = (collection: RecordService) =>
  pocketbaseHelper<
    AccountsResponse,
    AccountFilterType,
    AccountSortType,
    AccountsRecord
  >({
    collection,
    filterToText: accountFilter,
    sortToText: accountSort,
    defaultQueryParams: {
      filter: { title: "" },
      sort: [{ key: "title", dir: "asc" }],
    },
  });
