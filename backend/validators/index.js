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
export const mailValidator = [
  check('subject').notEmpty().withMessage('Sorry subject is required'),
  check('email')
    .notEmpty()
    .withMessage('Sorry email is required')
    .bail()
    .isEmail()
    .withMessage('Sorry password is required'),
  check('content').notEmpty().withMessage('Sorry content is required'),
];
