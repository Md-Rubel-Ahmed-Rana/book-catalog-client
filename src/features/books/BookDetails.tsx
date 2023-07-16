import { useLocation } from "react-router-dom";
import BookCard from "./BookCard";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useReviewToBookMutation } from "./bookApi";
import Swal from "sweetalert2";

const BookDetails = () => {
  const { state } = useLocation();
  const [review, setReview] = useState("");
  const user = useSelector((state) => state.user.user);
  const [addReviewToBook, { isLoading, isSuccess }] = useReviewToBookMutation();

  const handleReview = async () => {
    const reviewData = {
      user,
      review,
    };
    const result = await addReviewToBook({
      id: state.book._id,
      data: reviewData,
    });
    if (result?.data?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="lg:w-2/3 w-full mx-auto flex p-5 justify-center gap-2">
      <div className="w-8/12 ">
        <BookCard book={state.book} />
        <div className="my-4 border px-5 py-2 shadow-md rounded-md">
          <h2 className="font-semibold">Add Review</h2>
          <input
            onChange={(e) => setReview(e.target.value)}
            type="text"
            className="border px-2 py-1 rounded-md"
            placeholder="Your review"
          />
          <button
            onClick={handleReview}
            className="bg-blue-500 ml-3 text-white text-sm font-semibold px-3 rounded-sm py-1"
          >
            Submit{" "}
            {isLoading && (
              <span className="animate-spin rounded-full h-4 w-4 border-t-4 border-blue-500"></span>
            )}
          </button>
        </div>
      </div>
      <div className="w-4/12 sticky top-0">
        <h2 className="text-center font-semibold text-lg">
          Reviews of this book
        </h2>
        {state.book.reviews.map((review) => (
          <div className="border px-5 py-2 rounded-md m-2">
            <h2 className="text-sm font-bold">{review?.user?.name}</h2>
            <p className="text-xs font-thin ml-2 text-gray-700">
              {review?.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookDetails;
