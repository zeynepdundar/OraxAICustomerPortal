"use client";

import { Sparkles } from "lucide-react";

type AskAIButtonProps = {
  context?: string;
  onClick?: () => void;
  size?: "sm" | "md";
  className?: string;
};

export function AskAIButton({
  context,
  onClick,
  size = "sm",
  className = "",
}: AskAIButtonProps) {
  const handleClick = () => {
    // future: send to AI service
    console.log("AI Context:", context);
    onClick?.();
  };

  const baseStyles =
    "inline-flex items-center rounded-md border transition-colors";

  const sizeStyles =
    size === "sm"
      ? "gap-1 px-2 py-1 text-xs"
      : "gap-2 px-3 py-2 text-sm";

  const colorStyles =
    "text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100";

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles} ${colorStyles} ${className}`}
      title="Ask AI"
      type="button"
    >
      <Sparkles className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      <span>Ask AI</span>
    </button>
  );
}