import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counterSlice";
import postsReducer from "../features/posts/postsSlice";

export default function makeStore(incomingPreloadState?: AppState) {
  return configureStore({
    reducer: { counter: counterReducer, posts: postsReducer },
    preloadedState: incomingPreloadState,
  });
}

export let store = null;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
