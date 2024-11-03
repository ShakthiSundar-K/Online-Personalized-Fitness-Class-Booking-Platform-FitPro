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
  CANCEL_BOOKING: {
    path: "/users/cancelBooking/:classId",
    authenticate: true,
  },
  VIEW_MY_CLASSES: {
    path: "/users/viewBookedClasses",
    authenticate: true,
  },
  VIEW_ALL_TRAINERS: {
    path: "/users/viewAllTrainers",
    authenticate: true,
  },
  VIEW_FILTERED_TRAINERS: {
    path: "/users/filterTrainers",
    authenticate: true,
  },
  SEARCH_TRAINERS: {
    path: "/users/searchTrainerByName",
    authenticate: true,
  },
  VIEW_TRAINER_BY_ID: {
    path: "/users/viewTrainerById/:userId",
    authenticate: true,
  },
  GET_USER_INFO_BY_ID: {
    path: "/users/getUserInfoById/:userId",
    authenticate: true,
  },
  EDIT_USER_PROFILE: {
    path: "/users/editUserProfile/:userId",
    authenticate: true,
  },
};

export default ApiRoutes;
