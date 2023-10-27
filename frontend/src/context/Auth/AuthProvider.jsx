import { useReducer, useContext, useEffect } from "react";
import { AuthContext } from "./Auth-context";

import { getData } from "../../storage/storage";

const defaultAuth = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, isAuthenticate: true };
    case "LOGOUT":
      return { user: null, isAuthenticate: false };
    default:
      throw new Error("unknown state");
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(defaultAuth, {
    user: getData("user") || null,
    isAuthenticate: false,
  });

  useEffect(() => {
    const value = getData("user");
    if (value) {
      dispatch({ type: "LOGIN", payload: value });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
export default AuthProvider;
