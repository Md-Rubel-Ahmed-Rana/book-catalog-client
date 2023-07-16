import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userState = useSelector((state) => state);
  console.log("fro private route", userState?.user?.loading);
  if (userState?.user?.loading === true) {
    return <h2>Loading...</h2>;
  }

  if (!userState?.user?.user.email) {
    return <Navigate to="/login" />;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
