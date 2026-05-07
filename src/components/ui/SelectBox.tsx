import * as React from "react";

type SelectOption = {
  value: string;
  label: React.ReactNode;
};

interface SelectBoxProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  error?: string;
  hint?: string;
  options?: SelectOption[];
  onChange?: (value: string) => void;
}

function SelectBox({
  label,
  error,
  hint,
  options,
  onChange,
  id,
  className = "",
  children,
  ...props
}: SelectBoxProps) {
  const selectId = id || React.useId();

  const baseClasses =
    "w-full h-9 px-3 py-1 text-sm rounded-lg border outline-none transition " +
    "bg-white border-gray-200 " +
    "focus-visible:ring-2 focus-visible:ring-brand-500/20 focus-visible:border-brand-500 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const errorClasses = error
    ? " border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500"
    : "";

  return (
    <div className="space-y-1.5 w-full">
      {label ? (
        <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      ) : null}

      <select
        id={selectId}
        aria-invalid={!!error}
        className={baseClasses + errorClasses + " " + className}
        onChange={(event) => onChange?.(event.target.value)}
        {...props}
      >
        {options
          ? options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          : children}
      </select>

      {hint && !error ? <p className="text-xs text-gray-500">{hint}</p> : null}
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}

export { SelectBox };
