"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Breadcrumbs() {
  const path = usePathname();
  const segments = path.split("/").filter(Boolean);
  // const crumbs = segments.map((segment, index) => {
  //   const href = "/" + segments.slice(0, index + 1).join("/");
  //   return { label: segment, href };
  // });

  function formatSegment(segment: string, index: number, segments: string[]) {
    const isLast = index === segments.length - 1;

    const isTransactionDetail =
      segments.length === 3 && segments[1] === "transactions" && isLast;

    if (isTransactionDetail) {
      return "Transaction Draft";
    }

    return segment;
  }

  const crumbs = segments.map((segment, index) => ({
    label: formatSegment(segment, index, segments),
    href: "/" + segments.slice(0, index + 1).join("/"),
  }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            <BreadcrumbItem className="capitalize">
              {crumbs.length > index + 1 ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {crumbs.length > index + 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
