import AddExpenseForm from '../add_expense_form/add_expense_form';
import { FC } from 'react';
import { AddExpense as AddExpenseType } from '../../types/budget';
import Dialog from '../common/dialog/dialog';

interface AddExpenseProps {
  open: boolean;
  isLoading: boolean;
  isEditMode: boolean;
  initialData: AddExpenseType;
  onClose: () => void;
  handleBudgetEntrySubmit: (data: AddExpenseType) => void;
}

const AddExpense: FC<AddExpenseProps> = ({
  open,
  isEditMode = false,
  isLoading = false,
  initialData,
  onClose,
  handleBudgetEntrySubmit,
}) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      dialogTitle={isEditMode ? 'Edit Expense' : 'Add Expense'}
    >
      <AddExpenseForm
        isEditMode={isEditMode}
        isSaving={isLoading}
        initialData={initialData}
        onClose={onClose}
        handleBudgetEntrySubmit={handleBudgetEntrySubmit}
      />
    </Dialog>
  );
};

export default AddExpense;
