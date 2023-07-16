import BookCard from "./BookCard";
import { useGetBooksQuery } from "./bookApi";

interface IBook {
  title: string;
  author: string;
  authorId: any;
  genre: string;
  publicationDate: string;
}

const Books = () => {
  const { data, isLoading, isError, error } = useGetBooksQuery([]);
  if (isLoading) {
    return (
      <h1 className="text-xl font-bold text-center py-5">Books Loading...</h1>
    );
  }
  console.log(data?.data?.data);
  return (
    <div className="flex">
      {isError && <h1>{error.message}</h1>}
      <div className="grid grid-cols-3 px-10 py-5 gap-5">
        {data?.data?.data?.map((book: IBook) => (
          <BookCard book={book} />
        ))}
      </div>
      <div>side bar</div>
    </div>
  );
};

export default Books;
