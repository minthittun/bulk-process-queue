import express from 'express';
import { sendSMSController } from '../controllers/smsController.js';

const router = express.Router();

// Endpoint to send SMS
router.post('/send-sms', sendSMSController);

export default router;
