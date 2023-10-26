import { Router } from 'express';
import {
  createEntry,
  updateEntry,
  deleteEntry,
  getEntries,
} from '../controllers/budgetEntry';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.use(authMiddleware);

router.route('/').get(getEntries).post(createEntry);
router.route('/:entryId').put(updateEntry).delete(deleteEntry);

export default router;
