import { useGetWishListBooksQuery } from "./bookApi";

const WishList = () => {
  const { data } = useGetWishListBooksQuery([]);
  console.log(data);
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            {data?.length > 0 ? (
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
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data?.map((book: any, index: number) => (
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {book?.bookId?.title}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {" "}
                          {book?.bookId?.genre}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {book?.bookId?.author}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <h2 className="text-center py-10">No books added yet.</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
