import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import {
  calculateBudgetStats,
  editBudgetLimit,
  getBudgetLimit,
} from '../controllers/user';

const router = Router();

router.use(authMiddleware);

router.route('/budget-limit').get(getBudgetLimit).put(editBudgetLimit);
router.get('/budget-stats', calculateBudgetStats);

export default router;
