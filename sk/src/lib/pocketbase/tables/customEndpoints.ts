import { client } from "..";
import type { TransactionsRecord } from "../generated-types";

export const bulkDeleteAllTransactions = async () => {
  const returnData: { error?: string; response?: string } = {};
  try {
    const response2 = await client.send("/api/custom/deleteAllTransactions", {
      method: "POST",
      body: JSON.stringify({}),
    });
    // const response = await fetch("/api/custom/deleteAllTransactions", {
    //   method: "POST",
    //   body: JSON.stringify({}),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
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

export const customEndpoints = {
  bulkCreateTransactions,
  bulkDeleteTransactions,
  bulkDeleteAllTransactions,
};
