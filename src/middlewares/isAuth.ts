import { Request, Response, NextFunction } from 'express';
import Api from 'lib/Api';
import { IDB } from 'types';

const isAuth = (req: Request & IDB, res: Response, next: NextFunction) => {
  const tokenWithBearer = req.headers.authorization || '';
  const token = tokenWithBearer.split(' ')[1];

  if (!token) {
    return Api.unauthorized(req, res, 'This request is unauthenticated.');
  }

  req.db
    .auth()
    .verifyIdToken(token)
    .then(function (decodedToken) {
      const uid = decodedToken.uid;
      // TODO Set the user's ID for use else where if we need to track who did what
    })
    .catch(function (error) {
      // Handle error
      return Api.unauthorized(req, res, 'This request is unauthenticated.');
    });
  return next();
};

export default isAuth;
