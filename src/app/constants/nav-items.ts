export type NavItem = {
  title: string;
  href: string;
  icon: string;

  className: string;
};
export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    className: "text-lime-700 dark:text-lime-500",
  },
  {
    title: "Todos",
    href: "/dashboard/todos",
    icon: "todo",
    className: "text-[#8544a0] dark:text-purple-500",
  },
  // {
  //   title: "Upcoming Todos",
  //   href: "/dashboard/upcoming-todos",
  //   icon: "arrowRight",
  //   className: "text-sky-800 dark:text-sky-400",
  // },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: "calendar",
    className: "text-pink-800 dark:text-pink-400",
  },
  {
    title: "Sticky Notes",
    href: "/dashboard/notes",
    icon: "notes",
    className: "text-yellow-600 dark:text-yellow-500",
  },
];
