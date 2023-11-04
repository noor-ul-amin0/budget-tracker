import { Grid, Paper } from '@mui/material';
import InputField from '../common/input_field/input_field';
import Button from '../common/button/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FC } from 'react';
import styles from './add_expense_form.module.scss';

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
        <Grid className={styles.form_actions_container} item xs={12} mt={2}>
          <Button
            text="Close"
            size="large"
            type="button"
            className={styles.form_close_btn}
            variant="outlined"
            onClick={onClose}
          />
          <Button
            text="Save"
            size="large"
            type="submit"
            loading={isSaving}
            className={styles.form_save_btn}
            onClick={handleSubmit(onSubmit)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
export default AddExpenseForm;
