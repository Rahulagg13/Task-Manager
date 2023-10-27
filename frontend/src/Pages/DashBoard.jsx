import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { toast } from "react-toastify";
import Back from "../Components/Back";

const DashBoard = () => {
  const [cookies] = useCookies(["jwt"]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const data = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_BASE_URL + "users/allUser",
          {
            headers: {
              Authorization: `Bearer ${cookies.jwt}`,
            },
          }
        );
        setUsers(res.data.data.users);
      } catch (err) {
        toast.error("Something went wrong!!!");
      }
    };
    data();
  }, [cookies]);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      console.log(cookies.jwt);
      const res = await axios.get(
        process.env.REACT_APP_BASE_URL + `users/deactivateUser/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );
      const newValue = users.filter((ele) => ele.id !== id);
      setUsers(newValue);
      window.location.reload();
      toast.success("User delete successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong !!!");
    }
  };
  return (
    <>
      <Back />
      <section className="h-screen w-full flex flex-col items-center px-8 py-12 space-y-10">
        {users.map((user) => {
          return (
            <div
              key={user._id}
              className=" container px-4 py-2 border-2 border-gray-800 rounded-lg space-y-8"
            >
              <h1 className="text-xl font-bold">{user.username}</h1>
              <p className="text-lg">Email: {user.email}</p>
              <div className="flex justify-end">
                <button
                  className=" border-2 bg-green-500 text-white rounded-lg px-6 py-2 "
                  onClick={() => handleDelete(user._id)}
                >
                  Deactivate User
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default DashBoard;
