import { useState } from "react";
import Button from "@mui/material/Button";
import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";
import { required } from "../utils/validation";

type Errors = {
  email?: string;
  password?: string;
};

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Errors = {
      email: required(email, "Email"),
      password: required(password, "Password"),
    };

    Object.keys(newErrors).forEach(
      (key) => !newErrors[key as keyof Errors] && delete newErrors[key as keyof Errors]
    );

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    console.log("Sign in valid");
  };

  return (
    <AuthForm title="Log in to your account" onSubmit={handleSubmit}>
      <FormInput
        label="Email"
        type="email"
        value={email}
        error={errors.email}
        onChange={setEmail}
      />

      <FormInput
        label="Password"
        type="password"
        value={password}
        error={errors.password}
        onChange={setPassword}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ py: 1.5, backgroundColor: "#28A56A" }}
      >
        LOGIN
      </Button>
    </AuthForm>
  );
}
