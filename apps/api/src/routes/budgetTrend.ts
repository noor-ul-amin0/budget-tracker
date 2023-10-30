import { Router } from 'express';
import { getBudgetTrends } from '../controllers/budgetTrend';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.use(authMiddleware);

router.route('/').get(getBudgetTrends);

export default router;
