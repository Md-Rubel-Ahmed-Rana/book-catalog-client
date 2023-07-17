import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { useEffect } from "react";
import { loggedinUser, setCurrentUser } from "./features/user/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store";
function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchUser = async () => {
      const user: any = await dispatch(loggedinUser());
      if (user?.payload?.data?.success) {
        dispatch(setCurrentUser(user?.payload?.data?.data));
      }
    };
    fetchUser();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
