import { Link } from "react-router-dom";
import homeImage from "../assets/HomePageTask.png";
import { TypeEffect } from "../Components/TypeEffect";
import { useAuthContext } from "../context/Auth/AuthProvider";
const HomePage = () => {
  const { user } = useAuthContext();
  
  return (
    <section className=" container h-screen flex flex-col-reverse px-6 justify-between mt-[40px] items-center mx-auto lg:flex-row lg:space-x-12 ">
      <div className=" flex flex-col space-y-12 p-12  max-w-xl">
        <h1 className="md:text-6xl font-semibold md:text-left md:w-[480px] tracking-wider space-y-12 text-4xl text-center">
          Organize your work and life, finally.
        </h1>
        <p className="font-medium tracking-wide space-y-3 md:text-left text-center">
          Manage all your work
          <TypeEffect text={["and enjoy life."]} />
        </p>
        {user && (
          <Link
            to="alltask"
            className=" text-center mx-auto w-48 px-4 py-2 border-2 border-green-400 bg-green-500 text-white font-medium rounded-full hover:scale-110 md:mx-0"
          >
            Get Started
          </Link>
        )}
        {!user && (
          <Link
            to="/app/auth/signin"
            className=" text-center mx-auto w-48 px-4 py-2 border-2 border-green-400 bg-green-500 text-white font-medium rounded-full hover:scale-110 md:mx-0"
          >
            Get Started
          </Link>
        )}
      </div>

      <div className="md:w-1/2 ">
        <img src={homeImage} alt="task" />
      </div>
    </section>
  );
};

export default HomePage;
