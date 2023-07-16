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
    getSingleBook: builder.query({
      query: (id) => ({
        url: `/api/v1/books/${id}`,
      }),
      providesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/api/v1/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    reviewToBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    addToWishList: builder.mutation({
      query: ({ data }) => ({
        url: "/api/v1/wishlist",
        method: "POST",
        body: data,
      }),
    }),
    getWishListBooks: builder.query({
      query: () => ({
        url: "/api/v1/wishlist",
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
  useReviewToBookMutation,
  useGetSingleBookQuery,
  useAddToWishListMutation,
  useGetWishListBooksQuery,
} = bookApi;
