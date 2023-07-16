import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.replace("/");
  };
  return (
    <nav className="shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className=" flex gap-3 items-center">
              <span>Welcome</span>
              <span className="font-bold">{user?.name}</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <Link to="/books" className="">
                All Books
              </Link>
              <Link to="/add-new-book" className=" ">
                Add New
              </Link>

              {!user?.email && (
                <>
                  {" "}
                  <Link to="/register" className="">
                    Register
                  </Link>
                  <Link to="/login" className="  ">
                    Login
                  </Link>
                </>
              )}
              {user?.email && (
                <button onClick={handleLogout} className=" ">
                  Logout
                </button>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover: hover:bg-indigo-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium  bg-indigo-500"
          >
            All Books
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium  hover:bg-indigo-500"
          >
            Register
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium  hover:bg-indigo-500"
          >
            Login
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium  hover:bg-indigo-500"
          >
            Logout
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium  hover:bg-indigo-500"
          >
            Add New
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
