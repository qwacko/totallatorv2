import { pbAccounts } from "$lib/pocketbase/pbAccounts";
import { getRandomInteger } from "./getRandom";

export const createBudget = async () => {
  await pbAccounts.budgets.add({
    title: `BudgetTitle${getRandomInteger(500)}`,
  });
};

export const generateBudgets = async (count: number) => {
  await Promise.all(
    Array(count)
      .fill(1)
      .map(async () => createBudget())
  );
};

export const removeBudgets = async () => {
  const budgets = await pbAccounts.budgets.getList({
    perPage: 10000,
    filter: {},
    sort: [],
  });
  await Promise.all(
    budgets.items.map(async (currentBudget) => {
      await pbAccounts.budgets.delete(currentBudget.id);
    })
  );
};
