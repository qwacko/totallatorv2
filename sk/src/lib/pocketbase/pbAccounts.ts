import { client } from ".";
import { accounts } from "./tables/accountsStore";
import { Collections } from "./generated-types";
import { tags } from "./tables/tagsStore";
import { categories } from "./tables/categoriesStore";
import { bills } from "./tables/billsStore";
import { budgets } from "./tables/budgetsStore";
import { transactions } from "./tables/transactionsStore";

export const pbAccounts = {
  transactions: transactions(client.collection(Collections.Transactions)),
  accounts: accounts(client.collection(Collections.Accounts)),
  tags: tags(client.collection(Collections.Tags)),
  categories: categories(client.collection(Collections.Categories)),
  bills: bills(client.collection(Collections.Bills)),
  budgets: budgets(client.collection(Collections.Budgets)),
};
