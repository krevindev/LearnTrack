import TextField from "@mui/material/TextField";

type FormInputProps = {
  label: string;
  value: string;
  type?: string;
  error?: string;
  disabled?: boolean;
  margin?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export default function FormInput({
  label,
  value,
  type = "text",
  error,
  disabled,
  margin = "mb-5",
  onChange,
  onBlur,
}: FormInputProps) {
  return (
    <TextField
      variant="standard"
      label={label}
      type={type}
      value={value}
      disabled={disabled}
      error={!!error}
      helperText={error}
      InputProps={{ className: `${margin} py-1` }}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
}
