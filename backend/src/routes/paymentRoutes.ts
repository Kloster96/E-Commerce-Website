import { Router } from 'express';
import {
  createPaymentPreference,
  handleWebhook,
  paymentSuccess,
  paymentFailure,
  paymentPending,
} from '../controllers/PaymentController';

const router = Router();

router.post('/create-preference', createPaymentPreference);
router.post('/webhook', handleWebhook);
router.get('/success', paymentSuccess);
router.get('/failure', paymentFailure);
router.get('/pending', paymentPending);

export default router;
