type SummaryCardItemProps = {
    label: string;
    value: string | number;
    valueColor?: string;
  };
  
  export const SummaryCardItem = ({
    label,
    value,
    valueColor = "text-gray-900",
  }: SummaryCardItemProps) => {
    return (
      <div className="p-4 bg-gray-50 rounded-lg text-center">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className={`text-2xl font-semibold ${valueColor}`}>
          {value}
        </p>
      </div>
    );
  };