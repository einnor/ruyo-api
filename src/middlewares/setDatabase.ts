import { Request, Response, NextFunction } from 'express';
import DB from 'db';
import Api from 'lib/Api';
import { IDB } from 'types';

const setDatabase = (req: Request & IDB, res: Response, next: NextFunction) => {
  if (!DB.database) {
    return Api.internalError(
      req,
      res,
      'There was a problem connecting to the database.',
    );
  }
  req.db = DB.database;
  return next();
};

export default setDatabase;
