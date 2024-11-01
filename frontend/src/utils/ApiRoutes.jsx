const ApiRoutes = {
  LOGIN: {
    path: "/users/login",
    authenticate: false,
  },
  SIGNUP: {
    path: "/users/createUser",
    authenticate: false,
  },
  ForgotPassword: {
    path: "/users/forgotPassword",
    authenticate: false,
  },
  RESETPASSWORD: {
    path: "/users/resetPassword",
    authenticate: false,
  },
  VIEW_ALL_CLASSES: {
    path: "/users/viewAllClasses",
    authenticate: true,
  },
};

export default ApiRoutes;
