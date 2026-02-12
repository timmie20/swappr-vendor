import { LayoutDashboard, ShoppingCart, Truck, Package } from "lucide-react";

export const navItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: <LayoutDashboard />,
  },
  {
    title: "Products",
    url: "/products",
    icon: <ShoppingCart />,
  },
  // {
  //   title: "Categories",
  //   url: "/categories",
  //   icon: <TbTag />,
  // },
  // {
  //   title: "Customers",
  //   url: "/customers",
  //   icon: <LuUsers2 />,
  // },
  {
    title: "Orders",
    url: "/orders",
    icon: <Truck />,
  },
  {
    title: "Swap Request",
    url: "/swap-request",
    icon: <Package />,
  },
  // {
  //   title: "Coupons",
  //   url: "/coupons",
  //   icon: <RiCoupon2Line />,
  // },
  // {
  //   title: "Staff",
  //   url: "/staff",
  //   icon: <TbBriefcase />,
  // },
];
