import { TextField, TextFieldProps } from '@mui/material';
import { Controller } from 'react-hook-form';
type InputInputProps = TextFieldProps & {
  name: string;
  control: any;
  label: string;
  variant?: 'outlined' | 'filled' | 'standard';
  required?: boolean;
  rules?: Record<any, any>;
};

const InputField = ({
  name,
  control,
  label,
  variant = 'outlined',
  fullWidth = true,
  required = true,
  rules = {},
  ...props
}: InputInputProps) => {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth={fullWidth}
          label={label}
          {...props}
        />
      )}
    />
  );
};
export default InputField;
