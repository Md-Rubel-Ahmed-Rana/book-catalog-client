import { useLocation } from "react-router-dom";
import BookCard from "./BookCard";

const BookDetails = () => {
  const { state } = useLocation();
  const {
    title,
    author,
    authorId: authorInfo,
    genre,
    publicationDate,
  } = state.book;

  return (
    <div className="lg:w-1/2 w-full mx-auto flex p-5 justify-center gap-2">
      <div className="w-3/5">
        <BookCard book={state.book} />
      </div>
      <div className="2/5 text-center">
        <h2 className="text-center">Reviews</h2>
      </div>
    </div>
  );
};

export default BookDetails;
