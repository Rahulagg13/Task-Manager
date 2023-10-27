import { useState } from "react";

import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../context/Auth/AuthProvider";

const Header = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const { logout } = useAuth();
  const { user } = useAuthContext();
  function handlenav() {
    setNavIsOpen((prev) => !prev);
    setShowItem((prev) => !prev);
  }

  return (
    <nav className="sticky top-0  bg-white border-b-2 z-50 shadow-md">
      <div className="flex justify-between items-center px-12 py-8   ">
        {!user && (
          <Link
            to="/"
            className="text-xl font-bold tracking-wider md:text-2xl "
          >
            Task-Manager
          </Link>
        )}
        {user && (
          <Link
            to="/app/alltask"
            className="text-xl font-bold tracking-wider md:text-2xl "
          >
            Task-Manager
          </Link>
        )}
        <ul className=" hidden md:flex space-x-5 text-lg tracking-wide font-bold items-center ">
          {user && (
            <>
              <p>{user.name}</p>
              {user.role === "admin" ? (
                <Link to="/app/admin">Dashboard</Link>
              ) : null}
              <button
                onClick={() => logout()}
                className="hover:underline hover:underline-offset-1 hover:scale-105"
              >
                Log out
              </button>
            </>
          )}
          {!user && (
            <>
              <NavLink
                to="/app/auth/signin"
                className="hover:underline hover:underline-offset-1 hover:scale-105"
              >
                Sign in
              </NavLink>
              <NavLink
                to="/app/auth/signup"
                className=" px-4 py-2  rounded-2xl bg-green-500 text-white hover:underline hover:underline-offset-1 hover:scale-105"
              >
                Sign up
              </NavLink>
            </>
          )}
        </ul>
        {/* Hamburger icon  */}
        <button
          id="menu-btn"
          onClick={handlenav}
          className={`${
            navIsOpen ? "open " : ""
          }block hamburger md:hidden focus:outline-none`}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div
          id="menu"
          className={`${
            showItem ? "flex" : "hidden"
          } absolute top-[50px] border-2 w-full h-48  flex-col items-center self-end  py-8 mt-10 space-y-6 font-bold bg-white  sm:self-center  drop-shadow-md `}
        >
          <ul className=" flex flex-col space-y-10  text-xl tracking-wide font-bold items-center ">
            {user && (
              <>
                <p>{user.name}</p>
                {user.role === "admin" ? (
                  <Link to="/app/admin">Dashboard</Link>
                ) : null}
                <button
                  onClick={() => logout()}
                  className="hover:underline hover:underline-offset-1 hover:scale-105"
                >
                  Log out
                </button>
              </>
            )}
            {!user && (
              <>
                <NavLink
                  to="/app/auth/signin"
                  className="hover:underline hover:underline-offset-1 hover:scale-105"
                >
                  Sign in
                </NavLink>
                <NavLink
                  to="/app/auth/signup"
                  className="border-4 px-4 py-2 border-green-400 rounded-2xl bg-green-500 text-white hover:underline hover:underline-offset-1 hover:scale-105"
                >
                  Sign up
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
