import { body, param, header, query } from 'express-validator';

export const list = [
  header('Authorization')
    .exists()
    .withMessage('Authorization field is missing in the headers')
    .isString()
    .withMessage('Authorization header should be a string'),
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
    .isAlphanumeric()
    .withMessage('ID should be a alphanumeric'),
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
    .isAlphanumeric()
    .withMessage('ID should be a alphanumeric'),
  body('title')
    .exists()
    .withMessage('Title is missing from the body')
    .isString()
    .withMessage('Title should be a string'),
  body('bookingDate')
    .exists()
    .withMessage('Booking date is missing from the body')
    .isNumeric()
    .withMessage('Booking date should be a unix timestamp'),
];
