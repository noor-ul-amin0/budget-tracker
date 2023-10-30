import { startOfDay, endOfDay } from 'date-fns';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import BudgetEntry from '../models/budgetEntry';
import Notification from '../models/notification';
import catchAsyncAwait from '../utils/catchAsyncAwait';
import AppError from '../utils/AppError';

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
export const createEntry = catchAsyncAwait(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, cost } = req.body;
    if (!name || isNaN(cost)) {
      return next(new AppError('Please provide a name and cost', 400));
    }
    const checkDuplicate = await BudgetEntry.findOne({ name });
    if (checkDuplicate) {
      return next(new AppError('Entry already exists', 409));
    }
    const budgetEntry = await BudgetEntry.create({
      ...req.body,
      userId: req.user._id,
    });

    // Check if the entry exceeds the budget, and send a notification
    const user = req.user;

    // Calculate the total budget entries for the current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const totalBudgetEntries = await BudgetEntry.aggregate([
      {
        $match: {
          userId: req.user._id,
          $expr: {
            month: { $eq: ['$createdAt', currentMonth] },
            year: { $eq: ['$createdAt', currentYear] },
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$cost' },
        },
      },
    ]);

    // Check if the total budget entries exceed the user's budget limit
    if (user.budgetLimit < totalBudgetEntries[0]?.total) {
      await Notification.create({
        userId: user._id,
        message: 'You have exceeded your budget for the current month!',
      });
    }

    const budgetEntryObj = budgetEntry.toObject();
    delete budgetEntryObj.userId;
    delete budgetEntryObj.createdAt;
    delete budgetEntryObj.updatedAt;
    res.status(201).send({
      success: true,
      data: budgetEntryObj,
    });
  }
);

export const getEntries = catchAsyncAwait(
  async (req: Request, res: Response) => {
    interface Query {
      [key: string]: any;
    }
    // Define the pagination options
    const options = {
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 7,
      lean: true,
    };

    const query: Query = {
      userId: req.user._id,
    };

    if (
      typeof req.query.startDate === 'string' &&
      isValidDate(req.query.startDate)
    ) {
      query.createdAt = {
        $gte: startOfDay(new Date(req.query.startDate)),
      };
    }

    if (
      typeof req.query.endDate === 'string' &&
      isValidDate(req.query.endDate)
    ) {
      query.createdAt = {
        ...query.createdAt,
        $lte: endOfDay(new Date(req.query.endDate)),
      };
    }

    const entries = await BudgetEntry.paginate(query, options);
    entries.docs.forEach((entry) => {
      delete entry.id;
      delete entry.userId;
      delete entry.updatedAt;
    });
    res.send(entries);
  }
);

export const updateEntry = catchAsyncAwait(
  async (req: Request, res: Response, next: NextFunction) => {
    const entryId = req.params.entryId;
    if (!validator.isMongoId(entryId))
      return next(new AppError('Invalid entry id', 400));
    const updatedEntry = await BudgetEntry.findOneAndUpdate(
      { _id: entryId, userId: req.user._id },
      req.body,
      { new: true, runValidators: true, lean: true }
    );

    if (!updatedEntry) {
      return next(
        new AppError(
          "Entry not found or you don't have permission to update it.",
          400
        )
      );
    }

    delete updatedEntry.userId;
    delete updatedEntry.createdAt;
    delete updatedEntry.updatedAt;
    res.status(200).send({ success: true, data: updateEntry });
  }
);

export const deleteEntry = catchAsyncAwait(
  async (req: Request, res: Response, next: NextFunction) => {
    const entryId = req.params.entryId;
    if (!validator.isMongoId(entryId))
      return next(new AppError('Invalid entry id', 400));
    const deletedEntry = await BudgetEntry.findOneAndDelete({
      _id: entryId,
      userId: req.user._id,
    });

    if (!deletedEntry) {
      return next(
        new AppError(
          "Entry not found or you don't have permission to update it.",
          400
        )
      );
    }

    res.sendStatus(204); // 204 status means No Content, as the entry was deleted
  }
);
