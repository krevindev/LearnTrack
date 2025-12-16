import TextField from "@mui/material/TextField";

type FormInputProps = {
  label: string;
  value: string;
  type?: string;
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export default function FormInput({
  label,
  value,
  type = "text",
  error,
  disabled,
  onChange,
  onBlur,
}: FormInputProps) {
  return (
    <TextField
      variant="standard"
      label={label}
      value={value}
      type={type}
      disabled={disabled}
      error={!!error}
      helperText={error}
      InputProps={{ className: "mb-5 py-1" }}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
    />
  );
}
