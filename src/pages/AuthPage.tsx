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
    <div className="flex w-full min-h-screen max-h-screen overflow-y-hidden">
      {width > 700 && (
        <div
          className="w-full bg-cover flex justify-center items-center"
          style={{ backgroundImage: `url(${images.signInBg})` }}
        >
          <div className="text-white flex justify-center items-center brightness-1000">
            <img
              className="w-30 mr-2 select-none"
              draggable={false}
              src={images.learnTrackLogo}
            />
            <div className="flex flex-col">
              <h1 className="text-6xl font-bold leading-8">LearnTrack</h1>
              <p className="mt-4 text-2xl">Track . Organize . Progress</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center items-center w-full bg-white relative">
        {/* Mobile banner */}
        {width <= 700 && (
          <div
            className="sticky left-0 top-0 w-full flex flex-col justify-center items-center font-black text-3xl h-[20%] p-5 py-3 bg-center bg-cover bg-no-repeat z-50"
            style={{ backgroundImage: `url(${images.signInBg})` }}
          >
            <h2>LearnTrack</h2>
            <p className="text-xs text-center m-2 font-normal">
              Track your learning. Organize your skills. <br />
              See your progress
            </p>
          </div>
        )}
        <div className="w-full border flex flex-col justify-center items-center relative">
          {mode === "signIn" ? <SignInForm /> : <SignUpForm />}
          <p
            className="text-blue-500 absolute bottom-5 cursor-pointer mt-5 hover:underline"
            onClick={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
          >
            {mode === "signIn" ? "Create account" : "Already have an account?"}
          </p>
        </div>
        {mode === "signIn" && (
          <p className="absolute bottom-[10%] text-blue-500 mt-32 cursor-pointer hover:underline active:underline active:translate-y-1">
            Forgot Password?
          </p>
        )}
      </div>
    </div>
  );
}
