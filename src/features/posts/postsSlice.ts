import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import axios from "axios";

// add initial state interface
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "failed";
}

// create initial state with default values
const initialState: PostsState = {
  posts: [],
  status: "idle",
};

// createAsyncThunk
const postsBaseUrl = "https://jsonplaceholder.typicode.com";

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (): Promise<Post[]> => {
    const res = await axios.get(postsBaseUrl + "/posts");
    return res.data;
  }
);

// createSlice with name, initial state, reducers, extra reducers
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    deleteAllPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.status = "idle";
          state.posts = action.payload;
        }
      )
      .addCase(fetchAllPosts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// export actions
export const { deleteAllPosts } = postsSlice.actions;

// export select
export const selectPosts = (state: AppState) => state.posts.posts;
export const selectPostsStatus = (state: AppState) => state.posts.status;

// export reducer
export default postsSlice.reducer;
