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
        element: <AddNewBook />,
      },
      {
        path: "/book-details",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-book",
        element: <EditBook />,
      },
    ],
  },
]);

export default router;
