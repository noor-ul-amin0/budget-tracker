import { Dialog, DialogContent, DialogProps, DialogTitle } from '@mui/material';
import React, { FC } from 'react';

interface MyDialogProps extends DialogProps {
  open: boolean;
  dialogTitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const MyDialog: FC<MyDialogProps> = ({
  onClose,
  open,
  dialogTitle,
  children,
}) => {
  return (
    <Dialog onClose={onClose} open={open}>
      {dialogTitle && (
        <DialogTitle variant="h4" component="h1" align="center" mt={4} mb="4">
          {dialogTitle}
        </DialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default MyDialog;
