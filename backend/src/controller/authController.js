import usersModel from "../model/user.js";
import auth from "../utils/auth.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { sendEmail } from "../service/emailService.js";

const createUser = async (req, res) => {
  try {
    let user = await usersModel.findOne({ email: req.body.email });
    if (!user) {
      // Hash the password
      req.body.password = await auth.hashData(req.body.password);

      // Create the user and store the result in a variable to access the ID
      const newUser = await usersModel.create(req.body);

      // Send welcome email
      await sendEmail(
        req.body.email,
        "Welcome to FitPro",
        "Thank you for creating an account with us. We're excited to have you on board!"
      );

      // Respond with success message and new user's ID
      res.status(201).send({
        message: "User Created Successfully",
        userId: newUser.id, // Include userId in the response
      });
    } else {
      res
        .status(400)
        .send({ message: `User with ${req.body.email} already exists!` });
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await usersModel.findOne({ email: email });
    if (user) {
      //compare password
      if (await auth.compareHash(user.password, password)) {
        //create token
        const token = auth.createToken({
          email: user.email,
          name: user.name,
          role: user.role,
          id: user.id,
        });
        res.status(200).send({
          message: "Login Successfull",
          role: user.role,
          token,
          id: user.id,
        });
      } else {
        res.status(400).send({
          message: "Incorrect Password",
        });
      }
    } else {
      res.status(400).send({
        message: `User with email ${req.body.email} does not exists`,
      });
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await usersModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Set the token and expiry on the user document (store in database)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Create reset URL
    const resetUrl = `https://fitpro270.vercel.app/resetpassword/${resetToken}`;

    // Send email with the reset link
    await sendEmail(
      user.email,
      "Password Reset Request",
      `To reset your password, click the link below:\n\n${resetUrl}`
    );

    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to reset password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find user with the reset token and check if it has expired
    const user = await usersModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }, // Check if the token is still valid
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password before saving
    user.password = await auth.hashData(newPassword);
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpire = undefined; // Clear the expiry
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createUser,
  login,
  forgotPassword,
  resetPassword,
};
