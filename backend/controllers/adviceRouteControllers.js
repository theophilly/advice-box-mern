import mongoose from 'mongoose';

import Advice from '../models/adviceModel.js';
import { validationResult } from 'express-validator';

export const getAllAdvice = async (req, res) => {
  try {
    const allAdvices = await Advice.find({});

    if (allAdvices) {
      return res.status(200).json({ allAdvices: allAdvices.reverse() });
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

    await newAdvice.save(async (error, data) => {
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const allAdvices = await Advice.find({});
      return res
        .status(200)
        .json({ advice: data, allAdvices: allAdvices.reverse() });
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
  const { title, category, content } = req.body;

  const advice = await Advice.findOne({
    _id: req.params.id,
  });

  try {
    if (advice) {
      await advice.set({ title, category, content });
      await advice.save();
      const allAdvices = await Advice.find({});

      return res.status(200).json({
        message: 'advice updated sucessfully',
        advice,
        allAdvices: allAdvices.reverse(),
      });
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
      const allAdvices = await Advice.find({});
      return res
        .status(200)
        .json({
          message: 'advice deleted sucessfully',
          allAdvices: allAdvices.reverse(),
        });
    } else {
      return res.status(400).json({ message: 'something went wrong' });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
