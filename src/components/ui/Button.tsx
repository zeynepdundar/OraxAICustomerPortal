import * as React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  let classes =
    "inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

  if (variant === "primary") {
    classes += " bg-brand-500 text-white hover:bg-brand-600 shadow-sm";
  } else if (variant === "secondary") {
    classes += " bg-gray-100 text-gray-700 hover:bg-gray-200";
  } else if (variant === "success") {
    classes += " bg-success-600 text-white hover:bg-success-700 shadow-sm";
  } else if (variant === "outline") {
    classes += " bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300 shadow-sm";
  }
  else if (variant === "ghost") {
    classes += " text-gray-600 hover:bg-gray-100";
  }

  if (size === "sm") {
    classes += " h-8 px-3 text-sm";
  } else if (size === "md") {
    classes += " h-9 px-4 text-sm";
  } else if (size === "lg") {
    classes += " h-10 px-6 text-base";
  }

  return (
    <button className={classes + " " + className} {...props}>
      {children}
    </button>
  );
}

export { Button };
