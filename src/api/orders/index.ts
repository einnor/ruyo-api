import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import DB from 'db';
import Api from 'lib/Api';
import { Order } from './types';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!DB.database) {
      return Api.internalError(
        req,
        res,
        'There was a problem connecting to the database.',
      );
    }

    const db = DB.database.firestore();

    const query = db.collection('orders');
    const response: Order[] = [];
    await query.get().then((querySnapshot) => {
      const docs = querySnapshot.docs;
      for (let doc of docs) {
        const item = {
          id: doc.id,
          title: doc.data().title,
          bookingDate: doc.data().bookingDate,
          address: doc.data().address,
          customer: doc.data().customer,
        };
        response.push(item);
      }
    });

    return res.status(httpStatus.OK).json(response);
  } catch (exception) {
    return Api.internalError(req, res, exception);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    // TODO Fetch order from firebase and return response
    const data = {
      id: '1',
      title: 'Test',
      bookingDate: '12/12/2020',
      address: '86-10300, Kerugoya',
      customer: 'John Doe',
    };
    return res.status(httpStatus.OK).json({ data });
    return;
  } catch (exception) {
    return Api.internalError(req, res, exception);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { title, bookingDate } = req.body;
  const data = {
    id: '1',
    title: 'Test',
    bookingDate: '12/12/2020',
    address: '86-10300, Kerugoya',
    customer: 'John Doe',
  };
  try {
    // TODO Update order and return response
    return res
      .status(httpStatus.CREATED)
      .json({ data: { ...data, title, bookingDate } });
  } catch (exception) {
    return Api.internalError(req, res, exception);
  }
};
