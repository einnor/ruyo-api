import { Request, Response, NextFunction } from 'express';

const devRequestLogger = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== 'development') {
    return next();
  }

  console.log(
    `\n\REQUEST:\n\n${req.method} ${req.path} \
    \n  headers: ${JSON.stringify(req.headers)} \
    \n  params: ${JSON.stringify(req.params)} \
    \n  query: ${JSON.stringify(req.query)} \
    \n  body: ${JSON.stringify(req.body)} \
    \n-> \
    \n${res.statusCode} ${res.statusMessage}
    \n\n\n`,
  );
  next();
};

export default devRequestLogger;
