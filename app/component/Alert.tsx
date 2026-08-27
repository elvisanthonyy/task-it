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
      onClick={() => (isAlertVisble = false)}
      className={`transition-all shadow-sm duration-300 ease-in-out flex text-black text-sm justify-center items-center z-130 w-[80%] fixed top-5 ${
        isAlertVisble ? "translate-y-1" : "-translate-y-40"
      } left-[50%] -translate-x-[50%] h-[54px] md:w-80 md:absolute bg-white rounded-[32px]`}
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
