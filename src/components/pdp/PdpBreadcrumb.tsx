import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PdpBreadcrumbProps {
  categoryName: string;
  subCategoryName: string;
  title: string;
}

export const PdpBreadcrumb: React.FC<PdpBreadcrumbProps> = ({
  categoryName,
  subCategoryName,
  title,
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 py-4 text-xs text-gray-500 overflow-hidden"
    >
      <Link href="#" className="hover:text-black transition-colors shrink-0">
        Home
      </Link>
      <ChevronRight className="h-3 w-3 shrink-0 text-gray-400" />
      <Link href="#" className="hover:text-black transition-colors shrink-0">
        {categoryName}
      </Link>
      <ChevronRight className="h-3 w-3 shrink-0 text-gray-400" />
      <Link href="#" className="hover:text-black transition-colors shrink-0">
        {subCategoryName}
      </Link>
      <ChevronRight className="h-3 w-3 shrink-0 text-gray-400" />
      <span className="truncate text-black font-medium">{title}</span>
    </nav>
  );
};
