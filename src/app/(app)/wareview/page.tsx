"use client";

import { useRouter } from "next/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTranslations } from "next-intl";


export default function WareViewPage() {
  const router = useRouter();
  const t = useTranslations("customers");
  const common = useTranslations("common");




  return (
    <div className="p-8 space-y-6">
      <SectionHeader
        title={"WareView"}
        description={t("description")}

        
      />
    </div>
  );
}
