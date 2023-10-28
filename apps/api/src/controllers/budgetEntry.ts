import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import BudgetEntry from '../models/budgetEntry';
import Notification from '../models/notification';
import catchAsyncAwait from '../utils/catchAsyncAwait';
import AppError from '../utils/AppError';

export const createEntry = catchAsyncAwait(
  async (req: Request, res: Response, next: NextFunction) => {
    let budgetEntry = null;
    try {
      // Create a new budget entry associated with the user
      budgetEntry = await BudgetEntry.create({
        ...req.body,
        userId: req.user._id,
      });
    } catch (error) {
      if (error.code === 11000) {
        return next(new AppError('Entry already exists', 400));
      }
    }

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
          total: { $sum: '$budget' },
        },
      },
    ]);

    // Check if the total budget entries exceed the user's budget limit
    if (user.budgetLimit < totalBudgetEntries[0].total) {
      await Notification.create({
        userId: user._id,
        message: 'You have exceeded your budget for the current month!',
      });
    }

    const budgetEntryObj = budgetEntry.toObject();
    delete budgetEntryObj.userId;
    delete budgetEntryObj.createdAt;
    delete budgetEntryObj.updatedAt;
    res.status(201).send(budgetEntryObj);
  }
);

export const getEntries = catchAsyncAwait(
  async (req: Request, res: Response) => {
    // Define the pagination options
    const options = {
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
    };
    const entries = await BudgetEntry.paginate(
      {
        userId: req.user._id,
      },
      options
    );
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
      req.body, // Use req.body to update fields as needed
      { new: true, runValidators: true }
    );

    if (!updatedEntry) {
      return next(
        new AppError(
          "Entry not found or you don't have permission to update it.",
          400
        )
      );
    }
    const budgetEntryObj = updatedEntry.toObject();
    delete budgetEntryObj.userId;
    delete budgetEntryObj.createdAt;
    delete budgetEntryObj.updatedAt;
    res.status(200).send(budgetEntryObj);
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
