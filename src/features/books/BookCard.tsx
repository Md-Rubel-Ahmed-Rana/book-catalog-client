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
  const { title, author, authorId: authorInfo, genre, publicationDate } = book;
  return (
    <div className="border py-5 px-2 rounded-md bg-sky-50">
      <h2 className="text-xl font-bold">Title: {title}</h2>
      <h2 className="text-sm font-semibold">Genre: {genre}</h2>
      <h2 className="text-sm font-semibold">Author: {author}</h2>
      <h2 className="text-sm font-semibold">Published: {publicationDate}</h2>
    </div>
  );
};

export default BookCard;
