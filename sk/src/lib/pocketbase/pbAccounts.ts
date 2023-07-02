import { client } from ".";
import { accounts } from "./accountsStore";
import { Collections } from "./generated-types";

export const pbAccounts = {
    accounts: accounts(client.collection(Collections.Accounts))
}
