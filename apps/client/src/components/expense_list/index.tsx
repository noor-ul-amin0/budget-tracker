import { FC, useState } from 'react';
import { Divider, List, ListItem } from '@mui/material';
import ExpenseItem from '../expense_item';
import { Expense } from '../../types/expense';

interface ExpenseListProps {
  handleEditExpense: (expense: Expense) => void;
  handleDeleteExpense: (id: string) => void;
}

const ExpenseList: FC<ExpenseListProps> = ({
  handleDeleteExpense,
  handleEditExpense,
}) => {
  const [expenses, setExpenses] = useState(
    Array.from({ length: 10 })
      .fill(null)
      .map((_, i) => ({ id: ++i + '', name: 'Expense ' + i, cost: i }))
  );

  return (
    <List component="nav">
      {expenses.map((expense, index) => (
        <>
          <ListItem key={index} disablePadding>
            <ExpenseItem
              expense={expense}
              handleEditExpense={handleEditExpense}
              handleDeleteExpense={handleDeleteExpense}
            />
          </ListItem>
          {index < expenses.length - 1 && <Divider />}
        </>
      ))}
    </List>
  );
};

export default ExpenseList;
