import auth from "../utils/auth.js";
import userModel from "../model/user.js";

const verifyAdmin = async (req, res, next) => {
  let token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    let payload = auth.decodeToken(token);
    let user = await userModel.findOne({
      id: payload.id,
      email: payload.email,
      role: payload.role,
    });
    if (user && user.role === "admin") next();
    else
      res.status(401).send({ message: "You don't have access! Contact Admin" });
  } else
    res.status(401).send({
      message: "No Token Found",
    });
};

export default verifyAdmin;
