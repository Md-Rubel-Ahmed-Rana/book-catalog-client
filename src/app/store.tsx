import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import api from "../features/api/apiSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
