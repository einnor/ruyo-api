import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import Api from 'lib/Api';
import { IDB } from 'types';

export const getUserById = async (
  req: Request & IDB,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const document = req.db.firestore().collection('users').doc(id);
    const user = await document.get();
    const response = user.data();

    return res.status(httpStatus.OK).json(response);
  } catch (exception) {
    return Api.internalError(req, res, exception);
  }
};
