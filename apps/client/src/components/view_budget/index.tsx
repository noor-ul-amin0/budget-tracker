import React from 'react';
import { Button, Typography } from '@mui/material';
import { formatAsCurrency } from '../../utils/currency';

interface ViewBudgetProps {
  budget: number;
  handleEditClick: () => void;
}

const ViewBudget: React.FC<ViewBudgetProps> = ({ budget, handleEditClick }) => {
  return (
    <>
      <Typography variant="body1">
        Budget: {formatAsCurrency(budget)}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleEditClick}>
        Edit
      </Button>
    </>
  );
};

export default ViewBudget;
