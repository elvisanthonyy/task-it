"use client";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";

interface ChildProps {
  message: string;
  isAlertVisble: boolean;
  alertType: string;
}

const Alert = ({ message, isAlertVisble, alertType }: ChildProps) => {
  return (
    <div
      className={`transition-all nx:w-[70%] shadow-2xl duration-300 ease-in-out flex text-black text-sm justify-center items-center z-100 w-[90%] fixed top-4 ${
        isAlertVisble ? "translate-y-1" : "-translate-y-40"
      } left-[50%] -translate-x-[50%] h-18 md:w-[50%] md:h-20 md:absolute bg-white rounded-lg`}
    >
      <div className="absolute top-0 left-8 flex h-full w-fit items-center">
        {alertType === "okay" ? (
          <FaCheckCircle className="text-green-500 text-xl md:text-2xl" />
        ) : (
          <FaTimesCircle className="text-red-600 text-xl md:text-2xl" />
        )}
      </div>
      <div>{message}</div>
    </div>
  );
};

export default Alert;
