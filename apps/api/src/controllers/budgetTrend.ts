import { Request, Response } from 'express';
import BudgetEntry from '../models/budgetEntry';
import catchAsyncAwait from '../utils/catchAsyncAwait';

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
          total: { $sum: '$cost' },
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
          total: { $sum: '$cost' },
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
          total: { $sum: '$cost' },
        },
      },
    ]);

    // Check if the total budget entries exceed the user's budget limit
    const user = req.user as any; // Modify this type according to your User model

    // Prepare data for the chart
    const chartData = {
      series: [
        {
          type: 'bar',
          stack: '',
          yAxisKey: 'total',
          data: [
            lastMonthTotal[0]?.total || 0,
            last6MonthsTotal[0]?.total || 0,
            last12MonthsTotal[0]?.total || 0,
          ],
        },
        {
          type: 'line',
          yAxisKey: 'budgetLimit',
          color: 'red',
          data: [user.budgetLimit, user.budgetLimit, user.budgetLimit],
        },
      ],
      xAxis: [
        {
          id: 'expenses',
          data: ['Last Month', 'Last 6 Months', 'Last 12 Months'],
          scaleType: 'band',
          valueFormatter: (value) => value.toString(),
        },
      ],
      yAxis: [
        {
          id: 'total',
          scaleType: 'linear',
        },
        {
          id: 'budgetLimit',
          scaleType: 'log',
        },
      ],
    };

    res.send(chartData);
  }
);
