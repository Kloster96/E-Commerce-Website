import { Router } from 'express';
import sneakerRoutes from './sneakerRoutes';
import paymentRoutes from './paymentRoutes';
import productRoutes from './productRoutes';
import galleryRoutes from './galleryRoutes';

const router = Router();

router.use('/api/sneakers', sneakerRoutes);
router.use('/api/products', productRoutes);
router.use('/api/payment', paymentRoutes);
router.use('/api/gallery', galleryRoutes);

export default router;
