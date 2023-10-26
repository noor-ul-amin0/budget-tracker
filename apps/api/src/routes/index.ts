import { Router } from 'express';
import authRouter from './auth';
import budgetEntriesRouter from './budgetEntries';
import budgetTrendRouter from './budgetTrend';

const router = Router();

router.use('/auth', authRouter);
router.use('/budget-entries', budgetEntriesRouter);
router.use('/budget-trends', budgetTrendRouter);

export default router;
