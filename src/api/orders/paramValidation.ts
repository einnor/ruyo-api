import { body, param, header, query } from 'express-validator';

export const list = [
  header('Authorization')
    .exists()
    .withMessage('Authorization field is missing in the headers')
    .isString()
    .withMessage('Authorization header should be a string'),
  query('perPage')
    .optional()
    .isInt()
    .withMessage('perPage should be an integer')
    .toInt(),
  query('page')
    .optional()
    .isInt()
    .withMessage('Page should be an integer')
    .toInt(),
];

export const getOrderById = [
  header('Authorization')
    .exists()
    .withMessage('Authorization field is missing in the headers')
    .isString()
    .withMessage('Authorization header should be a string'),
  param('id')
    .exists()
    .withMessage('ID is missing from params')
    .isUUID()
    .withMessage('ID should be a uuid'),
];

export const update = [
  header('Authorization')
    .exists()
    .withMessage('Authorization field is missing in the headers')
    .isString()
    .withMessage('Authorization header should be a string'),
  param('id')
    .exists()
    .withMessage('ID is missing from params')
    .isUUID()
    .withMessage('ID should be a uuid'),
  body('title')
    .exists()
    .withMessage('Title is missing from the body')
    .isString()
    .withMessage('Title should be a string'),
  body('bookingDate')
    .exists()
    .withMessage('Booking date is missing from the body')
    .isDate()
    .withMessage('Booking date should be a date'),
];
