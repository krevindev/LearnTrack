import { images } from "../constants/images";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useWindowSize from "../hooks/useWindowSize";
import React, { useState } from "react";

// <START: Types
type AuthFormProps = {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
};

type Errors = {
  username?: string;
  password?: string;
  confirmPassword?: string;
};
// END: Types>

// Auth Form Container
const AuthForm = ({ title, onSubmit, children }: AuthFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full px-1 max-w-[500px] flex flex-col justify-center items-stretch"
    >
      <div className="w-full flex mb-20">
        <h1 className="text-blue-600 font-bold text-3xl">{title}</h1>
      </div>
      {children}
    </form>
  );
};

// Sign in Form contents
const SignInForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Errors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return 0;
    console.log("Sign in valid");
  };
  return (
    <AuthForm onSubmit={handleSubmit} title="Log in to your account">
      <TextField
        InputProps={{ className: "mb-5 py-1" }}
        id="standard"
        label="Username"
        variant="standard"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setErrors((prev) => ({ ...prev, username: undefined }));
        }}
        error={!!errors.username}
        helperText={errors.username}
      />
      <TextField
        InputProps={{ className: "mb-5 py-1" }}
        className=""
        id="standard-basic"
        label="Password"
        variant="standard"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors((prev) => ({ ...prev, password: undefined }));
        }}
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button
        type="submit"
        sx={{ py: 1.5, mt: 1, backgroundColor: "#28A56A" }}
        variant="contained"
      >
        LOGIN
      </Button>
    </AuthForm>
  );
};

// Sign up Form Contents
const SignUpForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    console.log("Sign Up Valid");
  };

  return (
    <AuthForm onSubmit={handleSubmit} title="Create new account">
      <TextField
        InputProps={{ className: "mb-3 py-1" }}
        id="standard-basic"
        label="Username"
        variant="standard"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          // setErrors((prev) => ({ ...prev, username: undefined }));
        }}
        onBlur={() => {
          if (!username.trim()) {
            setErrors((prev) => ({
              ...prev,
              username: "Username is required",
            }));
          }
        }}
        error={!!errors.username}
        helperText={errors.username}
      />
      <TextField
        InputProps={{ className: "mb-3 py-1" }}
        className=""
        id="signup-form"
        label="New Password"
        variant="standard"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors((prev) => ({ ...prev, password: undefined }));
        }}
        onBlur={() => {
          if (!password.trim()) {
            setErrors((prev) => ({
              ...prev,
              password: "Password is required",
            }));
          } else if (password.length < 8) {
            setErrors((prev) => ({
              ...prev,
              password: "Password must be at least 8 characters",
            }));
          }
        }}
        error={!!errors.password}
        helperText={errors.password}
      />
      <TextField
        InputProps={{ className: "mb-3 py-1" }}
        className=""
        id="standard-basic"
        label="Confirm Password"
        variant="standard"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
        }}
        onBlur={() => {
          if (confirmPassword.trim() !== password) {
            setErrors((prev) => ({
              ...prev,
              confirmPassword: "Password does not match",
            }));
          }
        }}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        disabled={!!errors.password || !password}
      />
      <Button
        sx={{ py: 1.5, mt: 1, backgroundColor: "#28A56A" }}
        variant="contained"
      >
        LOGIN
      </Button>
    </AuthForm>
  );
};

type FormMode = "signIn" | "signUp";

function AuthPage() {
  const { width } = useWindowSize();
  const [formMode, setFormMode] = useState<FormMode>("signIn");

  return (
    <div className="flex justify-stretch items-stretch w-full h-full bg-blue-500">
      {width > 600 && (
        <div
          className="w-full max-w-1/2 h-screen bg-gray-50 bg-cover flex justify-center items-center flex-col"
          style={{ backgroundImage: `url(${images.signInBg})` }}
        >
          <div className="w-fit">
            <h1 className="text-[calc(40px+1vw)] font-black text-white select-none">
              LearnTrack
            </h1>
            <p className="text-[calc(10px+.5vw)] mt-4 w-full max-w-full text-wrap">
              Track your learning. Organize your skills.
              <br /> See your progress
            </p>
          </div>
        </div>
      )}
      <div
        className="h-screen px-10 w-full bg-white flex flex-col justify-center items-center bg-size-[300%] bg-center"
        style={{
          backgroundImage: width <= 300 ? `url(${images.signInBg})` : "",
        }}
      >
        {formMode === "signIn" ? <SignInForm /> : <SignUpForm />}
        <h3
          onClick={() =>
            setFormMode((prevMode) =>
              prevMode === "signIn" ? "signUp" : "signIn"
            )
          }
          className="text-blue-700 cursor-pointer mt-5 hover:underline"
        >
          {formMode === "signIn"
            ? "Create account"
            : "Already have an account?"}
        </h3>
        {formMode === "signIn" && (
          <h3 className="text-blue-700 absolute bottom-[5%] hover:underline cursor-pointer">
            Forgot Password?
          </h3>
        )}
      </div>
    </div>
  );
}
export default AuthPage;
