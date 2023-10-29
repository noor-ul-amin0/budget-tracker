import { Router } from 'express';
import authRouter from './auth';
import budgetEntriesRouter from './budgetEntries';
import budgetTrendRouter from './budgetTrend';
import userRouter from './user';

const router = Router();

router.use('/auth', authRouter);
router.use('/budget-entries', budgetEntriesRouter);
router.use('/budget-trends', budgetTrendRouter);
router.use('/user', userRouter);

export default router;
