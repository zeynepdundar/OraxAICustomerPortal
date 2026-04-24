
type BadgeVariant = "plain" | "outline";

export type BadgeTone = "green" | "orange" | "blue" | "red" | "gray";

type BadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
  variant?: BadgeVariant;
  className?: string;
};

const toneClasses: Record<BadgeTone, { plain: string; outline: string }> = {
  green: {
    plain: "bg-green-100 text-green-700",
    outline: "bg-transparent text-green-700 border border-green-200",
  },
  orange: {
    plain: "bg-orange-100 text-orange-700",
    outline: "bg-transparent text-orange-700 border border-orange-200",
  },
  blue: {
    plain: "bg-blue-100 text-blue-700",
    outline: "bg-transparent text-blue-700 border border-blue-200",
  },
  red: {
    plain: "bg-red-100 text-red-700",
    outline: "bg-transparent text-red-700 border border-red-200",
  },
  gray: {
    plain: "bg-gray-100 text-gray-700",
    outline: "bg-transparent text-gray-700 border border-gray-200",
  },
};

export function Badge({
  children,
  tone = "gray",
  variant = "plain",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${toneClasses[tone][variant]} ${className}`.trim()}
    >
      {children}
    </span>
  );
}