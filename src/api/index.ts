import express, { Router } from 'express';

import orders from './orders/routes';
import users from './users/routes';

const router: Router = express.Router();

router.use('/orders', orders);
router.use('/users', users);

export default router;
