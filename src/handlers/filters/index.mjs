import { Router } from 'express';
import multer from 'multer';
import applyFiltersHandler from './applyFiltersHandler.mjs';

const router = Router();
router.get('/', (req, res) => {
  res.send('ok images GET');
});
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post('/', upload.array('images[]'), applyFiltersHandler);

export default router;
