import { Router } from 'express';
import {
  getSliderImages,
  getGalleryImages,
  getAllGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  toggleGalleryImage,
} from '../controllers/GalleryController';

const router = Router();

router.get('/slider', getSliderImages);
router.get('/gallery', getGalleryImages);
router.get('/all', getAllGalleryImages);
router.post('/', createGalleryImage);
router.put('/:id', updateGalleryImage);
router.delete('/:id', deleteGalleryImage);
router.patch('/:id/toggle', toggleGalleryImage);

export default router;
