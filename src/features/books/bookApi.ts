import apiSlice from "../api/apiSlice";

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/api/v1/books/create-book",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    getBooks: builder.query({
      query: () => ({
        url: "/api/v1/books",
      }),
      providesTags: ["books"],
    }),
  }),
});

export const { useGetBooksQuery, useCreateBookMutation } = bookApi;
