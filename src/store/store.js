import { configureStore } from "@reduxjs/toolkit";
import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// default middlewares: redux-thunk, serializability checks, immutability checks
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(process.env.NODE_ENV === "development" ? [logger] : []),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
