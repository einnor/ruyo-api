import express from 'express';
import * as paramValidation from './paramValidation';
import * as methods from './index';
import { validateResults, setDatabase, isAuth } from 'middlewares';

const router = express.Router();

router
  .route('/:id')
  .get(
    setDatabase,
    isAuth,
    paramValidation.getUserById,
    validateResults,
    methods.getUserById,
  );

export default router;
