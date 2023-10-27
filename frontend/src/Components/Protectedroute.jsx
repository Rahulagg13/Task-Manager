import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/Auth/AuthProvider";
const Protectedroute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  useEffect(() => {
    if (!user) {
      navigate("/app/auth/signin");
    }
  }, [user, navigate]);
  return user ? children : null;
};

export default Protectedroute;
