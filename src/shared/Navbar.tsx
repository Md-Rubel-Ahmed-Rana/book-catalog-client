import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white">
              Logo
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <Link to="/books" className="text-white">
                All Books
              </Link>
              <Link to="/add-new-book" className="text-white ">
                Add New
              </Link>

              <Link to="/register" className="text-white">
                Register
              </Link>
              <Link to="/login" className="text-white  ">
                Login
              </Link>
              <Link to="/" className="text-white ">
                Logout
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-500"
          >
            All Books
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
          >
            Register
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
          >
            Login
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
          >
            Logout
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
          >
            Add New
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
