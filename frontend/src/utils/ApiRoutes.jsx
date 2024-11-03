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
  VIEW_FILTERED_CLASSES: {
    path: "/users/filterClasses",
    authenticate: true,
  },
  VIEW_SEARCHED_CLASSES: {
    path: "/users/searchClassesByName",
    authenticate: true,
  },
  CREATE_PAYPAL_PAYMENT: {
    path: "/payment/create-payment/:classId",
    authenticate: true,
  },
  CONFIRM_PAYMENT_AND_BOOK_CLASS: {
    path: "/payment/payment-success",
    authenticate: true,
  },
  VIEW_MY_CLASSES: {
    path: "/users/viewBookedClasses",
    authenticate: true,
  },
};

export default ApiRoutes;
