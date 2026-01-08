import { ArrowLeftRight, PanelTopIcon, PlusCircle } from "lucide-react";

const iconStyle = "cursor-pointer";
export const navLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <PanelTopIcon className={iconStyle} />,
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: <ArrowLeftRight className={iconStyle} />,
  },
  {
    label: "Add new transaction",
    href: "/dashboard/transactions/new",
    icon: <PlusCircle className={iconStyle} />,
  },
];
