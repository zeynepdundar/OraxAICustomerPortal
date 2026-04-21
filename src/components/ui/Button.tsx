import * as React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  // base
  let classes =
    "inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

  // variants
  if (variant === "primary") {
    classes += " bg-blue-600 text-white hover:bg-blue-700";
  } else if (variant === "secondary") {
    classes += " bg-gray-100 text-gray-900 hover:bg-gray-200";
  } else if (variant === "outline") {
    classes += " border border-gray-300 text-gray-700 hover:bg-gray-50";
  } else if (variant === "ghost") {
    classes += " text-gray-700 hover:bg-gray-100";
  }

  // sizes
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