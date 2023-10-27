import React, { useState } from 'react';
import { Button, Input } from '@mui/material';

interface EditBudgetProps {
  budget: number;
  handleSaveClick: (value: number) => void;
}

const EditBudget: React.FC<EditBudgetProps> = ({ budget, handleSaveClick }) => {
  const [value, setValue] = useState(budget);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(event.target.value) || 0);
  };

  const handleSave = () => {
    handleSaveClick(value);
  };

  return (
    <>
      <Input
        required
        type="number"
        value={value}
        onChange={handleValueChange}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </>
  );
};

export default EditBudget;
