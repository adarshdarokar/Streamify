import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import useLogout from "../hooks/useLogout";
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";
import { useState } from "react";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  const [hoverPopup, setHoverPopup] = useState(false);

  const { data } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const incomingRequests =
    data?.incomingReqs || data?.incomingRequests || data?.incoming || [];

  const unseenCount = incomingRequests.length;

  return (
    <>
      {/* NAVBAR — Premium Dark Theme + Smooth Fade */}
      <nav
        className="
          sticky top-0 z-[60] h-16 flex items-center
          border-b border-white/10 shadow-sm relative
        "
        style={{
          background: "linear-gradient(180deg, #1f2937 0%, #111827 100%)",
        }}
      >
        {/* Fade separator */}
        <div
          className="absolute bottom-[-14px] left-0 w-full h-5 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(17,24,39,0.95), rgba(243,244,246,0))",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-[2]">
          <div className="flex items-center justify-between w-full">

            {/* LOGO */}
            {isChatPage && (
              <div className="pl-3">
                <Link to="/" className="flex items-center gap-2.5">
                  <ShipWheelIcon className="size-8 text-white" />
                  <span className="text-3xl font-bold font-mono text-white">
                    Streamify
                  </span>
                </Link>
              </div>
            )}

            {/* RIGHT SIDE BUTTONS */}
            <div className="flex items-center gap-5 ml-auto">

              {/* NOTIFICATIONS */}
              <Link to="/notifications" className="relative">
                <button
                  className="
                    p-2 rounded-xl bg-white/5 border border-white/10
                    hover:bg-white/10 transition-all duration-150
                  "
                >
                  <BellIcon className="h-5 w-5 text-gray-300" />
                </button>

                {unseenCount > 0 && (
                  <span
                    className="absolute top-1.5 right-1.5 w-3 h-3 
                    bg-red-500 rounded-full shadow-md"
                  ></span>
                )}
              </Link>

              {/* AVATAR */}
              <div
                className="cursor-pointer"
                onMouseEnter={() => setHoverPopup(true)}
                onMouseLeave={() => setHoverPopup(false)}
              >
                <div
                  className="
                    w-9 h-9 rounded-full ring-2 ring-primary ring-offset-2 
                    ring-offset-[#1f2937] transition-all duration-150
                    hover:scale-[1.03]
                  "
                >
                  <img
                    src={authUser?.profilePic}
                    className="rounded-full w-full h-full object-cover"
                    alt="User Avatar"
                  />
                </div>
              </div>

              {/* LOGOUT */}
              <button
                className="
                  p-2 rounded-xl bg-white/5 border border-white/10
                  hover:bg-white/10 transition-all duration-150
                "
                onClick={logoutMutation}
              >
                <LogOutIcon className="h-5 w-5 text-gray-300" />
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* PROFILE POPUP ZOOM */}
      {hoverPopup && (
        <div className="fixed inset-0 top-16 flex items-center justify-center z-[40] pointer-events-none">
          <div className="bg-black/40 absolute inset-0"></div>

          <img
            src={authUser?.profilePic}
            alt="Profile Large"
            className="
              w-60 h-60 sm:w-72 sm:h-72 rounded-full
              object-cover shadow-xl border-4 border-white
            "
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
