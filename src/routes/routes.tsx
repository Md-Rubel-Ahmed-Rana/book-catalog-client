import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/LandingPage/HomePage";
import AddNewBook from "../features/books/AddNewBook";
import BookDetails from "../features/books/BookDetails";
import EditBook from "../features/books/EditBook";
import Books from "../features/books/Books";
import PrivateRoute from "./PrivateRoute";
import ReadingList from "../features/books/ReadingList";
import WishList from "../features/books/WishList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/book-details/:id",
        element: <BookDetails />,
      },
      {
        path: "/edit-book",
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/wishList",
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
      },
      {
        path: "/readinglist",
        element: (
          <PrivateRoute>
            <ReadingList />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
