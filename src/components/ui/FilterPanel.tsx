import * as React from "react";
import { Card } from "./Card";

type FilterPanelProps = {
  search?: React.ReactNode;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
};

export function FilterPanel({
  search,
  filters,
  actions,
}: FilterPanelProps) {
  return (
    <Card className="p-5">
      <div className="space-y-4">
        {/* SEARCH */}
        {search && <div>{search}</div>}

        {/* FILTER GRID */}
        {filters && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            {filters}
          </div>
        )}

        {/* ACTIONS */}
        {actions && (
          <div className="flex justify-end">
            {actions}
          </div>
        )}
      </div>
    </Card>
  );
}