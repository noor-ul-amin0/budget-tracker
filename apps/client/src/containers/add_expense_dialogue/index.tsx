import { DialogProps, Dialog, DialogContent, DialogTitle } from '@mui/material';
import AddExpenseForm, { FormValues } from '../add_expense';
import { FC } from 'react';

interface AddExpenseDialogProps extends DialogProps {
  onClose: () => void;
  open: boolean;
  isEditMode: boolean;
  initialData: FormValues;
}

const AddExpenseDialog: FC<AddExpenseDialogProps> = ({
  open,
  onClose,
  isEditMode = false,
  initialData,
}) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle variant="h4" component="h1" align="center" mt={4} mb="4">
        {isEditMode ? 'Edit' : 'Add'} Expense
      </DialogTitle>
      <DialogContent>
        <AddExpenseForm
          onClose={onClose}
          isEditMode={isEditMode}
          initialData={initialData}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseDialog;
