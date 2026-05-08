import { Icon, LucideIcon } from "lucide-react";

type SummaryCardItemProps = {
  label: string;
  value: string | number;
  valueColor?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  };
  
  export const SummaryCardItem = ({
    label,
    value,
    valueColor = "text-gray-900",
    icon: Icon,
    iconColor = "text-gray-500",
    iconBgColor = "bg-gray-200",
  }: SummaryCardItemProps) => {
    return (
    <div className="p-4 bg-gray-50 rounded-lg text-center">
      
      {/* Header row */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <p className="text-sm font-medium text-gray-600">
          {label}
        </p>

        <div
          className={`w-9 h-9 flex items-center justify-center rounded-md ${iconBgColor}`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>

      {/* Value */}
      <p className={`text-2xl font-semibold ${valueColor}`}>
        {value}
      </p>
    </div>
    );
  };