import { pbAccounts } from "$lib/pocketbase/pbAccounts";
import { getRandomInteger } from "./getRandom";

export const createTag = async () => {
  await pbAccounts.tags.add({
    group: `TagGroup${getRandomInteger(5)}`,
    title: `TagTitle${getRandomInteger(500)}`,
  });
};

export const generateTags = async (count: number) => {
  await Promise.all(
    Array(count)
      .fill(1)
      .map(async () => createTag())
  );
};

export const removeTags = async () => {
  const tags = await pbAccounts.categories.getList({
    perPage: 10000,
    filter: {},
    sort: [],
  });
  await Promise.all(
    tags.items.map(async (currentTag) => {
      await pbAccounts.categories.delete(currentTag.id);
    })
  );
};
