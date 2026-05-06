import React from "react";
import Link from "next/link";

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  path?: string;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  className = "",
  path,
  href,
  target,
}) => {
  const buttonClassName = `bg-black text-[#ebe9db] border border-red-600 font-bold py-2 px-4 rounded-md ${className}`;
  const linkHref = href || path;

  if (linkHref && target === "_blank") {
    return (
      <a href={linkHref} target={target} rel="noopener noreferrer" className={buttonClassName}>
        {text}
      </a>
    );
  }

  if (linkHref) {
    return (
      <Link href={linkHref} className={buttonClassName}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonClassName}
    >
      {text}
    </button>
  );
}
export default CustomButton;
