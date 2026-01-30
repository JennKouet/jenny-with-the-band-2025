import React from "react";
import Link from "next/link";

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  path?: string
}
const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, className, path }) => {
  return (
    <Link href={path || ""} rel="noopener noreferrer">
    <button
      onClick={onClick}
      className={`bg-black text-[#ebe9db] border border-red-600 font-bold py-2 px-4 rounded-md ${className}`}
    >
      {text}
    </button>
    </Link>
  );
}
export default CustomButton;