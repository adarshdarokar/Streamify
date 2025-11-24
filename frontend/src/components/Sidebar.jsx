import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { Bell, Home, Compass, Users, Settings } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItem = (to, Icon, label) => {
    const isActive = currentPath === to;

    return (
      <Link
        to={to}
        className={`
          flex items-center gap-3 w-full px-4 py-2 rounded-lg
          transition-all duration-150     /* 🔹 Fast + subtle */
          ${isActive
            ? "bg-white/10 text-white"
            : "text-gray-300 hover:bg-white/5 hover:text-white hover:scale-[1.01]"
          }
        `}
      >
        <Icon className="size-5" />
        <span className="text-sm">{label}</span>
      </Link>
    );
  };

  return (
    <aside
      className="
        w-64 hidden lg:flex flex-col h-screen sticky top-0
        border-r border-white/10
      "
      style={{
        background:
          "linear-gradient(180deg, #1f2937, #111827)",   // 🔹 Clean dark theme
      }}
    >
      {/* LOGO */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link className="flex items-center gap-2 select-none" to="/">
          <Compass className="size-6 text-white" />
          <span className="font-semibold text-[18px] tracking-tight text-white">
            Streamify
          </span>
        </Link>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItem("/", Home, "Home")}
        {menuItem("/friends", Users, "Friends")}
        {menuItem("/notifications", Bell, "Notifications")}
        {menuItem("/settings", Settings, "Settings")}
      </nav>

      {/* USER FOOTER */}
      <div className="p-4 border-t border-white/10 mt-auto">
        <div className="flex items-center gap-3">

          <div className="avatar">
            <div className="w-11 rounded-full ring-2 ring-primary/40">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>

          <div className="flex-1 text-white">
            <p className="font-semibold text-sm truncate">
              {authUser?.fullName}
            </p>

            <p className="text-xs flex items-center gap-1 text-green-400">
              <span className="size-2 rounded-full bg-green-400 inline-block" />
              Online
            </p>
          </div>

        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
