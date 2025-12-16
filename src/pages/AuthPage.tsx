import { useState } from "react";
import { images } from "../constants/images";
import useWindowSize from "../hooks/useWindowSize";
import SignInForm from "../forms/SignInForm";
import SignUpForm from "../forms/SignUpForm";

type Mode = "signIn" | "signUp";

export default function AuthPage() {
  const { width } = useWindowSize();
  const [mode, setMode] = useState<Mode>("signIn");

  return (
    <div className="flex w-full min-h-screen">
      {width > 700 && (
        <div
          className="w-1/2 bg-cover flex justify-center items-center"
          style={{ backgroundImage: `url(${images.signInBg})` }}
        >
          <div className="text-white">
            <h1 className="text-5xl font-black">LearnTrack</h1>
            <p className="mt-4">
              Track your learning. Organize your skills.
              <br />
              See your progress
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center items-center w-full bg-white px-10 relative">
        {/* Mobile banner */}
        {width <= 700 && (
          <div
            className="sticky left-0 top-0 flex flex-col justify-stretch items-center font-black text-3xl h-[20%] w-full p-5 py-3 bg-center bg-cover bg-no-repeat z-50"
            style={{ backgroundImage: `url(${images.signInBg})` }}
          >
            <h2>LearnTrack</h2>
            <p className="text-xs text-center m-2 font-normal">
              Track your learning. Organize your skills. <br />
              See your progress
            </p>
          </div>
        )}
        {mode === "signIn" ? <SignInForm /> : <SignUpForm />}

        <p
          className="text-blue-500 cursor-pointer mt-5 hover:underline"
          onClick={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
        >
          {mode === "signIn" ? "Create account" : "Already have an account?"}
        </p>
      </div>
    </div>
  );
}
