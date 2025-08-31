import { compose, applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import rootSaga from "./root-saga";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./root-reducer";

// 1. In vanilla Redux, you define a set of reducer functions,
// each of which is a pure function that takes (state, action)
// and returns the next state.

// 2. These reducers are combined using combineReducers()
// into a rootReducer, which handles the overall state tree.

// 3. The Redux store is created using createStore(), which takes:
// (rootReducer, preloadedState?, enhancer)
// Enhancers include middleware and devtools support.

// 4. Middleware (e.g. redux-logger) sits between dispatch and the reducers.
// Actions flow: dispatch -> middleware -> reducer

const persistConfig = {
  key: "root",
  storage,
  // strings of the reducers you don't want to persist
  blacklist: ["user"],
};

// applies the persist configs to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean);

// 5. applyMiddleware() returns a store enhancer that wraps dispatch.
// compose() merges this enhancer with others if needed (e.g. devtools).
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// 6. Create the Redux store with the root reducer and composed enhancers.
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
