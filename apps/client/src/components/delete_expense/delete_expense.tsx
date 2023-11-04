import { FC } from 'react';
import Dialog from '../common/dialog/dialog';
import { DialogActions, DialogContent } from '@mui/material';
import Button from '../common/button/button';
import styles from './delete_expense.module.scss';

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
          text="Close"
          size="large"
          type="button"
          className={styles.form_close_btn}
          variant="outlined"
          onClick={onClose}
        />
        <Button
          text="Yes"
          size="large"
          type="submit"
          className={styles.form_ok_btn}
          onClick={onYes}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DeleteExpense;
