import express from 'express';
import * as paramValidation from './paramValidation';
import * as methods from './index';
import { validateResults, setDatabase } from 'middlewares';

const router = express.Router();

router
  .route('/')
  .get(setDatabase, paramValidation.list, validateResults, methods.list);

router
  .route('/:id')
  .get(
    setDatabase,
    paramValidation.getOrderById,
    validateResults,
    methods.getOrderById,
  )
  .put(setDatabase, paramValidation.update, validateResults, methods.update);

export default router;
