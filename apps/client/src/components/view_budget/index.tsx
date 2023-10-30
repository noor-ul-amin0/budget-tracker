import React from 'react';
import { Fab, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
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
      <Fab
        color="primary"
        size="small"
        aria-label="edit"
        disableFocusRipple
        disableRipple
      >
        <EditIcon onClick={handleEditClick} />
      </Fab>
    </>
  );
};

export default ViewBudget;
