import { client } from "..";
import type { TransactionsRecord } from "../generated-types";
import {
  journalFilter,
  journalSort,
  type JournalFilterType,
  type JournalSortType,
} from "./journalsStore";
import {
  transactionFilter,
  type TransactionFilterType,
} from "./transactionsStore";

export const bulkCloneTransactions = async (ids: string[]) => {
  const returnData: { error?: string; response?: string } = {};
  try {
    const response2 = await client.send("/api/custom/cloneBulkTransactions", {
      method: "POST",
      body: JSON.stringify({ ids }),
    });
    returnData.response = "Done";
  } catch (e) {
    console.log("Error Deleting Transaction", e);
    returnData.error = "Error Deleting All Transactions";
  }
  return returnData;
};

export const bulkDeleteAllTransactions = async () => {
  const returnData: { error?: string; response?: string } = {};
  try {
    const response2 = await client.send("/api/custom/deleteAllTransactions", {
      method: "POST",
      body: JSON.stringify({}),
    });
    returnData.response = "Done";
  } catch (e) {
    console.log("Error Deleting Transaction", e);
    returnData.error = "Error Deleting All Transactions";
  }
  return returnData;
};

export const bulkCreateTransactions = async (data: TransactionsRecord[]) => {
  const returnData: { error?: string; response?: string } = {};
  try {
    const response = await client.send("/api/custom/addBulk", {
      method: "POST",
      body: JSON.stringify({
        data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseText = "Done";
    returnData["response"] = responseText;
  } catch (e) {
    console.log("Error Adding Bulk Transactions", e);
    returnData["error"] = "Error Adding Bulk Transactions";
  }

  return returnData;
};

export const bulkDeleteTransactions = async (data: string[]) => {
  const returnData: { error?: string; response?: string } = {};
  try {
    const response = await client.send("/api/custom/deleteBulkTransactions", {
      method: "POST",
      body: JSON.stringify({
        data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseText = await response.text();
    returnData["response"] = responseText;
  } catch (e) {
    console.log("Error Deleting Bulk Transactions", e);
    returnData["error"] = "Error Deleting Bulk Transactions";
  }

  return returnData;
};

const getTotal = async ({
  filters,
  sort,
  page = 0,
  perPage = 20,
}: {
  filters?: JournalFilterType;
  sort?: JournalSortType;
  page?: number;
  perPage?: number;
} = {}) => {
  try {
    const filterText = filters ? journalFilter(filters) : "";
    const sortText = sort ? journalSort(sort) : "";
    const response = await client.send<{ total: number }>(
      "/api/custom/getTotal",
      {
        method: "POST",
        body: JSON.stringify({
          query: filterText,
          sort: sortText,
          pageNo: page,
          perPage,
        }),
      }
    );
    return response;
  } catch (e) {
    return { total: null };
  }
};

export const customEndpoints = {
  bulkCreateTransactions,
  bulkDeleteTransactions,
  bulkDeleteAllTransactions,
  bulkCloneTransactions,
  getTotal,
};
