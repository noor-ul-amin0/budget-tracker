import { FC } from 'react';
import Dialog from '../common/dailog';
import { DialogActions, DialogContent } from '@mui/material';
import Button from '../common/button';

interface DeleteExpenseProps {
  open: boolean;
  onClose: VoidFunction;
  onYes: VoidFunction;
}

const DeleteExpense: FC<DeleteExpenseProps> = ({ open, onClose, onYes }) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogContent>
        Are you sure you want to delete this expense?
      </DialogContent>
      <DialogActions>
        <Button
          text="Yes"
          size="large"
          type="submit"
          variant="text"
          onClick={onYes}
        />
        <Button
          text="Close"
          size="large"
          type="button"
          color="error"
          variant="text"
          onClick={onClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DeleteExpense;
