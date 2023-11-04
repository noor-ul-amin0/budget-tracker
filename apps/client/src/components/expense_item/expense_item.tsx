import { Box, IconButton, Typography } from '@mui/material';
import Card from '../common/card/card';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Expense } from '../../types/budget';
import { FC } from 'react';
import { format, parseISO } from 'date-fns';
import { formatAsCurrency } from '../../utils/currency';

interface ExpenseItemProps {
  expense: Expense;
  handleEditExpense: (expense: Expense) => void;
  handleDeleteClick: (id: string) => void;
}

const ListItem: FC<ExpenseItemProps> = ({
  expense,
  handleDeleteClick,
  handleEditExpense,
}) => {
  const createdAtDate = format(parseISO(expense.createdAt), 'MMM dd, yyyy');
  const onEditClick = () => {
    handleEditExpense(expense);
  };
  const onDeleteClick = () => {
    handleDeleteClick(expense._id);
  };
  return (
    <Card sx={{ height: '80px', borderRadius: '13px' }}>
      <Box
        sx={{
          padding: '0px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="subtitle1" component="h1" fontSize={18}>
            {expense.name}
          </Typography>
          <Typography color={'gray'} fontSize={12}>
            {createdAtDate}
          </Typography>
        </Box>
        <Typography>{formatAsCurrency(expense.cost)}</Typography>
        <Box>
          <IconButton disableFocusRipple size="small" onClick={onEditClick}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton disableFocusRipple size="small" onClick={onDeleteClick}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default ListItem;
