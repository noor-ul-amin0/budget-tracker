import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

type MyButtonProps = ButtonProps & {
  text: string;
  onClick: () => void;
  variant?: 'text' | 'outlined' | 'contained';
};

const MyButton: React.FC<MyButtonProps> = ({
  text,
  onClick,
  variant = 'contained',
  ...props
}) => {
  return (
    <Button variant={variant} onClick={onClick} {...props}>
      {text}
    </Button>
  );
};

export default MyButton;
