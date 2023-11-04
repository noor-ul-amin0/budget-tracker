import * as React from 'react';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { Alert, Box, Grid, Typography } from '@mui/material';
import { useGetBudgetTrendsQuery } from '../../redux/budget/budgetService';
import Progress from '../../components/common/progress/progress';

export default function Reports() {
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
    <Grid container mt={5}>
      <Grid
        display={'flex'}
        justifyContent="center"
        alignItems="center"
        flexDirection={'column'}
        gap={5}
        item
        xs={12}
      >
        <Box>
          <Alert severity="warning">
            <Typography>
              <em>Important Note:</em> The red line on the chart indicates that
              your expenses have exceeded your budget limit. Please manage your
              expenses accordingly.
            </Typography>
          </Alert>
        </Box>
        <Box>
          <ChartContainer
            series={data?.series}
            width={600}
            height={450}
            xAxis={data?.xAxis}
            yAxis={data?.yAxis}
          >
            <BarPlot tooltip={{ trigger: 'axis' }} />
            <LinePlot tooltip={{ trigger: 'item' }} />
            <ChartsXAxis
              label="Expenses"
              position="bottom"
              axisId={data?.xAxis[0]?.id}
            />
            <ChartsYAxis
              label="Budget"
              position="left"
              axisId={data?.yAxis[0]?.id}
            />
          </ChartContainer>
        </Box>
      </Grid>
    </Grid>
  );
}
