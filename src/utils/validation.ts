export const required = (value: string, label: string) =>
  value.trim() ? "" : `${label} is required`;

export const passwordRule = (password: string) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  return "";
};
