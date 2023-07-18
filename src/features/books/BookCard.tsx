import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useAddToReadingListMutation,
  useAddToWishListMutation,
  useDeleteBookMutation,
  useGetReadingListBooksQuery,
  useGetWishListBooksQuery,
} from "./bookApi";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface IBook {
  _id: string;
  title: string;
  author: string;
  authorId: any;
  genre: string;
  publicationDate: string;
  __v: string;
}

const BookCard = ({ book }: any) => {
  const location = useLocation();
  const user: any = useSelector((state: RootState) => state.user.user);

  const [deleteBook] = useDeleteBookMutation();
  const [addToWishList] = useAddToWishListMutation();
  const [addToReadingList] = useAddToReadingListMutation();
  const allbooks: any = useGetReadingListBooksQuery([]);
  const { data: wishBooks } = useGetWishListBooksQuery([]);
  const readingBooks = allbooks?.data?.filter(
    (dt: any) => dt?.email === user?.email
  );

  const handleDeleteBook = (book: IBook) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result: any = await deleteBook(book._id);
        if (result.data.success) {
          Swal.fire("Deleted!", "Your book has been deleted.", "success");
        }
      }
    });
  };

  const handleAddToWishList = async () => {
    const isAdded = wishBooks?.find((bk: any) => bk?.bookId._id === book?._id);
    if (isAdded) {
      return Swal.fire({
        title: "Book already added!",
        icon: "warning",
        timer: 1500,
      });
    }
    const data = {
      email: user?.email,
      bookId: book?._id,
      title: book?.title,
    };
    const result: any = await addToWishList({ data });
    if (result.data.createdAt) {
      Swal.fire({
        title: "Book added successfully!",
        icon: "success",
        timer: 1500,
      });
    }
  };

  const handleAddToReadingList = async () => {
    const isAdded = readingBooks?.find(
      (bk: any) => bk?.book?._id === book?._id
    );
    if (isAdded) {
      return Swal.fire({
        title: "Book already added!",
        icon: "warning",
        timer: 1500,
      });
    }
    const data = {
      email: user?.email,
      user: user?.id,
      book: book?._id,
    };
    const result: any = await addToReadingList({ data });
    if (result.data.createdAt) {
      Swal.fire({
        title: "Book added successfully!",
        icon: "success",
        timer: 1500,
      });
    }
  };

  return (
    <div className="border py-5 px-2 rounded-md bg-sky-50">
      <h2 className="text-xl font-bold">Title: {book?.title}</h2>
      <h2 className="text-sm font-semibold">Genre: {book?.genre}</h2>
      <h2 className="text-sm font-semibold">Author: {book?.author}</h2>
      <h2 className="text-sm font-semibold">
        Published: {book?.publicationDate?.split("-").reverse().join("-")}
      </h2>
      {user?.id === book?.authorId?._id &&
        location.pathname === `/book-details/${book?._id}` && (
          <div className="flex justify-center gap-2 mt-5">
            <button className="bg-blue-500 px-5 py-1 text-white rounded-sm text-sm font-semibold">
              <Link to="/edit-book" state={{ book: book }}>
                Edit
              </Link>
            </button>
            <button
              onClick={() => handleDeleteBook(book)}
              className="bg-red-500 px-5 py-1 text-white rounded-sm text-sm font-semibold"
            >
              Delete
            </button>
          </div>
        )}
      {user?.id && location.pathname === `/book-details/${book?._id}` && (
        <div className="flex gap-5 mt-3 justify-center">
          <button
            onClick={handleAddToWishList}
            className="bg-blue-500 px-5 py-1 text-white rounded-sm text-sm font-semibold"
          >
            Add to Wishlist
          </button>
          <button
            onClick={handleAddToReadingList}
            className="bg-red-500 px-5 py-1 text-white rounded-sm text-sm font-semibold"
          >
            Add to Reading
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
