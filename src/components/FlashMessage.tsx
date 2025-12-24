import checkIcon from "../assets/icons/check-icon.svg";
import errorIcon from "../assets/icons/error-icon.svg";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

type FlashMessageProps = {
  messageType: "successful" | "error" | null;
};

export default function FlashMessage({ messageType }: FlashMessageProps) {
  return (
    <div className="bg-[rgba(0,0,0,.5)] backdrop-blur-sm w-full h-full absolute left-0 top-0 flex justify-center items-center">
      <h1>{messageType}</h1>
      <div className="px-10 py-10 w-75 min-w-[40%] bg-white flex flex-col justify-center items-center rounded-xl">
        <img
          className="size-30 mb-2"
          src={messageType == "error" ? errorIcon : checkIcon}
        />
        <h1
          className={`${
            messageType === "error" ? "text-[#f34949]" : "text-blue-600"
          } font-black text-3xl`}
        >
          {messageType === "error" ? "Error" : "Success"}
        </h1>
        <p className="text-gray-600 text-md font- mt-3 line-clamp-2">
          Account created successfully! <br /> You're all set to explore
        </p>
        <Link
          to={`${messageType === "error" ? "/auth/sign-up" : "/auth/sign-in"}`}
        >
          <Button
            variant="contained"
            sx={{
              py: 1,
              mt: 5,
              backgroundColor: messageType === "error" ? "#f34949" : "#3182ce",
            }}
          >
            {messageType === "error" ? "Try Again" : "Continue"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
