// /components/metrics/MetricCard.tsx

import { Card, CardContent } from "@/components/ui/Card";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
  bgColor?: string;
  aiContext?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  color = "text-blue-600",
  bgColor = "bg-blue-50",
  aiContext,
}: MetricCardProps) {
  return (
    <Card className="bg-white border border-gray-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-2">{title}</p>
            <p className="text-2xl font-semibold text-gray-900">
              {value}
            </p>
          </div>

          {Icon && (
            <div className={`p-2.5 rounded-lg ${bgColor}`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
          )}
        </div>

        {aiContext && (
          <div className="mt-4">
          </div>
        )}
      </CardContent>
    </Card>
  );
}