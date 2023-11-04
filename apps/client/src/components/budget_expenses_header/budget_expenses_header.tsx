import { memo } from 'react';
import { Grid } from '@mui/material';
import BudgetStatsCard from '../budget_stats_card/budget_stats_card';
import {
  useEditBudgetLimitMutation,
  useGetUserBudgetLimitQuery,
  useGetUserBudgetStatsQuery,
} from '../../redux/budget/budgetService';
import RemainingBudgetIcon from '../../assets/remaining.png';
import WalletIcon from '../../assets/wallet.png';
import BudgetLimitIcon from '../../assets/budget_limit.png';
import { useAppDispatch } from '../../hooks/store';
import { showToast } from '../../redux/toast/toastSlice';
import { ToastType } from '../../constants/toast';

const BudgetExpensesHeader = () => {
  const dispatch = useAppDispatch();
  const { data: budgetData, ...budgetRest } = useGetUserBudgetLimitQuery();
  const { data: budgetStats, ...budgetStatRest } = useGetUserBudgetStatsQuery();
  const [editBudgetLimit, { isLoading: isMutationLoading }] =
    useEditBudgetLimitMutation();

  const handleSaveClick = async (budgetLimit: number) => {
    try {
      await editBudgetLimit({ budgetLimit }).unwrap();
      dispatch(
        showToast({
          type: ToastType.SUCCESS,
          message: 'Budget limit updated successfully',
        })
      );
    } catch (error: any) {
      let message = '';
      if (error.data && error.data.message) {
        message = error.data.message;
      } else {
        message = error.message;
      }

      dispatch(
        showToast({
          type: ToastType.ERROR,
          message,
        })
      );
    }
  };
  return (
    <Grid
      container
      mt={2.5}
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={12} sm={12} md={4}>
        <BudgetStatsCard
          title="Budget:"
          value={budgetData?.data.budgetLimit || 0}
          isLoading={
            budgetRest.isLoading ||
            budgetStatRest.isLoading ||
            isMutationLoading
          }
          action
          handleEditLimit={handleSaveClick}
          icon={<img src={BudgetLimitIcon} alt="budget limit" />}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <BudgetStatsCard
          title="Remaining Budget:"
          value={budgetStats?.data.remainingBudget || 0}
          isLoading={budgetRest.isLoading || budgetStatRest.isLoading}
          error={
            budgetStats?.data.budgetExceeded
              ? 'Expenses  exceeded budget limited'
              : null
          }
          icon={<img src={RemainingBudgetIcon} alt="remaining budget" />}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <BudgetStatsCard
          title="Spent so far:"
          value={budgetStats?.data.totalSpent || 0}
          isLoading={budgetRest.isLoading || budgetStatRest.isLoading}
          icon={<img src={WalletIcon} alt="wallet" />}
        />
      </Grid>
    </Grid>
  );
};

export default memo(BudgetExpensesHeader);
