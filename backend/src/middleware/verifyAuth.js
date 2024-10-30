import auth from "../utils/auth.js";

const verifyAuth = async (req, res, next) => {
  try {
    // Extract the token from the 'Authorization' header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "No Token Found" });
    }

    // Split the token and remove the "Bearer " part
    const token = authHeader.split(" ")[1];

    // Decode and verify the token
    const payload = auth.decodeToken(token);
    if (!payload) {
      return res.status(401).send({ message: "Invalid Token" });
    }

    // Check if the token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp <= currentTime) {
      return res.status(401).send({ message: "Session Expired" });
    }

    // Attach user data to the request object
    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };

    // Proceed to the next middleware/controller
    next();
  } catch (error) {
    console.error("Error in verifyAuth middleware:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export default verifyAuth;
