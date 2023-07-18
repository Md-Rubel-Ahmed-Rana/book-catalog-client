import Swal from "sweetalert2";
import { useAppSelector } from "../../redux/hooks";
import { useGetReadingListBooksQuery, useMarkAsReadMutation } from "./bookApi";

const ReadingList = () => {
  const user = useAppSelector((state) => state.user.user);
  const data = useGetReadingListBooksQuery([]);
  const [markAsRead] = useMarkAsReadMutation();
  const myBooks = data?.data?.filter((dt: any) => dt?.email === user?.email);

  const handleBookRead = async (id: string) => {
    const result: any = await markAsRead(id);
    if (result.modifiedCount > 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Reading finished",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  console.log(myBooks);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            {myBooks?.length > 0 ? (
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      SR
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Genre
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Make As
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {myBooks &&
                    myBooks?.map((book: any, index: number) => (
                      <tr
                        key={book?.book?._id}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {book?.book?.title}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {" "}
                          {book?.book?.genre}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {book?.book?.author}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {book?.isRead}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {book?.isRead === "unread" ? (
                            <button
                              className="bg-sky-500 text-white px-3 py-1 rounded-md"
                              onClick={() => handleBookRead(book?._id)}
                            >
                              Mark as Read
                            </button>
                          ) : (
                            <button className="p-1 cursor-not-allowed rounded-md">
                              Reading Finished
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <div className="flex justify-center my-40 items-center">
                <h2 className="text-center">No books added yet.</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingList;
