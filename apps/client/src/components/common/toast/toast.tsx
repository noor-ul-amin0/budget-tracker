import React from 'react';
import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import { useAppDispatch, useTypedSelector } from '../../../hooks/store';
import { hideToast } from '../../../redux/toast/toastSlice';

const Toast: React.FC = () => {
  const dispatch = useAppDispatch();
  const { message, type, open } = useTypedSelector((state) => state.toast);

  const handleClose = () => {
    dispatch(hideToast());
  };

  return open ? (
    <MuiSnackbar
      open={open}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  ) : null;
};

export default Toast;
