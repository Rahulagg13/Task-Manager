import { Link } from "react-router-dom";
import Tasks from "../Components/Tasks";
const AllTaskPage = () => {
  return (
    <div className="container h-screen mx-auto">
      <div className="flex justify-between items-center p-8">
        <h1 className="text-5xl font-semibold tracking-wide">All Tasks</h1>
        <Link
          to="newtask"
          className="py-2 px-8 text-white font-medium rounded-xl text-center cursor-pointer hover:scale-110 bg-green-500"
        >
          Add Task
        </Link>
      </div>
      <Tasks />
    </div>
  );
};

export default AllTaskPage;
