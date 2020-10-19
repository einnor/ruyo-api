import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import Api from 'lib/Api';
import { IDB } from 'types';
import { Order } from './types';

export const list = async (
  req: Request & IDB,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = req.db.firestore().collection('orders');
    const response: Order[] = [];
    await query.get().then((querySnapshot) => {
      const docs = querySnapshot.docs;
      for (let doc of docs) {
        const order = {
          id: doc.id,
          title: doc.data().title,
          bookingDate: doc.data().bookingDate,
          address: doc.data().address,
          customer: doc.data().customer,
        };
        response.push(order);
      }
    });

    return res.status(httpStatus.OK).json(response);
  } catch (exception) {
    return Api.internalError(req, res, exception);
  }
};

export const getOrderById = async (
  req: Request & IDB,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const document = req.db.firestore().collection('orders').doc(id);
    const order = await document.get();
    const response = order.data();
    if (response) {
      response.id = id;
    }

    return res.status(httpStatus.OK).json(response);
  } catch (exception) {
    return Api.internalError(req, res, exception);
  }
};

export const update = async (
  req: Request & IDB,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { title, bookingDate } = req.body;

  const isBookingDateValid = new Date(bookingDate).getTime() > 0;
  if (!isBookingDateValid) {
    return Api.badRequest(req, res, 'An invalid booking date was provided.');
  }
  try {
    const document = req.db.firestore().collection('orders').doc(id);
    const order = await document.get();
    await document.update({
      title,
      bookingDate,
    });
    const updatedOrder = { ...order.data(), id, title, bookingDate };
    return res.status(httpStatus.CREATED).json(updatedOrder);
  } catch (exception) {
    return Api.internalError(req, res, exception);
  }
};
