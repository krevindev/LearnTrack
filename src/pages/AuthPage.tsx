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
  firstName?: string;
  lastName?: string;
  email?: string;
};
// END: Types>

// Auth Form Container
const AuthForm = ({ title, onSubmit, children }: AuthFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full px-1 max-w-[500px] flex flex-col justify-center items-stretch"
    >
      <div className="w-full flex mb-5">
        <h1 className="text-blue-600 font-bold text-3xl">{title}</h1>
      </div>
      {children}
    </form>
  );
};

// Sign in Form contents
const SignInForm = () => {
  // const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Errors = {};

    if (!email.trim()) {
      newErrors.username = "Email is required";
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
      {/* <TextField
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
      /> */}
      <TextField
        inputProps={{ className: "mb-5 py-1" }}
        variant="standard"
        type="email"
        label="Email"
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((prev) => ({ ...prev, email: undefined }));
        }}
      />
      <TextField
        InputProps={{ className: "mb-5 py-1" }}
        className=""
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
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  const isFormValid = (): boolean => {
    return Boolean(
      username.trim() &&
        firstName.trim() &&
        lastName.trim() &&
        email.trim() &&
        password.length >= 8 &&
        confirmPassword === password
      // Object.keys(errors).length <= 0
    );
  };

  console.log("isFormValid: ", isFormValid());

  const handleSubmit = (e: React.FormEvent) => {
    console.log("Triggered");
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

    const errs = [
      username,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    ].filter((itemValue) => itemValue.trim() !== "").length;

    console.log("ERRS:", errs);
    console.log("Sign Up Valid");
  };

  return (
    <AuthForm onSubmit={handleSubmit} title="Create new account">
      {/* Signup Input: First Name */}
      <TextField
        InputProps={{ className: "mb-3 py-1" }}
        label="First Name"
        variant="standard"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
          setErrors((prev) => ({ ...prev, firstName: undefined }));
        }}
        onBlur={() => {
          if (!firstName.trim()) {
            setErrors((prev) => ({
              ...prev,
              firstName: "First name is required",
            }));
          }
        }}
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      {/* Signup Input: Last Name */}
      <TextField
        InputProps={{ className: "mb-3 py-1" }}
        label="Last Name"
        variant="standard"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
          setErrors((prev) => ({ ...prev, lastName: undefined }));
        }}
        onBlur={() => {
          if (!lastName.trim()) {
            setErrors((prev) => ({
              ...prev,
              lastName: "Last name is required",
            }));
          }
        }}
        error={!!errors.lastName}
        helperText={errors.lastName}
      />
      {/* Signup input: Email */}
      <TextField
        InputProps={{ className: "mb-3 py-1" }}
        label="Email"
        variant="standard"
        value={email}
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        onBlur={() => {
          if (!email.trim()) {
            setErrors((prev) => ({
              ...prev,
              email: "Email is required",
            }));
          }
        }}
        error={!!errors.username}
        helperText={errors.username}
      />
      {/* Signup input: Username */}
      <TextField
        InputProps={{ className: "mb-3 py-1" }}
        label="Username"
        variant="standard"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setErrors((prev) => ({ ...prev, username: undefined }));
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
        disabled={!isFormValid()}
        type="submit"
      >
        SIGN UP
      </Button>
    </AuthForm>
  );
};

type FormMode = "signIn" | "signUp";

function AuthPage() {
  const { width: windowWidth } = useWindowSize();
  const [formMode, setFormMode] = useState<FormMode>("signIn");

  return (
    <div className="flex justify-stretch items-stretch w-full h-full bg-blue-500">
      {windowWidth > 600 && (
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
          backgroundImage: windowWidth <= 300 ? `url(${images.signInBg})` : "",
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
