import Button from "../UI/Button";
import { useRef, useState } from "react";
import BasicDatePicker from "./BasicDatePicker";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useTask from "../hooks/useTask";
import { toast } from "react-toastify";
import Back from "./Back";
const convertToLocaleString = (value) => {
  return value.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const AddTaskForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const title = useRef("");
  const description = useRef("");
  const priority = useRef("");
  const { createTask, isLoading, error } = useTask();
  console.log(error);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      title.current === " " &&
      description.current === " " &&
      value === " " &&
      priority.current === " "
    )
      return;

    const newTaskData = {
      title: title.current.value,
      description: description.current.value,
      priority: priority.current.value,
      dueDate: convertToLocaleString(value),
    };

    await createTask(newTaskData);
    setTimeout(() => {
      navigate("/app/alltask");
    }, 1000);
    toast.success("Your task added successfully");
  };

  return (
    <>
      <Back />
      <div className="h-screen w-full flex flex-col mt-10 items-center mx-auto ">
        <div className=" flex flex-col items-center space-y-12 p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold ">New Task</h1>
          <form
            className="flex flex-col space-y-4 mx-auto "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col justify-start space-y-2  w-full md:w-[600px]">
              <label htmlFor="Title" className="text-lg font-bold">
                Title
              </label>
              <input
                type="text"
                id="Title"
                placeholder="New Title"
                minLength={3}
                className="border-[1px] border-gray-400    px-4 py-2 text-2xl font-base rounded-lg md:px-2 md:text-lg "
                ref={title}
                required
              />
            </div>

            <div className="flex flex-col justify-start space-y-2">
              <label htmlFor="task" className="text-lg font-bold">
                Task
              </label>
              <textarea
                type="text"
                id="task"
                placeholder="Detail"
                className="border-[1px] border-gray-400 px-4 py-2 text-2xl rounded-lg md:px-2 md:text-lg "
                ref={description}
                minLength={3}
                required
              />
            </div>
            <div className="flex justify-between space-x-3">
              <div className=" flex flex-col justify-start  w-full">
                <label className="text-lg font-bold">Due Date</label>
                <BasicDatePicker value={value} setValue={setValue} />
              </div>
              <div className=" flex flex-col justify-start space-y-2 w-full">
                <label htmlFor="priority" className="text-lg font-bold ">
                  Priority
                </label>
                <select
                  name="priority"
                  id="Priority"
                  className="border-[1px] border-gray-400  h-full px-4 py-2 text-2xl  rounded-lg md:px-2 md:text-lg "
                  ref={priority}
                  required
                >
                  <option value="" defaultChecked>
                    Select
                  </option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-green-400">
                Submit
              </Button>
            </div>
          </form>
          {error && toast.error(error)}
        </div>
      </div>
    </>
  );
};

export default AddTaskForm;
