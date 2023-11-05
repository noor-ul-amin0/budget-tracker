import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { useGetBudgetTrendsQuery } from '../../redux/budget/budgetService';
import { Alert, Box, Typography } from '@mui/material';
import Progress from '../../components/common/progress/progress';
import styles from './reports.module.scss';

const BudgetTrendsChart = () => {
  const { data, isLoading, isFetching } = useGetBudgetTrendsQuery();

  if (isLoading || isFetching) {
    return (
      <Box className={styles.box_container} minHeight={'90vh'}>
        <Progress size={60} />
      </Box>
    );
  }
  const chartData = [
    {
      name: 'Last Month',
      'Budget Limit': data?.userBudgetLimit,
      Expenses: data?.lastMonthTotal,
    },
    {
      name: 'Last 6 Months',
      'Budget Limit': data?.userBudgetLimit,
      Expenses: data?.last6MonthsTotal,
    },
    {
      name: 'Last 12 Months',
      'Budget Limit': data?.userBudgetLimit,
      Expenses: data?.last12MonthsTotal,
    },
  ];

  return (
    <div className={styles.chart_container}>
      <Box
        sx={{
          width: {
            xs: '90%',
            sm: '80%',
            md: '60%',
          },
        }}
        className={styles.box_container}
      >
        <Alert severity="warning">
          <Typography>
            <em>Important Note:</em> The red line on the chart indicates that
            your expenses have exceeded your budget limit. Please manage your
            expenses accordingly.
          </Typography>
        </Alert>
      </Box>
      <Box
        sx={{
          width: {
            xs: '100%',
            sm: '80%',
            md: '40%',
          },
          height: {
            xs: 'auto',
            sm: 'auto',
            md: '400px',
            lg: '450px',
            xl: '500px',
          },
        }}
      >
        <ResponsiveContainer>
          <ComposedChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend
              wrapperStyle={{ bottom: '1px' }}
              iconSize={20}
              iconType="circle"
            />
            <Bar dataKey="Expenses" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="Budget Limit" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </div>
  );
};

export default BudgetTrendsChart;
