import express from 'express';
import { enterFlash } from '../controllers/flashcontroller.js';

const router = express.Router();

router.post('/enterFlash', enterFlash);

export default router; 