import express from 'express';
import * as paramValidation from './paramValidation';
import * as methods from './index';
import { validateResults, setDatabase, isAuth } from 'middlewares';

const router = express.Router();

router
  .route('/')
  .get(
    setDatabase,
    isAuth,
    paramValidation.list,
    validateResults,
    methods.list,
  );

router
  .route('/:id')
  .get(
    setDatabase,
    isAuth,
    paramValidation.getOrderById,
    validateResults,
    methods.getOrderById,
  )
  .put(
    setDatabase,
    isAuth,
    paramValidation.update,
    validateResults,
    methods.update,
  );

export default router;
