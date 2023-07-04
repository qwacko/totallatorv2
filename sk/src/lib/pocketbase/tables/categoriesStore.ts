import type { RecordService } from "pocketbase";
import type { CategoriesRecord, CategoriesResponse } from "../generated-types";
import { pocketbaseHelper } from "../helpers/pocketbaseHelper";

export type CategoryFilterType = {
  title?: string | undefined;
  group?: string | undefined;
};

export const categoryFilter = (filter: CategoryFilterType) => {
  let filterArray: string[] = [];
  if (filter.title) {
    filterArray.push(`title ~ '${filter.title}'`);
  }
  if (filter.group) {
    filterArray.push(`group ~ ${filter.group}`);
  }

  return filterArray.join(" && ");
};

export type CategorySortType = {
  key: keyof CategoriesRecord;
  dir: "asc" | "desc";
}[];

export const categorySort = (sort: CategorySortType) => {
  return sort
    .map((item) => {
      if (item.dir === "desc") {
        return `-${item.key}`;
      }
      return item.key;
    })
    .join(",");
};

export const categories = (collection: RecordService) =>
  pocketbaseHelper<
    CategoriesResponse,
    CategoryFilterType,
    CategorySortType,
    CategoriesRecord
  >({
    collection,
    filterToText: categoryFilter,
    sortToText: categorySort,
    defaultQueryParams: {
      filter: { title: "" },
      sort: [{ key: "title", dir: "asc" }],
    },
  });
