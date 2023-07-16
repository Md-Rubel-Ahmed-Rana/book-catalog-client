import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { useEffect } from "react";
import { loggedinUser, setCurrentUser } from "./features/user/userSlice";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const user = await dispatch(loggedinUser());
      if (user.payload.data.success) {
        dispatch(setCurrentUser(user.payload.data.data));
      }
    };
    fetchUser();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
