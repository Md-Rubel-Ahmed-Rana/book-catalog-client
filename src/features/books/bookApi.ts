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
      query: ({ page, limit, searchTerm, genre, year }) => ({
        url: `/api/v1/books?page=${page}&limit=${limit}&year=${year}&genre=${genre}&searchTerm=${searchTerm}`,
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
    addToReadingList: builder.mutation({
      query: ({ data }) => ({
        url: "/api/v1/readinglist",
        method: "POST",
        body: data,
      }),
    }),
    getReadingListBooks: builder.query({
      query: ({ email }) => ({
        url: "/api/v1/readinglist",
        body: email,
      }),
    }),
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/api/v1/readinglist/${id}`,
        method: "PUT",
      }),
    }),
  }),
});
// readinglist
export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
  useReviewToBookMutation,
  useGetSingleBookQuery,
  useAddToWishListMutation,
  useGetWishListBooksQuery,
  useAddToReadingListMutation,
  useGetReadingListBooksQuery,
  useMarkAsReadMutation,
} = bookApi;
