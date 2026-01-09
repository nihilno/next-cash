import { ArrowLeftRight, PanelTopIcon, PlusCircle } from "lucide-react";

export const navLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: PanelTopIcon,
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: ArrowLeftRight,
  },
  {
    label: "Add new transaction",
    href: "/dashboard/transactions/new",
    icon: PlusCircle,
  },
];
