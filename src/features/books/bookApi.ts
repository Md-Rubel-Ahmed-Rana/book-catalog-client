import apiSlice from "../api/apiSlice";

const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/api/v1/books/create-book",
        body: data,
      }),
      invalidatesTags: ["books"] as any,
    }),
    getBooks: builder.query({
      query: ({ page, limit, searchTerm, genre, year }) => ({
        url: `/api/v1/books?page=${page}&limit=${limit}&year=${year}&genre=${genre}&searchTerm=${searchTerm}`,
      }),
      providesTags: ["books"] as any,
    }),
    getSingleBook: builder.query({
      query: (id) => ({
        url: `/api/v1/books/${id}`,
      }),
      providesTags: ["book"] as any,
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/api/v1/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"] as any,
    }),
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["books"] as any,
    }),
    reviewToBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["book"] as any,
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
      invalidatesTags: ["readingList"] as any,
    }),
    getReadingListBooks: builder.query({
      query: ({ email }): any => ({
        url: "/api/v1/readinglist",
        body: email,
      }),
      providesTags: ["readingList"] as any,
    }),
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/api/v1/readinglist/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["readingList"] as any,
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
