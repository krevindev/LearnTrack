import { useState } from "react";
import Button from "@mui/material/Button";
import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";
import { required, passwordRule } from "../utils/validation";
import { Link } from "react-router-dom";
import { signUpWithEmail } from "../services/authServices";
import { FirebaseError } from "firebase/app";
import loadingIcon from "../assets/icons/loading-icon.svg";
import FlashMessage from "../components/FlashMessage";

// --- Types ---
type State = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

type FlashType = "success" | "error";

type Errors = Partial<State>;

// --- Main Component: Sign-up ---
export default function SignUpForm() {
  // const navigate = useNavigate();

  const [form, setForm] = useState<State>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flashType, setFlashType] = useState<FlashType | null>(null);

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
        form.password.length >= 8 && form.confirmPassword !== form.password
          ? "Passwords do not match"
          : "",
    };

    Object.keys(newErrors).forEach(
      (key) =>
        !newErrors[key as keyof Errors] && delete newErrors[key as keyof Errors]
    );

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    // console.log("Sign up valid");
    try {
      setIsLoading(true);
      const user = await signUpWithEmail({
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        password: form.password,
      });

      console.log("Signed up user:", user);

      // On Succesful Sign In
      // navigate("/auth/sign-in");
      setFlashType("success");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrors({ email: "Email alreadyExists" });
            break;
          case "auth/invalid-email":
            setErrors({ email: "Invalid email format" });
            break;
          case "auth/weak-password":
            setErrors({ password: "Password is too weak" });
            break;
          default:
            setErrors({ email: "Signup failed" });
        }
      }
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error occured");
      }
      // show error to front-end later
      setFlashType("error");
    } finally {
      setIsLoading(false);
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
          // if (form.password.trim() !== form.confirmPassword) {
          //   setErrors((prev) => ({
          //     ...prev,
          //     confirmPassword: "Passwords do not match",
          //   }));
          // }
        }}
        onBlur={() => {
          if (!form.password.trim()) {
            setErrors((prev) => ({
              ...prev,
              password: "Password is required",
            }));
          } else if (form.password.length < 8) {
            setErrors((prev) => ({
              ...prev,
              password: "Password must be at least 8 characters",
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
        disabled={!form.password || form.password.length < 8}
        onChange={(v) => update("confirmPassword", v)}
        onBlur={() => {
          if (!form.confirmPassword.trim()) {
            setErrors((prev) => ({
              ...prev,
              confirmPassword: "Confirm password",
            }));
          } else if (
            form.confirmPassword.trim() !== form.password &&
            form.password.length >= 8
          ) {
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
      {isLoading && (
        <div className="w-full h-full absolute left-0 top-0 bg-[rgba(0,0,0,.5)] backdrop-saturate-50 backdrop-blur-xs flex justify-center items-center">
          <div className="w-40 h-40 flex flex-col justify-center items-center">
            <img
              className="animate-spin size-20"
              style={{ animationDuration: "3s" }}
              src={loadingIcon}
            />
            <h1 className="mt-5 text-2xl font-bold">Signing Up</h1>
            <p className="font-semibold mt-3">Please wait...</p>
          </div>
        </div>
      )}
      {flashType !== null && <FlashMessage type={flashType} />}
    </AuthForm>
  );
}
