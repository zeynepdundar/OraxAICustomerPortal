import type { LucideIcon } from "lucide-react";

type Variant = "blue" | "green" | "orange" | "purple";

const variantStyles = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
  },
  green: {
    bg: "bg-green-50",
    icon: "text-green-600",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-600",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
  },
};



type MetricCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: Variant;
  aiContext?: string;
};

export function MetricCard({
  title,
  value,
  icon: Icon,
  variant = "blue",
}: MetricCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-xl">
      <div className="flex items-start justify-between">
        {/* Left */}
        <div>
          <p className="text-xs text-gray-500 mb-2">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>

        {/* Right (ICON HERE) */}
        <div className={`p-2.5 rounded-lg ${styles.bg}`}>
          <Icon className={`w-5 h-5 ${styles.icon}`} />
        </div>
      </div>
    </div>
  );
}