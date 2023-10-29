import { Grid, Paper } from '@mui/material';
import InputField from '../common/input_field';
import Button from '../common/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FC } from 'react';

export type FormValues = {
  name: string;
  cost: number;
};

interface AddExpenseFormProps {
  isEditMode: boolean;
  isSaving: boolean;
  initialData?: FormValues;
  onClose: VoidFunction;
  handleBudgetEntrySubmit: (formData: FormValues) => void;
}

// Yup schema
const schema = Yup.object().shape({
  name: Yup.string().required(),
  cost: Yup.number().required().min(0),
});

const AddExpenseForm: FC<AddExpenseFormProps> = ({
  isEditMode = false,
  isSaving = false,
  initialData,
  onClose,
  handleBudgetEntrySubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: isEditMode ? initialData : { name: '', cost: 0 },
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    if (!isDirty) return;
    handleBudgetEntrySubmit(formData);
  };
  return (
    <Paper
      variant="outlined"
      sx={{ my: { xs: 2, md: 4 }, p: { xs: 2, md: 3 } }}
    >
      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item xs={12}>
          <InputField
            control={control}
            margin="normal"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            control={control}
            margin="normal"
            name="cost"
            label="cost"
            type="number"
          />
        </Grid>
        <Grid display={'flex'} justifyContent={'flex-end'} item xs={12} mt={2}>
          <Button
            text="Save"
            size="large"
            type="submit"
            loading={isSaving}
            variant="text"
            onClick={handleSubmit(onSubmit)}
          />
          <Button
            text="Close"
            size="large"
            type="button"
            color="error"
            variant="text"
            onClick={onClose}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
export default AddExpenseForm;
