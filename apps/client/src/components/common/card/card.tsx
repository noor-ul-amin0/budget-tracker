import { Card, CardContent, CardProps } from '@mui/material';
import { FC, ReactNode } from 'react';

interface MyCardProps extends CardProps {
  children: ReactNode;
}

const MyCard: FC<MyCardProps> = ({ children, ...props }) => {
  return (
    <Card elevation={0} sx={{ borderRadius: '15px' }} {...props}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default MyCard;
