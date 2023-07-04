import { pbAccounts } from "$lib/pocketbase/pbAccounts";
import {
  createAsset,
  createLiability,
  createIncome,
  createExpense,
} from "./accountCreation";

export const getAndLogAccounts = async () => {
  const data = await pbAccounts.accounts.getList({ perPage: 1000 });
  console.log("Account Data", data);
};

export const generateAccounts = async ({
  countAssets,
  countLiabilities,
  countIncome,
  countExpenses,
}: {
  countAssets: number;
  countLiabilities: number;
  countIncome: number;
  countExpenses: number;
}) => {
  await Promise.all(
    Array(countAssets)
      .fill(1)
      .map(async () => createAsset())
  );

  await Promise.all(
    Array(countLiabilities)
      .fill(1)
      .map(() => createLiability())
  );
  await Promise.all(
    Array(countIncome)
      .fill(1)
      .map(() => createIncome())
  );
  await Promise.all(
    Array(countExpenses)
      .fill(1)
      .map(() => createExpense())
  );
};

export const removeAccounts = async () => {
  const accounts = await pbAccounts.accounts.getList({ perPage: 10000 });
  await Promise.all(
    accounts.items.map(async (currentAccount) => {
      await pbAccounts.accounts.delete(currentAccount.id);
    })
  );
};
