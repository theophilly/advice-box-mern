import express, { Router } from "express";
import mongoose from "mongoose";
import Advice from "../models/adviceModel.js";
import { validationResult } from "express-validator";
import { advicevalidator } from "../validators/index.js";

const route = express.Router();

route.get("/advice/get-all-advice", async (req, res) => {
  try {
    const allAdvices = await Advice.find({});

    if (allAdvices) {
      return res.status(200).json(allAdvices);
    } else {
      return res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

route.post("/advice/create-advice", advicevalidator, async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      message: result.array()[0].msg,
    });
  }
  const { title, category, content } = req.body;

  const checkAdvice = await Advice.findOne({ title, category, content });

  if (checkAdvice) {
    return res.status(400).json({ message: "advice already exist" });
  }

  try {
    const newAdvice = new Advice({
      title,
      category,
      content,
    });

    await newAdvice.save((error, data) => {
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(200).json({ advice: data });
    });
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
});

route.put("/advice/update/:id", async (req, res) => {
  const advice = await Advice.findOne({
    _id: req.params.id,
  });
  console.log(advice);

  //mongoose.Types.ObjectId(req.params.id)

  try {
    if (advice) {
      await Advice.findOneAndDelete({
        _id: req.params.id,
      });
      return res.status(200).json({ message: "advice deleted sucessfully" });
    } else {
      return res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

route.delete("/advice/delete/:id", async (req, res) => {
  const advice = await Advice.findOne({
    _id: req.params.id,
  });
  console.log(advice);

  //mongoose.Types.ObjectId(req.params.id)

  try {
    if (advice) {
      await Advice.findOneAndDelete({
        _id: req.params.id,
      });
      return res.status(200).json({ message: "advice deleted sucessfully" });
    } else {
      return res.status(400).json({ message: "something went wrong" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default route;
