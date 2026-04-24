import { Button } from "./Button";

interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  actions?: HeaderAction[];
}

type HeaderAction = {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
};

function SectionHeader({
  title,
  description,
  align = "left",
  actions,
}: SectionHeaderProps) {
  const alignment =
    align === "center" ? "text-center" : "text-left";

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2">
          {actions.map((action, i) => (
            <Button
              key={i}
              variant={action.variant === "secondary" ? "outline" : "primary"}
              onClick={action.onClick}
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export { SectionHeader };