import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "./services/users";
import { signin } from "./store/auth";
import "./sass/style.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import CreationGuide from "./pages/CreationGuide/CreationGuide";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/Forgotpassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import TitleProject from "./pages/CreateProject/TitleProject/TitleProject";
import SettingsProject from "./pages/CreateProject/SettingsProject/SettingsProject";
import Register from "./pages/Admin/UserRegister/Register";
import DescriptionProject from "./pages/CreateProject/DescriptionProject/DescriptionProject";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import UserManager from "./pages/Admin/UserManager/UserManager";
import UserModify from "./pages/Admin/UserModify/UserModify";
import ProjectViewById from "./pages/projectViewById/projectViewById";
import SuiviProjet from "./pages/SuiviProjet/SuiviProjet";
import MonProfil from "./pages/MonProfil/MonProfil";
import ImpactProject from "./pages/CreateProject/ImpactProject/ImpactProject";
import JobManager from "./pages/Admin/JobManager/JobManger";
import JobRegister from "./pages/Admin/JobsRegister/JobsRegister";
import JobModify from "./pages/Admin/JobModify/JobModify";
import RoleManager from "./pages/Admin/RoleManager/RoleManager";
import RoleRegister from "./pages/Admin/RoleRegister/RoleRegister";
import RoleModify from "./pages/Admin/RoleModify/RoleModify";
import PostsManager from "./pages/Admin/PostsManager/PostsManager";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const reloadStore = async () => {
    try {
      const result = await getCurrentUser();
      dispatch(signin(result.data, { isLogged: true }));
      setVisible(true);
    } catch (error) {
      console.error(error);
      setVisible(true);
    }
  };

  useEffect(() => {
    reloadStore();
  }, []);

  return visible ? (
    <Router>
      <div>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/Guide"
            element={
              <PrivateRoute>
                <CreationGuide />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/forgotPassword"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/resetPassword"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/titleproject"
            element={
              <PrivateRoute>
                <TitleProject />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/monprofil"
            element={
              <PrivateRoute>
                <MonProfil />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/suiviprojet"
            element={
              <PrivateRoute>
                <SuiviProjet />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/admin"
            element={
              <PrivateRouteAdmin>
                <Dashboard />
              </PrivateRouteAdmin>
            }
          />
          <Route
            exact
            path="/admin/users"
            element={
              <PrivateRouteAdmin>
                <UserManager />
              </PrivateRouteAdmin>
            }
          />
          <Route
            exact
            path="/admin/jobs"
            element={
              <PrivateRouteAdmin>
                <JobManager />
              </PrivateRouteAdmin>
            }
          />
          <Route
            exact
            path="/admin/roles"
            element={
              <PrivateRouteAdmin>
                <RoleManager />
              </PrivateRouteAdmin>
            }
          />
          <Route
            exact
            path="/admin/posts"
            element={
              <PrivateRouteAdmin>
                <PostsManager />
              </PrivateRouteAdmin>
            }
          />
          <Route
            exact
            path="/admin/users/:id"
            element={
              <PrivateRouteAdmin>
                <UserModify />
              </PrivateRouteAdmin>
            }
          />
          <Route
            exact
            path="/admin/jobs/:id"
            element={
              <PrivateRouteAdmin>
                <JobModify />
              </PrivateRouteAdmin>
            }
          />
          <Route
            exact
            path="/admin/roles/:id"
            element={
              <PrivateRouteAdmin>
                <RoleModify />
              </PrivateRouteAdmin>
            }
          />
          <Route
            exact
            path="/admin/users/register"
            element={
              <PrivateRouteAdmin>
                <Register />
              </PrivateRouteAdmin>
            }
          />
          <Route
            exact
            path="/admin/jobs/register"
            element={
              <PrivateRouteAdmin>
                <JobRegister />
              </PrivateRouteAdmin>
            }
          />
          <Route
            exact
            path="/admin/roles/register"
            element={
              <PrivateRouteAdmin>
                <RoleRegister />
              </PrivateRouteAdmin>
            }
          />
          <Route
            exact
            path="/descriptionproject"
            element={
              <PrivateRoute>
                <DescriptionProject />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/settingsproject"
            element={
              <PrivateRouteAdmin>
                <SettingsProject />
              </PrivateRouteAdmin>
            }
          />
          <Route
            exact
            path="/impactproject"
            element={
              <PrivateRoute>
                <ImpactProject />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/projectview/:id"
            element={
              <PrivateRoute>
                <ProjectViewById />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  ) : (
    ""
  );
}

const admins = [
  0, //  => User
  1, //  => Admin
];

const PrivateRoute = ({ children, admin = 0 }) => {
  const auth = useSelector((state) => state.auth);
  if (auth.isLogged) {
    if (
      auth.user?.admin === admin ||
      admins.indexOf(auth.user?.admin) >= admins.indexOf(admin)
    ) {
      return children;
    }
    return <Navigate to="/" />;
  }
  return <Navigate to="/login" />;
};

const PrivateRouteAdmin = ({ children, admin = 1 }) => {
  const auth = useSelector((state) => state.auth);
  if (auth.isLogged) {
    if (auth.user?.admin === admin) {
      return children;
    }
    return <Navigate to="/" />;
  }
  return <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  if (!auth.isLogged || auth === undefined) {
    return children;
  }
  return <Navigate to="/" />;
};

export default App;
