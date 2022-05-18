import express from 'express';

const router = express.Router();

import pressButtons from './press-button-routes';
router.use('/pressButtons', pressButtons);

export default router;
