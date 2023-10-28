import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  open: boolean;
  message: string | null;
  type: 'info' | 'success' | 'warning' | 'error' | undefined;
}

const initialState: ToastState = {
  open: false,
  message: null,
  type: undefined,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type: 'info' | 'success' | 'warning' | 'error';
      }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideToast: (state) => {
      state.open = false;
      state.message = null;
      state.type = undefined;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
