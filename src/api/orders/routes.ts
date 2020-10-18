import express from 'express';
import * as paramValidation from './paramValidation';
import * as methods from './index';
import { validateResults } from 'middlewares';

const router = express.Router();

router.route('/').get(paramValidation.list, validateResults, methods.list);

router
  .route('/:id')
  .get(paramValidation.getOrderById, validateResults, methods.getOrderById)
  .put(paramValidation.update, validateResults, methods.update);

export default router;
