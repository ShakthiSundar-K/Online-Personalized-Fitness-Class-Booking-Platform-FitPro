import express from "express";
import userRoutes from "./usersRoutes.js";
import trainerRoutes from "./trainerRoutes.js";
import adminRoutes from "./adminRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
const router = express.Router();

router.use("/users", userRoutes);
router.use("/trainers", trainerRoutes);
router.use("/admin", adminRoutes);
router.use("/payment", paymentRoutes);

export default router;
