import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "./bookApi";
import { useSelector } from "react-redux";

type FormData = {
  title: string;
  author: string;
  genre: string;
  authorId?: string;
  publicationDate: string;
};

const AddNewBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [createBook] = useCreateBookMutation();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = await createBook({ ...data, authorId: user.id });
    if (result?.data?.success) {
      if (result?.data?.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: result?.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: result?.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
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
              Add New Book
            </h2>
          </div>
          <div className="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="title"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="my-5 rounded-md">
              <input
                aria-label="Author"
                type="text"
                {...register("author", {
                  required: "author is required",
                })}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.author ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Author"
              />
              {errors.author && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.author.message}
                </p>
              )}
            </div>
            <div className="">
              <input
                aria-label="Genre"
                type="text"
                {...register("genre", {
                  required: "Genre is required",
                })}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.genre ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Genre"
              />
              {errors.genre && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.genre.message}
                </p>
              )}
            </div>
            <div className="my-5">
              <input
                aria-label="Publication Date"
                type="date"
                {...register("publicationDate", {
                  required: "PublicationDate is required",
                })}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.publicationDate ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Publication Date"
              />
              {errors.publicationDate && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.publicationDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBook;
