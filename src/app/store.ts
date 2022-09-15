import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import postsReducer from "../features/posts/postsSlice";
import notesReducer from "../features/posts/notesSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      posts: postsReducer,
      notes: notesReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
