import { Request, Response } from 'express';
import BudgetEntry from '../models/budgetEntry';
import catchAsyncAwait from '../utils/catchAsyncAwait';

// Function to calculate budget trends
export const getBudgetTrends = catchAsyncAwait(
  async (req: Request, res: Response) => {
    const userId = req.user._id;

    // Calculate the total budget entries for the last month
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthTotal = await BudgetEntry.aggregate([
      {
        $match: {
          userId: userId,
          createdAt: { $gte: lastMonth },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$price' }, // Use 'price' or 'budget' as needed
        },
      },
    ]);

    // Calculate the total budget entries for the last 6 months
    const last6Months = new Date();
    last6Months.setMonth(last6Months.getMonth() - 6);
    const last6MonthsTotal = await BudgetEntry.aggregate([
      {
        $match: {
          userId: userId,
          createdAt: { $gte: last6Months },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$price' }, // Use 'price' or 'budget' as needed
        },
      },
    ]);

    // Calculate the total budget entries for the last 12 months
    const last12Months = new Date();
    last12Months.setMonth(last12Months.getMonth() - 12);
    const last12MonthsTotal = await BudgetEntry.aggregate([
      {
        $match: {
          userId: userId,
          createdAt: { $gte: last12Months },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$price' }, // Use 'price' or 'budget' as needed
        },
      },
    ]);

    // Check if the total budget entries exceed the user's budget limit
    const user = req.user as any; // Modify this type according to your User model

    // Prepare data for the chart (e.g., using a charting library like Chart.js)
    const chartData = {
      labels: ['Last Month', 'Last 6 Months', 'Last 12 Months'],
      datasets: [
        {
          label: 'Total Expenses',
          data: [
            lastMonthTotal[0]?.total || 0,
            last6MonthsTotal[0]?.total || 0,
            last12MonthsTotal[0]?.total || 0,
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.2', // Set your preferred chart colors
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Budget Limit',
          data: [user.budgetLimit, user.budgetLimit, user.budgetLimit],
          backgroundColor: 'rgba(255, 99, 132, 0.2', // Set your preferred chart colors
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    res.send(chartData);
  }
);
