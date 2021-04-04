import mongoose from 'mongoose';

import Advice from '../models/adviceModel.js';
import { validationResult } from 'express-validator';

export const getAllAdvice = async (req, res) => {
  try {
    const allAdvices = await Advice.find({});

    if (allAdvices) {
      return res.status(200).json(allAdvices);
    } else {
      return res.status(400).json({ message: 'something went wrong' });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const createAdvice = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      message: result.array()[0].msg,
    });
  }

  const { title, category, content, userName } = req.body;

  const checkAdvice = await Advice.findOne({
    title,
    category,
    content,
  });

  if (checkAdvice) {
    return res.status(400).json({ message: 'advice already exist' });
  }

  try {
    const newAdvice = new Advice({
      title: title,
      category: category,
      content: content,
      userId: req.user.id,
      userName: userName,
    });

    await newAdvice.save((error, data) => {
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(200).json({ advice: data });
    });
  } catch (error) {
    return res.status(400).json({ message: 'something went wrong' });
  }
};

export const updateAdvice = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      message: result.array()[0].msg,
    });
  }
  const { title, category, content, userName } = req.body;

  const advice = await Advice.findOne({
    _id: req.params.id,
  });

  try {
    if (advice) {
      await advice.set({ title, userName, category, content });
      await advice.save();

      return res
        .status(200)
        .json({ message: 'advice updated sucessfully', advice });
    } else {
      return res.status(400).json({ message: 'something went wrong' });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteAdvice = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'invalid advice id' });
  }

  const advice = await Advice.findOne({
    _id: req.params.id,
  });

  try {
    if (advice) {
      await Advice.findOneAndDelete({
        _id: req.params.id,
      });
      return res.status(200).json({ message: 'advice deleted sucessfully' });
    } else {
      return res.status(400).json({ message: 'something went wrong' });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
