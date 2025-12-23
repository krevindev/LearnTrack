import { useState } from "react";
import Button from "@mui/material/Button";
import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";
import { required, passwordRule } from "../utils/validation";
import { Link } from "react-router-dom";
import { signUpWithEmail } from "../services/authServices";

// --- Types ---
type State = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

type Errors = Partial<State>;

// --- Main Component: Sign-up ---
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

  // Simple input validation
  const isValid =
    form.firstName &&
    form.lastName &&
    form.email &&
    form.username &&
    form.password.length >= 8 &&
    form.password === form.confirmPassword;

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Initialize errors
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

    // console.log("Sign up valid");
    try {
      const user = await signUpWithEmail({
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        password: form.password,
      });

      console.log("Signed up user:", user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error occured");
      }
      // show error to front-end later
    }
  };

  return (
    <AuthForm title="Create new account" onSubmit={handleSubmit}>
      {/* Input: First name */}
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
      {/* Input: Last name */}
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
      {/* Input: Email */}
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
      {/* Input: Username */}
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
      {/* Input: Password */}
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
      {/* Input: Confirm Password */}
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
              confirmPassword: "Confirm password",
            }));
          } else if (form.confirmPassword.trim() !== form.password) {
            setErrors((prev) => ({
              ...prev,
              confirmPassword: "Passwords do not match",
            }));
          }
        }}
      />
      {/* Button: Submit */}
      <Button
        type="submit"
        variant="contained"
        disabled={!isValid}
        sx={{ py: 1.5, backgroundColor: "#28A56A" }}
      >
        SIGN UP
      </Button>
      {/* Link to: Sign In */}
      <Link
        to="/auth/sign-in"
        className="text-blue-500 mt-10 hover:underline active:underline active:translate-y-1"
      >
        Already have an account?
      </Link>
    </AuthForm>
  );
}
