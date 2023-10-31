import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

type MyButtonProps = ButtonProps & {
  text: string;
  onClick: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  loading?: boolean;
  disabled?: boolean;
  loadingLabel?: string;
};

const MyButton: React.FC<MyButtonProps> = ({
  text,
  onClick,
  variant = 'contained',
  loading = false,
  disabled = false,
  loadingLabel = 'Loading...',
  ...props
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? loadingLabel : text}
    </Button>
  );
};

export default MyButton;
