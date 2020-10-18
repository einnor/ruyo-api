import { Request, Response, NextFunction } from 'express';

import Api from 'lib/Api';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { perPage = 10, page = 1 } = req.query;

  try {
    // TODO Fetch orders from firebase and return response
    const data = [
      {
        id: '1',
        title: 'Test',
        bookingDate: '12/12/2020',
        address: '86-10300, Kerugoya',
        customer: 'John Doe',
      },
      {
        id: '2',
        title: 'Test 2',
        bookingDate: '13/12/2020',
        address: '86-10300, Kerugoya',
        customer: 'Jane Doe',
      },
    ];
    return res.json({ data, count: 1 });
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
    return res.json({ data });
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
    return res.json({ data: { ...data, title, bookingDate } });
  } catch (exception) {
    return Api.internalError(req, res, exception);
  }
};
