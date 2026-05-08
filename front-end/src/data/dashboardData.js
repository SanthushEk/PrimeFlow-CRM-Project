// data/dashboardData.js

import {
  Users,
  UserPlus,
  BadgeCheck,
  Trophy,
  XCircle,
  DollarSign,
  Wallet,
} from "lucide-react";

export const stats = [
  {
    title: "Total Leads",
    value: "1,284",
    growth: "+12.5%",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "New Leads",
    value: "324",
    growth: "+8.2%",
    icon: UserPlus,
    color: "bg-indigo-500",
  },
  {
    title: "Qualified Leads",
    value: "198",
    growth: "+4.1%",
    icon: BadgeCheck,
    color: "bg-emerald-500",
  },
  {
    title: "Won Leads",
    value: "86",
    growth: "+15.3%",
    icon: Trophy,
    color: "bg-green-500",
  },
  {
    title: "Lost Leads",
    value: "34",
    growth: "-2.4%",
    icon: XCircle,
    color: "bg-rose-500",
  },
  {
    title: "Estimated Deal",
    value: "$245K",
    growth: "+18.7%",
    icon: DollarSign,
    color: "bg-orange-500",
  },
  {
    title: "Won Deal Value",
    value: "$142K",
    growth: "+21.1%",
    icon: Wallet,
    color: "bg-violet-500",
  },
];