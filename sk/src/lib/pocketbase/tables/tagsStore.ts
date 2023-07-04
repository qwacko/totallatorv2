import type { RecordService } from "pocketbase";
import type { TagsRecord, TagsResponse } from "../generated-types";
import { pocketbaseHelper } from "../helpers/pocketbaseHelper";

export type TagFilterType = {
  title?: string | undefined;
  group?: string | undefined;
};

export const tagFilter = (filter: TagFilterType) => {
  let filterArray: string[] = [];
  if (filter.title) {
    filterArray.push(`title ~ '${filter.title}'`);
  }
  if (filter.group) {
    filterArray.push(`group ~ ${filter.group}`);
  }

  return filterArray.join(" && ");
};

export type TagSortType = {
  key: keyof TagsRecord;
  dir: "asc" | "desc";
}[];

export const tagSort = (sort: TagSortType) => {
  return sort
    .map((item) => {
      if (item.dir === "desc") {
        return `-${item.key}`;
      }
      return item.key;
    })
    .join(",");
};

export const tags = (collection: RecordService) =>
  pocketbaseHelper<TagsResponse, TagFilterType, TagSortType, TagsRecord>({
    collection,
    filterToText: tagFilter,
    sortToText: tagSort,
    defaultQueryParams: {
      filter: { title: "" },
      sort: [{ key: "title", dir: "asc" }],
    },
  });
