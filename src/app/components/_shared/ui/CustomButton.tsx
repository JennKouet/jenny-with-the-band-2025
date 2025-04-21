import React from "react";

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}
const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-black text-[#ebe9db] border border-red-600 font-bold py-2 px-4 rounded-md ${className}`}
    >
      {text}
    </button>
  );
}
export default CustomButton;