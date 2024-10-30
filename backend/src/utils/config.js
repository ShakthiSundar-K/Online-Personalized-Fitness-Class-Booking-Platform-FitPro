import "dotenv/config";

export default {
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_URL: process.env.DB_URL,
  SALT: Number(process.env.SALT),
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};
