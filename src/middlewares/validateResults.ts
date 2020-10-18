import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import status from 'http-status';

const validateResults = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(status.UNPROCESSABLE_ENTITY)
      .json({ errors: errors.array() });
  }
  return next();
};

export default validateResults;
