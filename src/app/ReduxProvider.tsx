"use client";

import { Provider } from "react-redux";
import { AppStore, makeStore } from "./store";


let store: AppStore;

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  // Ensure store is created once on the client
  if (!store) {
    store = makeStore();
  }

  return <Provider store={store}>{children}</Provider>;
}
