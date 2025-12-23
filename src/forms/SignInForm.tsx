import { useState } from "react";
import Button from "@mui/material/Button";
import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";
import { required } from "../utils/validation";
import { Link } from "react-router-dom";

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
      (key) =>
        !newErrors[key as keyof Errors] && delete newErrors[key as keyof Errors]
    );

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    console.log("Sign in valid");
  };

  return (
    <AuthForm title="Login" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center items-stretch">
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

        <Link to="/auth/sign-up" className="text-blue-500 mt-10">
          Create Account
        </Link>
      </div>
    </AuthForm>
  );
}
