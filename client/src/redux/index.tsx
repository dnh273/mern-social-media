import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  mode: "light" | "dark";
  user: any;
  token: string | null;
  posts: Post[];
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  location: string;
  occupation: string;
  viewedProfile: string;
  impressions: string;
  friends: [];
}

interface Post {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  description: string;
  location: string;
  picturePath: string;
  userPicturePath: string;
  likes: any;
  comments: [string];
}

const initialState: AuthState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

console.log(initialState);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      console.log(action);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("user friends non-existent: ");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      console.log(action);
      const updatedPosts = state.posts.map((post: any) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setFriends, setLogin, setLogout, setMode, setPost, setPosts } =
  authSlice.actions;

export default authSlice.reducer;
