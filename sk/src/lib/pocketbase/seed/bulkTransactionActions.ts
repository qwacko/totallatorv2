import { pbAccounts } from "$lib/pocketbase/pbAccounts";
import { AccountsTypeOptions } from "../generated-types";
import {
  getRandomArrayElement,
  getRandomBoolean,
  getRandomInteger,
} from "./getRandom";

const startDate = new Date(2010, 0, 1);
const endDate = new Date(2022, 11, 31);
const daysDifference = Math.floor(
  (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
);

const getRandomDate = () => {
  const targetDate = new Date(startDate);
  targetDate.setDate(targetDate.getDate() + Math.random() * daysDifference);
  targetDate.setHours(0, 0, 0, 0);
  return targetDate;
  // const targetDate = startDate + dateDifference;
};

export const createTransaction = async (
  isTransfer: boolean = false,
  count: number
) => {
  const allExpenseAccounts = (
    await pbAccounts.accounts.getList({
      sort: [],
      filter: {
        type: [AccountsTypeOptions.expense, AccountsTypeOptions.income],
      },
    })
  ).items.map((item) => item.id);
  const allAssetAcccounts = (
    await pbAccounts.accounts.getList({
      sort: [],
      filter: {
        type: [AccountsTypeOptions.asset, AccountsTypeOptions.liability],
      },
    })
  ).items.map((item) => item.id);
  const allTags = (
    await pbAccounts.tags.getList({ sort: [], filter: {} })
  ).items.map((item) => item.id);
  const allCategories = (
    await pbAccounts.categories.getList({ sort: [], filter: {} })
  ).items.map((item) => item.id);
  const allBills = (
    await pbAccounts.bills.getList({ sort: [], filter: {} })
  ).items.map((item) => item.id);
  const allBudgets = (
    await pbAccounts.budgets.getList({ sort: [], filter: {} })
  ).items.map((item) => item.id);

  const returnData = Array(count)
    .fill(1)
    .map(() => {
      const isDeposit = getRandomBoolean();
      const isLarge = getRandomBoolean(0.05);

      const hasTag = isTransfer ? false : getRandomBoolean(0.7);
      const hasBill = isTransfer ? false : getRandomBoolean(0.1);
      const hasBudget = isTransfer ? false : getRandomBoolean(0.2);
      const hasCategory = isTransfer ? false : getRandomBoolean(0.95);

      const fromAccountAsset = isTransfer || !isDeposit;
      const toAccountAsset = isTransfer || isDeposit;

      return {
        dateText: getRandomDate().toISOString().slice(0, 10),
        description: `${
          isTransfer ? "Transfer" : isDeposit ? "Deposit" : "Withdrawl"
        } ${getRandomInteger(1000)}`,
        fromAccount: getRandomArrayElement(
          fromAccountAsset ? allAssetAcccounts : allExpenseAccounts
        ),
        toAccount: getRandomArrayElement(
          toAccountAsset ? allAssetAcccounts : allExpenseAccounts
        ),
        amount: Math.floor(Math.random() * (isLarge ? 100000 : 10000)) / 100,
        tag: hasTag ? getRandomArrayElement(allTags) : undefined,
        bill: hasBill ? getRandomArrayElement(allBills) : undefined,
        budget: hasBudget ? getRandomArrayElement(allBudgets) : undefined,
        category: hasCategory
          ? getRandomArrayElement(allCategories)
          : undefined,
      };
    });

  return returnData;
};

export const generateTransactions = async ({
  transferCount,
  incExpCount,
}: {
  transferCount: number;
  incExpCount: number;
}) => {
  const transactionsToCreate = [
    ...(await createTransaction(true, transferCount)),
    ...(await createTransaction(false, incExpCount)),
  ];

  await pbAccounts.customEndpoints.bulkCreateTransactions(transactionsToCreate);
};

export const removeTransactions = async () => {
  const transactionIds = (
    await pbAccounts.transactions.getList({
      perPage: 100000,
      filter: {},
      sort: [],
    })
  ).items.map((item) => item.id);
  await pbAccounts.customEndpoints.bulkDeleteTransactions(transactionIds);
};

export const removeAllTransaction = async () => {
  await pbAccounts.customEndpoints.bulkDeleteAllTransactions();
};
