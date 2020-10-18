import express, { Router } from 'express';

import orders from './orders/routes';

const router: Router = express.Router();

router.use('/orders', orders);

module.exports = router;
