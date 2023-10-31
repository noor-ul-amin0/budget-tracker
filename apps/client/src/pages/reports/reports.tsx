import { useGetBudgetTrendsQuery } from '../../redux/budget/budgetService';
import LineChart from '../../components/common/line_chart/line_chart';
import { Box, Grid } from '@mui/material';
import Progress from '../../components/common/progress/progress';

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Budget Trends (Reports)',
    },
  },
};

const Reports = () => {
  const { data, isLoading, isFetching } = useGetBudgetTrendsQuery();

  if (isLoading || isFetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={'90vh'}
      >
        <Progress size={60} />
      </Box>
    );
  }

  return (
    <Grid container height="90vh">
      <Grid
        display={'flex'}
        justifyContent="center"
        alignItems="center"
        item
        xs={12}
      >
        <Box
          sx={{
            width: { xs: '90%', md: '70%' },
            margin: '0 auto',
          }}
        >
          <LineChart chartOptions={options} chartData={data} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Reports;
