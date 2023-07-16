import BookCard from "./BookCard";
import { useState } from "react";
import { useGetBooksQuery } from "./bookApi";
import { Link } from "react-router-dom";

interface IBook {
  title: string;
  author: string;
  authorId: any;
  genre: string;
  publicationDate: string;
}

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError, error } = useGetBooksQuery([]);
  if (isLoading) {
    return (
      <h1 className="text-xl font-bold text-center py-5">Books Loading...</h1>
    );
  }
  const books = data?.data?.data;

  return (
    <div className="flex p-5">
      {isError && <h1>{error?.message}</h1>}
      {data?.data?.data.length < 1 && (
        <h1 className="w-full text-center text-xl font-bold">No books found</h1>
      )}
      <div className="w-10/12 m-2 grid grid-cols-3 gap-5">
        {books?.map((book: IBook) => (
          <Link key={book._id} to="/book-details" state={{ book: book }}>
            <BookCard book={book} />
          </Link>
        ))}
      </div>
      <div className="w-2/12 border m-2 p-4 rounded-md">
        <div>
          <label htmlFor="" className="text-md font-semibold">
            Search book
          </label>
          <div className="flex gap-1 w-full">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              className="border w-28 p-1"
            />
            <button className="bg-blue-200 text-sm font-semibold p-2 rounded-md">
              Search
            </button>
          </div>
        </div>
        {/* filters  */}
        <div className="mt-3">
          <h4 className="text-md font-semibold">Filters</h4>
        </div>
      </div>
    </div>
  );
};

export default Books;
