import mongoose from "mongoose";
import config from "../utils/config.js";

main().catch((error) => console.error("MongoDB Connection Failed", error));

async function main() {
  console.log(`${config.DB_URL}/${config.DB_NAME}`);
  await mongoose.connect(`${config.DB_URL}/${config.DB_NAME}`);
  console.log("MongoDB Connected!");
}

export default mongoose;
