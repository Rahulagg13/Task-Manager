import { lazy, Suspense, useEffect } from "react";

/* React-router function */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Protectedroute from "./Components/Protectedroute";
/* Component  */
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Loader from "./UI/Loader";
import TostMessage from "./utility/ToastMessage";
import { useCookies } from "react-cookie";
import { useAuth } from "./hooks/useAuth";
import { useAuthContext } from "./context/Auth/AuthProvider";
/* pages */
// import HomePage from "./Pages/HomePage";
// import AllTaskPage from "./Pages/AllTaskPage";
// import ErrorPage from "./Pages/ErrorPage";

const HomePage = lazy(() => import("./Pages/HomePage"));
const AllTaskPage = lazy(() => import("./Pages/AllTaskPage"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage"));
const TaskViewPage = lazy(() => import("./Pages/TaskViewPage"));
const AddTaskPage = lazy(() => import("./Pages/AddTaskPage"));
const SignUpPage = lazy(() => import("./Components/SignUpForm"));
const SignInPage = lazy(() => import("./Components/SignInForm"));
const DashBoard = lazy(() => import("./Pages/DashBoard"));

function App() {
  const [cookies] = useCookies(["jwt"]);
  const { user } = useAuthContext();
  useEffect(() => {
    if (!cookies.jwt) {
      localStorage.removeItem("user");
      <Navigate to="/app/auth/signin" />;
    }
  }, [cookies, user]);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/app/alltask"
            element={
              <Suspense fallback={<Loader />}>
                <Protectedroute>
                  <AllTaskPage />
                </Protectedroute>
              </Suspense>
            }
          />
          <Route
            path="/app/alltask/:id/:name"
            element={
              <Suspense fallback={<Loader />}>
                <Protectedroute>
                  <TaskViewPage />
                </Protectedroute>
              </Suspense>
            }
          />
          <Route
            path="/app/alltask/newtask"
            element={
              <Suspense fallback={<Loader />}>
                <Protectedroute>
                  <AddTaskPage />
                </Protectedroute>
              </Suspense>
            }
          />
          <Route
            path="/app/admin"
            element={
              <Suspense fallback={<Loader />}>
                <Protectedroute>
                  {user?.role === "admin" ? (
                    <DashBoard />
                  ) : (
                    <p>You are not authorized for this Page</p>
                  )}
                </Protectedroute>
              </Suspense>
            }
          />
          <Route
            path="/app/auth/signup"
            element={
              <Suspense fallback={<Loader />}>
                <SignUpPage />
              </Suspense>
            }
          />
          <Route
            path="/app/auth/signin"
            element={
              <Suspense fallback={<Loader />}>
                <SignInPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loader />}>
                <ErrorPage />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
      <TostMessage />
    </>
  );
}

export default App;
