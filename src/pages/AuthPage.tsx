import { Outlet } from "react-router-dom";
import { useState } from "react";
import { images } from "../constants/images";
import useWindowSize from "../hooks/useWindowSize";
// import SignInForm from "../forms/SignInForm";
// import SignUpForm from "../forms/SignUpForm";

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
          <div className="absolute w-full h-full bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"></div>
          <div className="absolute left-0 top-0 h-1/2 w-full bg-linear-to-b from-[rgba(167,185,255,0.3)]"></div>

          <div className="absolute left-0 bottom-0 h-1/2 w-full bg-linear-to-t from-[rgba(8,14,40,0.6)]"></div>
          <div className="text-white flex justify-center items-center brightness-1000">
            <img
              className="w-[calc(90px+1vw)] select-none"
              draggable={false}
              src={images.learnTrackLogo}
            />
            <div className="flex flex-col mt-2 backdrop-blur-2xl">
              <h1 className="text-shadow-[rgba(255,255,255,.1)] text-shadow-lg text-[calc(40px+1vw)] leading-8 select-none">
                <span className="font-black">Learn</span>Track
              </h1>
              <p className="mt-4 text-[calc(5px+1vw)] select-none">
                Track . Organize . Progress
              </p>
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
          {/* {mode === "signIn" ? <SignInForm /> : <SignUpForm />} */}
          <Outlet/>
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
