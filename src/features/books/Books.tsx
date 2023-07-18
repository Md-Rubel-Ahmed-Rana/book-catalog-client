import BookCard from "./BookCard";
import { useState } from "react";
import { useGetBooksQuery } from "./bookApi";
import { Link } from "react-router-dom";
import { genres } from "./AddNewBook";
import { SubmitHandler, useForm } from "react-hook-form";

interface IBook {
  _id: string;
  title: string;
  author: string;
  authorId: any;
  genre: string;
  publicationDate: string;
}

type FormData = {
  searchTerm: string;
};
const currentYear = new Date().getFullYear();
const yearsList = Array.from(
  { length: 100 },
  (_, index) => currentYear - index
);

const Books = () => {
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [filterByGenre, setFilterByGenre] = useState("");
  const [pageLimit, setPageLimit] = useState(9);
  const [year, setYear] = useState("");
  const { data, isLoading } = useGetBooksQuery({
    page: pageNumber,
    limit: pageLimit,
    genre: filterByGenre,
    year: year,
    searchTerm: searchText,
  });
  const [totalBooks, setTotalBooks] = useState(data?.meta?.total || 0);
  const [books, setBooks] = useState(data?.data || []);
  const pages = Math.ceil(totalBooks / pageLimit);
  console.log({ pages, totalBooks, total: data?.meta?.total });

  const { register, handleSubmit } = useForm<FormData>();

  const handleSearchBooks: SubmitHandler<FormData> = async (data) => {
    setSearchText(data.searchTerm);
  };

  if (isLoading) {
    return (
      <h1 className="text-xl font-bold text-center py-5">Books Loading...</h1>
    );
  }
  // if (searchText) {
  //   let searchedBooks = data?.data?.data?.filter(
  //     (book: IBook) =>
  //       book?.title?.toLowerCase().includes(searchText.toLowerCase()) ||
  //       book?.author?.toLowerCase().includes(searchText.toLowerCase()) ||
  //       book?.genre?.toLowerCase().includes(searchText.toLowerCase())
  //   );
  //   setBooks(() => [...books, searchedBooks]);
  // }

  return (
    <div>
      <div className="flex p-5">
        {books?.length < 1 && (
          <h1 className="w-full text-center text-xl font-bold">
            No books found
          </h1>
        )}
        <div className="w-10/12 m-2 grid grid-cols-3 gap-5">
          {books &&
            books?.map((book: IBook) => (
              <Link
                key={book._id}
                to={`/book-details/${book._id}`}
                state={{ book: book }}
              >
                <BookCard book={book} />
              </Link>
            ))}
        </div>
        <div className="w-2/12 border m-2 p-4 rounded-md">
          <form
            onSubmit={handleSubmit(handleSearchBooks)}
            className="border p-2 rounded-md"
          >
            <label htmlFor="" className="text-md font-semibold">
              Search Books
            </label>
            <div className="flex gap-1 w-full">
              <input
                {...register("searchTerm", {
                  required: "SearchTerm is required",
                })}
                type="text"
                className="border w-28 px-1"
              />

              <button
                type="submit"
                className="bg-blue-200 text-sm font-semibold px-2 rounded-md"
              >
                Search
              </button>
            </div>
          </form>
          {/* filters  */}
          <div className="mt-3">
            <h4 className="text-md font-semibold">Filter Books</h4>
            <div>
              <div className="my-2 border p-2 rounded-md">
                <p className="text-sm font-semibold mb-1">Genre</p>
                <select
                  value={filterByGenre}
                  onChange={(e) => setFilterByGenre(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                >
                  {genres.map((genre) => (
                    <option key={Math.random()} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="my-2 border p-2 rounded-md">
                <p className="text-sm font-semibold mb-1">Year</p>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                >
                  {yearsList.map((year) => (
                    <option key={Math.random()} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination  */}
      <div className="my-5  text-center">
        <div className="flex justify-center flex-wrap gap-3">
          {[...Array(pages).keys()].map((number) => (
            <p key={Math.random()}>
              <button
                type="button"
                key={number}
                className={`px-3 rounded-md outline-none  ${
                  pageNumber === number + 1 ? "bg-[#7dec96]" : "bg-gray-300"
                }`}
                onClick={() => setPageNumber(number + 1)}
              >
                {number + 1}
              </button>
            </p>
          ))}
          <select
            defaultValue={pageLimit}
            className="rounded-md px-8 text-xs py-0"
            onChange={(event) => setPageLimit(Number(event.target.value))}
          >
            <option value="5">5</option>
            <option selected value="9">
              9
            </option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Books;
