interface SectionHeaderProps {
    title: string;
    description?: string;
    align?: "left" | "center";
  }
  
  function SectionHeader({
    title,
    description,
    align = "left",
  }: SectionHeaderProps) {
    const alignment =
      align === "center" ? "text-center" : "text-left";
  
    return (
      <div className={alignment}>
        <h1 className="text-2xl font-semibold text-gray-900">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        )}
      </div>
    );
  }
  
  export { SectionHeader };