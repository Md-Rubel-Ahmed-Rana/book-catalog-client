import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeleteBookMutation } from "./bookApi";
import { useSelector } from "react-redux";

interface IBook {
  _id: string;
  title: string;
  author: string;
  authorId: any;
  genre: string;
  publicationDate: string;
  __v: string;
}

const BookCard = ({ book }: IBook) => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);

  const { title, author, authorId: authorInfo, genre, publicationDate } = book;
  const [deltedBook] = useDeleteBookMutation();
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
        const result = await deltedBook(book._id);
        if (result.data.success) {
          Swal.fire("Deleted!", "Your book has been deleted.", "success");
        }
      }
    });
  };

  return (
    <div className="border py-5 px-2 rounded-md bg-sky-50">
      <h2 className="text-xl font-bold">Title: {title}</h2>
      <h2 className="text-sm font-semibold">Genre: {genre}</h2>
      <h2 className="text-sm font-semibold">Author: {author}</h2>
      <h2 className="text-sm font-semibold">
        Published: {publicationDate.split("-").reverse().join("-")}
      </h2>
      {user.id === authorInfo._id && location.pathname === "/book-details" && (
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
    </div>
  );
};

export default BookCard;
