import { Navigate } from "react-router-dom";
import SignIn from "../components/auth/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "../components/auth/SignUp";
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";
import Home from "../routes/common/Home";
import TrainerGuard from "./TrainerGuard";
import About from "../routes/common/About";
import Services from "../routes/common/Services";
import Classes from "../routes/user/Classes";
import Class from "../routes/trainer/Class";
import Trainers from "../routes/user/Trainers";
import AdminGuard from "./AdminGuard";
import UserManagement from "../routes/admin/UserManagement";
import TrainerManagement from "../routes/admin/TrainerManagement";
import ClassManagement from "../routes/admin/ClassManagement";
import PaymentSuccess from "../routes/common/PaymentSuccess";
import TrainerInfo from "../components/trainer/TrainerInfo";

const AppRoutes = [
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/resetpassword/:token",
    element: <ResetPassword />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/about",
    element: (
      <ProtectedRoute>
        <About />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/classes",
    element: (
      <ProtectedRoute>
        <Classes />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/trainers",
    element: (
      <ProtectedRoute>
        <Trainers />
      </ProtectedRoute>
    ),
  },
  {
    path: "/services",
    element: (
      <ProtectedRoute>
        <Services />
      </ProtectedRoute>
    ),
  },
  {
    path: "/paymentsuccess",
    element: (
      <ProtectedRoute>
        <PaymentSuccess />
      </ProtectedRoute>
    ),
  },
  {
    path: "/viewTrainerById/:userId",
    element: (
      <ProtectedRoute>
        <TrainerInfo />
      </ProtectedRoute>
    ),
  },
  {
    path: "/trainer/class",
    element: (
      <ProtectedRoute>
        <TrainerGuard>
          <Class />
        </TrainerGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <ProtectedRoute>
        <AdminGuard>
          <UserManagement />
        </AdminGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/trainers",
    element: (
      <ProtectedRoute>
        <AdminGuard>
          <TrainerManagement />
        </AdminGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/classes",
    element: (
      <ProtectedRoute>
        <AdminGuard>
          <ClassManagement />
        </AdminGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to='/' />,
  },
];

export default AppRoutes;
