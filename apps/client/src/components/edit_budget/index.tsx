import { Button } from '@mui/material';
import InputField from '../common/input_field';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

type FormValues = {
  budgetLimit: number;
};
// Yup schema
const schema = Yup.object().shape({
  budgetLimit: Yup.number().required().min(0, `Budget Limit can't be negative`),
});
interface EditBudgetProps {
  budget: number;
  handleSaveClick: (value: number) => void;
}

const EditBudget: React.FC<EditBudgetProps> = ({ budget, handleSaveClick }) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { budgetLimit: budget },
    resolver: yupResolver(schema),
  });
  const handleSave: SubmitHandler<FormValues> = (data) => {
    if (!isDirty) return;
    handleSaveClick(data.budgetLimit);
  };

  return (
    <>
      <InputField
        label="Budget Limit"
        typeof="number"
        control={control}
        name="budgetLimit"
        required
        type="number"
        size="small"
        fullWidth={false}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit(handleSave)}
      >
        Save
      </Button>
    </>
  );
};

export default EditBudget;
