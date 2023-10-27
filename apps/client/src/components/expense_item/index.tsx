import { ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FC } from 'react';
import { Expense } from '../../types/expense';

interface ExpenseItemProps {
  expense: Expense;
  handleEditExpense: (expense: Expense) => void;
  handleDeleteExpense: (id: string) => void;
}

const ExpenseItem: FC<ExpenseItemProps> = ({
  expense,
  handleEditExpense,
  handleDeleteExpense,
}) => {
  const onEditClick = () => {
    handleEditExpense(expense);
  };
  const onDeleteClick = () => {
    handleDeleteExpense(expense.id);
  };

  return (
    <ListItem
      sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      secondaryAction={
        <>
          <Typography
            variant="body2"
            color="primary"
            component="span"
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '50px',
            }}
          >
            PKR: {expense.cost}
          </Typography>
          <IconButton size="small" onClick={onEditClick}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton size="small" onClick={onDeleteClick}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      }
    >
      <ListItemText primary={expense.name} />
    </ListItem>
  );
};

export default ExpenseItem;
