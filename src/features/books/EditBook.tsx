import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useEditBookMutation } from "./bookApi";
import { genres } from "./AddNewBook";

type FormData = {
  title: string;
  author: string;
  genre: string;
  authorId?: string;
  publicationDate: string;
};

const EditBook = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const book = state.book;

  const [editBook] = useEditBookMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result: any = await editBook({ id: book._id, data: data });
    if (result?.data?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/books");
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
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <form
          className="shadow-2xl px-10 py-5 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <h2 className="mb-4 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Edit Book
            </h2>
          </div>
          <div className="rounded-md shadow-sm">
            <div>
              <p className="text-sm font-semibold mb-1">Title</p>

              <input
                defaultValue={book?.title}
                aria-label="Title"
                type="text"
                {...register("title")}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="title"
              />
            </div>
            <div className="my-5">
              <p className="text-sm font-semibold mb-1">Author</p>

              <input
                defaultValue={book?.author}
                aria-label="Author"
                type="text"
                {...register("author")}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Author"
              />
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Genre</p>
              <select
                defaultValue={book?.genre}
                {...register("genre")}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                {genres.map((genre) => (
                  <option key={Math.random()} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-5">
              <p className="text-sm font-semibold mb-1">Publication Date</p>
              <input
                defaultValue={book?.publicationDate}
                aria-label="Publication Date"
                type="date"
                {...register("publicationDate")}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Publication Date"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
