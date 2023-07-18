import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bookcatalogserver.vercel.app/",
  }),
  tagTypes: ["books", "book", "readingList"] as any,
  endpoints: () => ({}),
});

export default apiSlice;
