import checkIcon from "../assets/icons/check-icon.svg";
import errorIcon from "../assets/icons/error-icon.svg";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

type MessageType = "success" | "error";

type FlashMessageProps = {
  type: MessageType;
  onClose: () => void;
};

const MESSAGE_CONFIG: Record<
  MessageType,
  {
    title: string;
    message: string;
    icon: string;
    color: string;
    buttonText: string;
    redirect: string;
  }
> = {
  success: {
    title: "Success",
    message: "Account created successfully. You are all set to explore.",
    icon: checkIcon,
    color: "#3182ce",
    buttonText: "Continue",
    redirect: "/auth/sign-in",
  },
  error: {
    title: "Error",
    message: "Something went wrong. Please try again.",
    icon: errorIcon,
    color: "#f34949",
    buttonText: "Try Again",
    redirect: "/auth/sign-up",
  },
};

export default function FlashMessage({ type, onClose }: FlashMessageProps) {
  const config = MESSAGE_CONFIG[type];

  return (
    <div className="bg-[rgba(0,0,0,.5)] backdrop-blur-sm w-full h-full absolute inset-0 flex justify-center items-center">
      <div className="px-5 py-10 min-w-[30%] max-w-[70%] bg-white shadow-md flex flex-col items-center rounded-xl">
        <img className="size-30 mb-2" src={config.icon} alt={config.title} />
        <h1 className="font-black text-3xl" style={{ color: config.color }}>
          {config.title}
        </h1>
        <p className="text-gray-600 text-md mt-3 text-center text-wrap w-[60%] leading-5">
          {config.message}
        </p>

        <Link to={config.redirect}>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{ py: 1, mt: 5, backgroundColor: config.color }}
          >
            {config.buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
}
