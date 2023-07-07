import { pbAccounts } from "$lib/pocketbase/pbAccounts";
import { getRandomInteger } from "./getRandom";

export const createCategory = async () => {
  await pbAccounts.categories.add({
    group: `CatGroup${getRandomInteger(40)}`,
    title: `CatTitle${getRandomInteger(500)}`,
  });
};

export const generateCategories = async (count: number) => {
  await Promise.all(
    Array(count)
      .fill(1)
      .map(async () => createCategory())
  );
};

export const removeCategories = async () => {
  const categories = await pbAccounts.categories.getList({
    perPage: 10000,
    filter: {},
    sort: [],
  });
  await Promise.all(
    categories.items.map(async (currentCategory) => {
      await pbAccounts.categories.delete(currentCategory.id);
    })
  );
};
