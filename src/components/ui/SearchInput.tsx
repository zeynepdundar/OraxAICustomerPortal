import { Search } from "lucide-react";
import { Input } from "./Input";

type SearchInputProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchInput({
  label,
  value,
  onChange,
  placeholder,
}: SearchInputProps) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10"
        />
      </div>
    </div>
  );
}