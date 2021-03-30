import express from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
import { signUpValidator } from "../validators/index.js";

const route = express.Router();

route.post("/signin", signUpValidator, async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      message: result.array()[0].msg,
    });
  }
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName });

    if (user) {
      if (user.authenticate(password)) {
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "10h" }
        );
        res.cookie("token", token, { expiresIn: "10h" });
        return res.status(200).json({ token, user });
      } else {
        return res.status(400).json({ message: "incorrect password" });
      }
    } else {
      return res.status(400).json({ message: "User does not exist" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

route.post("/signout", async (req, res) => {
  res.clearCookie();
  return res.status(200).json({ message: "You have logout successfully" });
});

route.post("/signup", signUpValidator, async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      message: result.array()[0].msg,
    });
  }

  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ message: "Username already exist" });
    }

    const newUser = await new User({ userName, password });

    newUser.save((error, newuser) => {
      if (newuser) {
        res.status(200).json({
          user: newUser,
        });
      } else {
        res.status(400).json({ message: error.message });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default route;
