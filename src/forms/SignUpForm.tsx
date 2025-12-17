import { useState } from "react";
import Button from "@mui/material/Button";
import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";
import { required, passwordRule } from "../utils/validation";

type State = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

type Errors = Partial<State>;

export default function SignUpForm() {
  const [form, setForm] = useState<State>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const update = (key: keyof State, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const isValid =
    form.firstName &&
    form.lastName &&
    form.email &&
    form.username &&
    form.password.length >= 8 &&
    form.password === form.confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Errors = {
      firstName: required(form.firstName, "First name"),
      lastName: required(form.lastName, "Last name"),
      email: required(form.email, "Email"),
      username: required(form.username, "Username"),
      password: passwordRule(form.password),
      confirmPassword:
        form.confirmPassword !== form.password ? "Passwords do not match" : "",
    };

    Object.keys(newErrors).forEach(
      (key) =>
        !newErrors[key as keyof Errors] && delete newErrors[key as keyof Errors]
    );

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    console.log("Sign up valid");
  };

  return (
    <AuthForm title="Create new account" onSubmit={handleSubmit}>
      <FormInput
        label="First Name"
        value={form.firstName}
        error={errors.firstName}
        onChange={(v) => update("firstName", v)}
        onBlur={() => {
          if (!form.firstName.trim()) {
            setErrors((prev) => ({
              ...prev,
              firstName: "First name is required",
            }));
          }
        }}
      />
      <FormInput
        label="Last Name"
        value={form.lastName}
        error={errors.lastName}
        onChange={(v) => update("lastName", v)}
        onBlur={() => {
          if (!form.lastName.trim()) {
            setErrors((prev) => ({
              ...prev,
              lastName: "Last name is required",
            }));
          }
        }}
      />
      <FormInput
        label="Email"
        type="email"
        value={form.email}
        error={errors.email}
        onChange={(v) => update("email", v)}
        onBlur={() => {
          if (!form.email.trim()) {
            setErrors((prev) => ({
              ...prev,
              email: "Email is required",
            }));
          }
        }}
      />
      <FormInput
        label="Username"
        value={form.username}
        error={errors.username}
        onChange={(v) => update("username", v)}
        onBlur={() => {
          if (!form.username.trim()) {
            setErrors((prev) => ({
              ...prev,
              username: "Username is required",
            }));
          }
        }}
      />
      <FormInput
        label="Password"
        type="password"
        value={form.password}
        error={errors.password}
        onChange={(v) => {
          update("password", v);
          if (form.password.trim() !== form.confirmPassword) {
            setErrors((prev) => ({
              ...prev,
              confirmPassword: "Passwords do not match",
            }));
          }
        }}
        onBlur={() => {
          if (!form.password.trim()) {
            setErrors((prev) => ({
              ...prev,
              password: "Password is required",
            }));
          }
        }}
      />
      <FormInput
        label="Confirm Password"
        type="password"
        value={form.confirmPassword}
        error={errors.confirmPassword}
        disabled={!form.password}
        onChange={(v) => update("confirmPassword", v)}
        onBlur={() => {
          if (!form.confirmPassword.trim()) {
            setErrors((prev) => ({
              ...prev,
              confirmPassword: "Username is required",
            }));
          } else if (form.confirmPassword.trim() !== form.password) {
            setErrors((prev) => ({
              ...prev,
              confirmPassword: "Passwords do not match",
            }));
          }
        }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={!isValid}
        sx={{ py: 1.5, backgroundColor: "#28A56A" }}
      >
        SIGN UP
      </Button>
    </AuthForm>
  );
}
