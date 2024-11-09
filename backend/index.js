import express from "express";
import config from "./src/utils/config.js";
import cors from "cors";
import AppRoutes from "./src/routes/index.js";

const app = express();

const corsOptions = {
  origin:
    "https://online-personalized-fitness-class-booking-platform-fit-pro.vercel.app", // Remove trailing slash
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies to be sent with cross-origin requests
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "5mb" }));

app.use(AppRoutes);

app.listen(config.PORT, () =>
  console.log(`Server listening on port ${config.PORT}`)
);
