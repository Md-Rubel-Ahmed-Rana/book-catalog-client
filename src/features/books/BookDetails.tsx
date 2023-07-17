import { useParams } from "react-router-dom";
import BookCard from "./BookCard";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetSingleBookQuery, useReviewToBookMutation } from "./bookApi";
import Swal from "sweetalert2";
import { RootState } from "../../app/store";

const BookDetails = () => {
  // const { state } = useLocation();
  const [review, setReview] = useState("");
  const user = useSelector((state: RootState) => state.user.user);
  const [addReviewToBook, { isLoading }] = useReviewToBookMutation();
  const { id } = useParams();
  const { data } = useGetSingleBookQuery(id);

  const book = data?.data;
  const handleReview = async () => {
    if (!user.email) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Login first to add review",
        showConfirmButton: false,
        timer: 5000,
      });
    }
    const reviewData = {
      user,
      review,
    };
    const result: any = await addReviewToBook({
      id: book._id,
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
        <BookCard book={book} />
        <div className="my-4 border px-5 py-2 shadow-md rounded-md">
          <h2 className="font-semibold">Add Review</h2>
          <input
            onChange={(e) => setReview(e.target.value)}
            type="text"
            className="reviewInput border px-2 py-1 rounded-md"
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
        {book?.reviews?.map((review: any) => (
          <div key={Math.random()} className="border px-5 py-2 rounded-md m-2">
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
