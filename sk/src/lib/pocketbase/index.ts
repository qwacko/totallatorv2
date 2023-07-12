import { browser } from "$app/environment";
import PocketBase, { ListResult } from "pocketbase";
import {
  readable,
  writable,
  type Readable,
  type Subscriber,
} from "svelte/store";
import type { BaseSystemFields, Collections } from "./generated-types";
import { PUBLIC_PBURL } from "$env/static/public";

export const client = new PocketBase(PUBLIC_PBURL);

client.authStore.onChange(function () {
  currentUser.set(client.authStore.model);
});

export const currentUser = writable(client.authStore.model);

export async function login(
  username: string,
  password: string,
  register = false,
  rest: { [key: string]: any } = {}
) {
  if (register) {
    const user = { ...rest, username, password, confirmPassword: password };
    await client.collection("users").create(user);
  }
  await client.collection("users").authWithPassword(username, password);
}

export function logout() {
  client.authStore.clear();
}
