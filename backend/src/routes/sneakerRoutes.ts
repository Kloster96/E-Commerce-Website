import { Router } from 'express';
import { getSneakers, getSneakerById, createSneaker, updateSneaker, deleteSneaker } from '../controllers';

const router = Router();

router.get('/', getSneakers);
router.get('/:id', getSneakerById);
router.post('/', createSneaker);
router.put('/:id', updateSneaker);
router.delete('/:id', deleteSneaker);

export default router;
