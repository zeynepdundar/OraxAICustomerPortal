import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

function Input({
  type = "text",
  label,
  error,
  hint,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id || React.useId();

  const baseClasses =
    "w-full h-9 px-3 py-1 text-sm rounded-md border outline-none transition " +
    "bg-white border-gray-300 placeholder:text-gray-400 " +
    "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const errorClasses = error
    ? " border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500"
    : "";

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        aria-invalid={!!error}
        className={baseClasses + errorClasses + " " + className}
        {...props}
      />

      {hint && !error && (
        <p className="text-xs text-gray-500">{hint}</p>
      )}

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

export { Input };