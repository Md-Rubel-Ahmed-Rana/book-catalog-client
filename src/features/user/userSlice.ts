import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export const initialState = {
  user: {
    email: "",
    password: "",
    name: "",
  },
  loading: false,
  error: "",
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: { email: string; password: string }) => {
    const result = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      userData
    );
    return result;
  }
);

export const loggedinUser = createAsyncThunk("auth/loggedinUser", async () => {
  const user = await axios.get(
    "http://localhost:5000/api/v1/auth/loggedinUser",
    {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    }
  );
  return user;
});

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action: any) => {
      const data = action?.payload?.data?.data;
      JSON.stringify(localStorage.setItem("accessToken", data?.accessToken));
      state.user = data?.user;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
