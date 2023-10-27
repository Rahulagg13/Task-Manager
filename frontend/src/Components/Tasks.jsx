import { Link } from "react-router-dom";
import Card from "../Components/Card";
import { useEffect } from "react";
import useTask from "../hooks/useTask";

const Tasks = () => {
  const { getAlltask, alltask } = useTask();

  useEffect(() => {
    getAlltask();
  }, []);

  return (
    <>
      {alltask.length === 0 ? (
        <p className=" mt-10 text-2xl text-center  w-full ">
          Click on <b>Add task </b> to Create a new Task{" "}
        </p>
      ) : (
        <div className=" grid grid-cols-1 gap-10 p-12 md:grid-cols-2 lg:grid-cols-3  ">
          {alltask.map((ele) => (
            <Card key={ele._id}>
              <h1 className=" mt-[10px] text-4xl font-semibold">{ele.title}</h1>
              <p className="text-xl font-medium">
                {ele.description.slice(0, 40)}...
              </p>

              <div className="w-full flex items-center justify-end space-x-4">
                <Link
                  to={`${ele._id}/${ele.slug}`}
                  className=" border-[3px] bg-green-500 font-semibold px-8 py-2 text-white rounded-2xl hover:bg-green-500 hover:text-white hover:scale-105"
                >
                  View
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default Tasks;
