import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTask from "../hooks/useTask";
import Button from "../UI/Button";
import { dateFormat } from "../utility/dateFormat";
import { toast } from "react-toastify";
import Back from "../Components/Back";
const TaskViewPage = () => {
  const { id } = useParams();
  const { getTaskValue, getTask, deleteTask } = useTask();
  const { title, description, dueDate, priority } = getTaskValue;
  const navigate = useNavigate();
  useEffect(() => {
    getTask(id);
  }, []);

  const handleClick = async () => {
    await deleteTask(id);
    toast.success("Task Deleted!!!");
  };

  return (
    <>
      <Back></Back>
      <section className="h-full w-full flex flex-col ">
        <div className="  px-8 py-12 flex justify-between ">
          <h1 className="font-bold text-5xl uppercase tracking-wider">
            {title}{" "}
          </h1>
          <div className="flex justify-center items-center space-x-6">
            <p className=" tracking-wide font-semibold">
              Due date:- {dateFormat(dueDate)}
            </p>
            <h1 className="italic">{priority}</h1>
          </div>
        </div>
        <div className="font-base px-8 text-xl tracking-wide min-h-[450px]  ">
          {description}
        </div>
        <div className="  space-x-8 flex justify-center px-12 mt-7">
          <Button className="bg-red-500 " onClick={handleClick}>
            Delete
          </Button>
        </div>
      </section>
    </>
  );
};

export default TaskViewPage;
