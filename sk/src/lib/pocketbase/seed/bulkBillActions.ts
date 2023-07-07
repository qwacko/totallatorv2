import { pbAccounts } from "$lib/pocketbase/pbAccounts";
import { getRandomInteger } from "./getRandom";

export const createBill = async () => {
  await pbAccounts.bills.add({
    title: `BillTitle${getRandomInteger(500)}`,
  });
};

export const generateBills = async (count: number) => {
  await Promise.all(
    Array(count)
      .fill(1)
      .map(async () => createBill())
  );
};

export const removeBills = async () => {
  const bills = await pbAccounts.bills.getList({
    perPage: 10000,
    filter: {},
    sort: [],
  });
  await Promise.all(
    bills.items.map(async (currentBill) => {
      await pbAccounts.bills.delete(currentBill.id);
    })
  );
};
