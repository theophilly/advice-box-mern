import express from "express";
import { validationResult } from "express-validator";
import User from "../models/userModel.js";
import { signUpValidator } from "../validators/index.js";

const route = express.Router();

route.post("/signin", async (req, res) => {});

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
