import HomePage from "./HomePage";
import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <>
      <HomePage></HomePage>
      <Outlet></Outlet>
    </>
  );
};

export default AppLayout;
