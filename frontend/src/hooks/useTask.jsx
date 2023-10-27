import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

function useTask() {
  const [alltask, setAllTask] = useState([]);
  const [getTaskValue, setGetTaskValue] = useState({});
  const [cookies] = useCookies(["jwt"]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  async function getAlltask() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "tasks/alltask",
        {
          headers: { Authorization: `Bearer ${cookies.jwt}` },
        }
      );
      setAllTask(response.data.tasks);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function createTask(value) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "tasks/newtask",
        value,
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }
  async function getTask(id) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + `tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );
      setGetTaskValue(response.data.task);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteTask(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        process.env.REACT_APP_BASE_URL + `tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    getAlltask,
    alltask,
    cookies,
    createTask,
    isLoading,
    error,
    getTask,
    getTaskValue,
    deleteTask,
  };
}

export default useTask;
