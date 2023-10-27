import { useState } from "react";
import { useAuthContext } from "../context/Auth/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { setData } from "../storage/storage";
import { toast } from "react-toastify";

export const useAuth = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["jwt"]);
  const { dispatch } = useAuthContext();

  //signup
  const signup = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "auth/signup",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCookie("jwt", response.data.token, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        // httpOnly: true,
      });
      const value = {
        id: response.data.data.user._id,
        email: response.data.data.user.email,
        name: response.data.data.user.username,
        role: response.data.data.user.roles,
        active: response.data.data.user.active,
      };
      setData("user", value);
      dispatch({ type: "LOGIN", payload: value });
      navigate("/app/alltask");
      toast.success("Successfully created an account!!!");
    } catch (error) {
      // console.log(error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  //login
  const signin = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "auth/signin",
        data,
        {
          headers: {
           "Content-Type": "application/json" 
          },
        }
      );
      setCookie("jwt", response.data.token, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        // httpOnly: true,
      });
      const value = {
        id: response.data.data.user._id,
        email: response.data.data.user.email,
        name: response.data.data.user.username,
        role: response.data.data.user.roles,
        active: response.data.data.user.active,
      };
      setData("user", value);

      dispatch({ type: "LOGIN", payload: value });
      navigate("/app/alltask");
      toast.success("You are successfully logged in !!!");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  //logout
  const logout = () => {
    setCookie("jwt", "logout", {
      expires: new Date(Date.now() + 1000),
      // httpOnly: true,
    });
    setData("user", null);
    dispatch({ type: "LOGOUT" });
    navigate("/app/auth/signin");
  };
  return { isLoading, error, signup, signin, logout };
};
