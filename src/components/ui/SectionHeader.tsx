interface SectionHeaderProps {
    title: string;
    description?: string;
    align?: "left" | "center";
    actions?: React.ReactNode;

  }
  
  function SectionHeader({
    title,
    description,
    align = "left",
    actions,
  }: SectionHeaderProps) {
    const alignment =
      align === "center" ? "text-center" : "text-left";
  
      return (
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
    
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      );
  }
  
  export { SectionHeader };