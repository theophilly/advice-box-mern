import express from 'express';
import Advice from '../models/adviceModel.js';
import { validationResult } from 'express-validator';
import { advicevalidator } from '../validators/index.js';
import {
  getAllAdvice,
  createAdvice,
  deleteAdvice,
  updateAdvice,
} from '../controllers/adviceRouteControllers.js';
import { ensureLogin, userLoginMiddleware } from '../middlewares/auth.js';

const route = express.Router();

route.get('/advice/get-all-advice', getAllAdvice);

route.post(
  '/advice/create-advice',
  ensureLogin,
  userLoginMiddleware,
  advicevalidator,
  createAdvice
);

route.put(
  '/advice/update/:id',
  ensureLogin,
  userLoginMiddleware,
  advicevalidator,
  updateAdvice
);

route.delete(
  '/advice/delete/:id',
  ensureLogin,
  userLoginMiddleware,
  deleteAdvice
);

export default route;
