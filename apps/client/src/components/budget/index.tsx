import React, { useState } from 'react';
import { Paper } from '@mui/material';
import ViewBudget from '../view_budget';
import EditBudget from '../edit_budget';

const Budget = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (value) => {
    setIsEditing(false);
  };
  return (
    <Paper
      elevation={2}
      sx={{
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {isEditing ? (
        <EditBudget budget={45} handleSaveClick={handleSaveClick} />
      ) : (
        <ViewBudget budget={43} handleEditClick={handleEditClick} />
      )}
    </Paper>
  );
};

export default Budget;
