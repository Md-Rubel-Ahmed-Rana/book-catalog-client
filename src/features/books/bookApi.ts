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
      query: (searchTerm) => ({
        url: `/api/v1/books?searchTerm=${searchTerm}`,
      }),
      providesTags: ["books"],
    }),
  }),
});

export const { useGetBooksQuery, useCreateBookMutation } = bookApi;
