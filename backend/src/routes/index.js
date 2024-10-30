import express from "express";
import userRoutes from "./usersRoutes.js";
import trainerRoutes from "./trainerRoutes.js";
import adminRoutes from "./adminRoutes.js";
const router = express.Router();

router.use("/users", userRoutes);
router.use("/trainers", trainerRoutes);
router.use("/admin", adminRoutes);

export default router;
