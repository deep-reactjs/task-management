import clsx from "clsx";
import React from "react";

const Button = ({
  variant = "primary",
  prefixIcon,
  suffixIcon,
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    primary:
      "bg-indigo-900 active:bg-indigo-900 text-white enabled:hover:bg-indigo-900/80",
    secondary:
      "bg-gray-300 text-black hover:bg-gray-200 enabled:active:bg-gray-400",
  };

  const buttonClass = clsx(
    "inline-flex items-center gap-1 rounded enabled:ease-in-out duration-200 disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1.5 text-sm font-semibold leading-6 rounded-xl",
    variantClasses[variant],
    className
  );

  return (
    <button className={buttonClass} {...props}>
      {prefixIcon && <span>{prefixIcon}</span>}
      {children}
      {suffixIcon && <span>{suffixIcon}</span>}
    </button>
  );
};

export default Button;
