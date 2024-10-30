import express from "express";
import config from "./src/utils/config.js";
import cors from "cors";
import AppRoutes from "./src/routes/index.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.use(AppRoutes);

app.listen(config.PORT, () => console.log(`Server listening ${config.PORT}`));
