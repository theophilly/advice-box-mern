import { check } from 'express-validator';

export const advicevalidator = [
  check('title').notEmpty().withMessage('Sorry title is required'),
  check('category').notEmpty().withMessage('category is required'),
  check('content').notEmpty().withMessage('content is required'),
];

export const signUpValidator = [
  check('userName').notEmpty().withMessage('Sorry username is required'),
  check('password').notEmpty().withMessage('Sorry password is required'),
];
