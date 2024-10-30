import bcrypt from "bcryptjs";
import config from "./config.js";
import jwt from "jsonwebtoken";

const hashData = async (str) => {
  let salt = await bcrypt.genSalt(config.SALT);
  let hash = await bcrypt.hash(str, salt);
  return hash;
};

const compareHash = async (hash, str) => {
  return await bcrypt.compare(str, hash);
};

const createToken = (payload) => {
  let token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRY,
  });
  return token;
};

const decodeToken = (token) => {
  return jwt.decode(token);
};

export default {
  hashData,
  compareHash,
  createToken,
  decodeToken,
};
