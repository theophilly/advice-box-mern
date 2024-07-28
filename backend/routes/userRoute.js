import express from "express";
import { config } from "dotenv";
import aws from "aws-sdk";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import multer from "multer";
import multerS3 from "multer-s3";
import shortid from "shortid";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: config().parsed.AWS_ACCESS_KEY_ID,
    secretAccessKey: config().parsed.AWS_SECRET_ACCESS_KEY,
  },
});

import User from "../models/userModel.js";
import { signUpValidator } from "../validators/index.js";
import { ensureLogin, userLoginMiddleware } from "../middlewares/auth.js";

const route = express.Router();
aws.config.update({ region: "us-east-2" });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "advicebox",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "file" });
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  }),
});

route.post("/signin", signUpValidator, async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      message: result.array()[0].msg,
    });
  }
  const { userName: username, password } = req.body;

  let userName = username.toLowerCase();

  try {
    const user = await User.findOne({ userName });

    if (user) {
      if (user.authenticate(password)) {
        const token = jwt.sign(
          {
            id: user._id,
            role: user.role,
            profilePicture: user.profilePicture,
          },
          process.env.JWT_SECRET,
          { expiresIn: "4h" }
        );
        res.cookie("token", token, { expiresIn: "4h" });
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
route.get("/getuser/:userName", async (req, res) => {
  const userName = req.params.userName;

  try {
    const user = await User.findOne({ userName }).select(
      "userName profilePicture about"
    );

    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(400).json({ message: "user" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// upload.single('file'),

route.post(
  "/updateuser",
  ensureLogin,
  userLoginMiddleware,
  upload.single("file"),
  async (req, res) => {
    console.log(req.file);

    let user = null;

    try {
      user = await User.findOne({ _id: req.user.id });
    } catch (error) {
      return res.status(400).json({
        message: "something went wrong",
        error: error.message,
      });
    }

    if (user) {
      let deletePicture = user.profilePicture;

      try {
        await user.set({
          about: req.body.about,
          profilePicture: req.file.key,
        });
        await user.save();
      } catch (error) {
        return res.status(400).json({
          message: "something went wrong",
          error: error.message,
        });
      }

      if (deletePicture !== "" && deletePicture !== req.file.key) {
        try {
          const command = new DeleteObjectCommand({
            Bucket: "advicebox",
            Key: deletePicture,
          });
          await s3.send(command);
        } catch (err) {
          console.log(err);
          return res.status(400).json({
            message: "something went wrong",
            error: err.message,
          });
        }
      }
    }

    return res.status(200).json({ user, message: "updated successfully" });
  }
);

route.post("/signup", signUpValidator, async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      message: result.array()[0].msg,
    });
  }

  const { userName: username, password } = req.body;

  let userName = username.toLowerCase();

  try {
    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ message: "Username already exist" });
    }

    const newUser = await new User({ userName, password });

    newUser.save((error, newuser) => {
      if (newuser) {
        const token = jwt.sign(
          {
            id: newuser._id,
            role: newuser.role,
            profilePicture: newuser.profilePicture,
          },
          process.env.JWT_SECRET,
          { expiresIn: "4h" }
        );
        res.cookie("token", token, { expiresIn: "4h" });
        return res.status(200).json({ token, user: newuser });
      } else {
        return res.status(400).json({ message: error.message });
      }
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default route;
