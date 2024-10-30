import express from "express";
import adminController from "../controller/adminController.js";
import verifyAuth from "../middleware/verifyAuth.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
const router = express.Router();

router.get(
  "/viewAllUsers",
  verifyAuth,
  verifyAdmin,
  adminController.viewAllUsers
);
router.get(
  "/viewAllTrainers",
  verifyAuth,
  verifyAdmin,
  adminController.viewAllTrainers
);
router.delete(
  "/deleteUser/:userId",
  verifyAuth,
  verifyAdmin,
  adminController.deleteUser
);
router.get(
  "/viewTransactionTotal",
  verifyAuth,
  verifyAdmin,
  adminController.viewTransactionTotal
);
router.get(
  "/viewActivityLogs",
  verifyAuth,
  verifyAdmin,
  adminController.viewActivityLogs
);
router.get(
  "/viewClassManagementInsights",
  verifyAuth,
  verifyAdmin,
  adminController.viewClassManagementInsights
);
router.get(
  "/generateSummaryReport",
  verifyAuth,
  verifyAdmin,
  adminController.generateSummaryReport
);

export default router;
