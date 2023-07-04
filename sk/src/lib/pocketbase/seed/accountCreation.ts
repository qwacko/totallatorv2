import { AccountsTypeOptions } from "$lib/pocketbase/generated-types";
import { pbAccounts } from "$lib/pocketbase/pbAccounts";
import {
  getRandomArrayElement,
  getRandomInteger,
  getRandomBoolean,
} from "./getRandom";

const assetTitleParts = [
  "Bank",
  "Home",
  "Cash",
  "Savings",
  "Investment",
  "Art",
  "Retirement",
];
const assetTitleParts2 = ["Value", "Account", "Shares", "Holdings", "Card"];
const liabilityTitleParts2 = [
  "Credit Card",
  "Mortgage",
  "Loan",
  "Lending",
  "Owing",
  "Debt",
];
const expenseLocations = [
  "Los Angeles",
  "New York",
  "London",
  "Sydney",
  "Dubai",
  "Amsterdam",
  "Chicago",
  "San Francisco",
  "Tokyo",
  "Singapore",
  "Durban",
];
const expenseTypes = [
  "Fuel",
  "Gas",
  "Power",
  "Internet",
  "Mobile",
  "Supermarket",
  "Grocery Store",
  "Interest",
  "Rent",
];
const incomeGroupOptions = [
  "Personal",
  "Partner",
  "Business",
  "Investment",
  "Government",
];
const incomeOptions = [
  "Wages",
  "Salary",
  "Interest",
  "Rent",
  "Capital Gains",
  "Deposit",
];
export const createAsset = async () => {
  const accountTitle = `${getRandomArrayElement(
    assetTitleParts
  )} ${getRandomArrayElement(assetTitleParts2)} ${getRandomInteger(10)}`;

  await pbAccounts.accounts.add({
    type: AccountsTypeOptions.asset,
    isCash: getRandomBoolean(0.4),
    isNetWorth: getRandomBoolean(0.95),
    title: accountTitle,
  });
};
export const createLiability = async () => {
  const liabilityTitle = `${getRandomArrayElement(
    assetTitleParts
  )} ${getRandomArrayElement(liabilityTitleParts2)} ${getRandomInteger(10)}`;

  await pbAccounts.accounts.add({
    type: AccountsTypeOptions.liability,
    isCash: getRandomBoolean(0.4),
    isNetWorth: getRandomBoolean(0.95),
    title: liabilityTitle,
  });
};
export const createIncome = async () => {
  const incomeTitle = `${getRandomArrayElement(
    incomeGroupOptions
  )} ${getRandomArrayElement(incomeOptions)} ${getRandomInteger(10)}`;

  await pbAccounts.accounts.add({
    type: AccountsTypeOptions.income,
    isCash: false,
    isNetWorth: false,
    title: incomeTitle,
  });
};
export const createExpense = async () => {
  const expenseTitle = `${getRandomArrayElement(
    expenseLocations
  )} ${getRandomArrayElement(expenseTypes)} ${getRandomInteger(50)}`;

  await pbAccounts.accounts.add({
    type: AccountsTypeOptions.expense,
    isCash: false,
    isNetWorth: false,
    title: expenseTitle,
  });
};
