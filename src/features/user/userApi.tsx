import apiSlice from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/api/v1/users/create-user",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/api/v1/auth/loggedinUser",
        headers: {
          authorization: "",
        },
      }),
    }),
  }),
});

export const { useCreateUserMutation, useGetUserQuery } = userApi;
