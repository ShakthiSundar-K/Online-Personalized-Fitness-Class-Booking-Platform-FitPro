import express from "express";
import authController from "../controller/authController.js";
import userController from "../controller/userController.js";
import verifyAuth from "../middleware/verifyAuth.js";
const router = express.Router();

// Authentication Routes
router.post("/createUser", authController.createUser);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword", authController.resetPassword);
// User Profile Management
router.put("/editUserProfile", verifyAuth, userController.editUserProfile);
router.delete(
  "/deleteUserAccount",
  verifyAuth,
  userController.deleteUserAccount
);
// Class Booking Routes
router.post("/bookClass/:classId", verifyAuth, userController.bookClass);
router.get("/viewBookedClasses", verifyAuth, userController.viewBookedClasses);
router.post(
  "/cancelBooking/:bookingId",
  verifyAuth,
  userController.cancelBooking
);
// Feedback Routes
router.post(
  "/submitFeedback/:classId",
  verifyAuth,
  userController.submitFeedback
);
// Trainer Management
router.get("/viewAllTrainers", verifyAuth, userController.viewAllTrainers);
router.get(
  "/viewTrainerById/:userId",
  verifyAuth,
  userController.viewTrainerById
);
router.get("/viewAllClasses", verifyAuth, userController.viewAllClasses);
router.get("/filterClasses", verifyAuth, userController.filterClasses);
router.get(
  "/searchClassesByName",
  verifyAuth,
  userController.searchClassesByName
);
router.get("/filterTrainers", verifyAuth, userController.filterTrainers);
router.get(
  "/searchTrainerByName",
  verifyAuth,
  userController.searchTrainerByName
);

export default router;
