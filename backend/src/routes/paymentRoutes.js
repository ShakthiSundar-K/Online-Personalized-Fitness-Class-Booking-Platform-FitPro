import express from "express";
const router = express.Router();
import paymentController from "../controller/paymentController.js";

router.post("/create-payment/:classId", paymentController.createPayment);
router.post("/payment-success", paymentController.paymentAndBookingSuccess);

export default router;
