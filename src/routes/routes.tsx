import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/LandingPage/HomePage";
import AddNewBook from "../features/books/AddNewBook";

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
        path: "/add-new-book",
        element: <AddNewBook />,
      },
    ],
  },
]);

export default router;
