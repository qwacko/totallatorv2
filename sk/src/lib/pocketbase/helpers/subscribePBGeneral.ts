import type { RecordService } from "pocketbase";
import { derived, readable, writable, type Readable } from "svelte/store";
import { browser } from "$app/environment";
import type { Writable } from "stream";

export const subscribePB = <ParamsType, DataOut>({
  collections,
  dataUpdater,
  initialParameters,
}: {
  collections: RecordService[];
  dataUpdater: (data: {
    params: ParamsType;
    setParams: (d: ParamsType) => void;
    setData: (newData: DataOut) => void;
  }) => void | Promise<void>;
  initialParameters: ParamsType;
}) => {
  const paramsStore = writable(initialParameters);

  const subscriptionStores = collections.map((collection) => {
    const date = new Date();
    const subscriptionStore = readable(date, (set) => {
      if (browser) {
        const triggerUnsubscribe = collection.subscribe("*", () => {
          console.log(
            "Running Subscription Trigger",
            collection.baseCollectionPath
          );
          const subscribeDate = new Date();
          set(subscribeDate);
        });

        const unsubFunction = () => {
          const asyncUnsub = async () => {
            await (
              await triggerUnsubscribe
            )();
          };
          asyncUnsub();
        };

        return unsubFunction;
      }
      return () => {};
    });
    return subscriptionStore;
  });

  const setParams = paramsStore.set;

  const storesList = [paramsStore, ...subscriptionStores] as const;
  type StoresListType = typeof storesList;
  type Mutable<T> = {
    -readonly [k in keyof T]: T[k];
  };

  const resultStore = derived<Mutable<StoresListType>, DataOut>(
    [...storesList],
    (stores, set) => {
      dataUpdater({ params: stores[0], setParams, setData: set });
    }
  );

  return { paramsStore, resultStore };
};
