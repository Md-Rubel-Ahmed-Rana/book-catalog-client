import apiSlice from "../api/apiSlice";

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/api/v1/books",
        body: data,
      }),
    }),
    getBooks: builder.query({
      query: () => ({
        url: "/api/v1/books",
      }),
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
