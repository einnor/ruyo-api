import { param, header } from 'express-validator';

export const getUserById = [
  header('Authorization')
    .exists()
    .withMessage('Authorization field is missing in the headers')
    .isString()
    .withMessage('Authorization header should be a string'),
  param('id')
    .exists()
    .withMessage('ID is missing from params')
    .isAlphanumeric()
    .withMessage('ID should be a alphanumeric'),
];
