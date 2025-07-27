import { IoHome } from "react-icons/io5";
import { RiDashboardHorizontalLine, RiUploadCloud2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { GiArmorUpgrade } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";

const SideBar = ({ IsideBarShown }) => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: <IoHome size={24} />, label: "Home" },
    { path: "/dashboard", icon: <RiDashboardHorizontalLine size={24} />, label: "Dashboard" },
    { path: "/upload-file", icon: <RiUploadCloud2Line size={24} />, label: "Upload" },
    { path: "/upgrade", icon: <GiArmorUpgrade size={24} />, label: "Upgrade" },
    { path: "/profile", icon: <CgProfile size={24} />, label: "Profile" },
  ];

  return (
    <aside
      className={`${
        IsideBarShown ? "flex" : "hidden"
      } transition-all duration-300 ImagerFont h-screen sticky top-0 pb-5 shadow-md border-r border-gray-200 flex-col justify-between bg-white z-50`}
      aria-label="Main sidebar navigation"
    >
      {/* Logo */}
      <div className="flex items-center justify-center my-8">
        <Link to="/about-us" aria-label="Go to Home">
          <img
            src="../GetUri_Online.png"
            alt="GetSrc logo"
            className="object-contain max-w-[120px] h-auto"
            loading="lazy"
            width="120"
            height="120"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-6 items-center" role="navigation" aria-label="Sidebar Navigation">
        {navItems.map(({ path, icon, label }, idx) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={idx}
              to={path}
              aria-label={label}
              className={`group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4ED7DD]
                ${isActive ? "bg-[#4ED7DD]/20 text-[#4ED7DD] shadow-inner" : "text-gray-800 hover:text-white hover:bg-[#4ED7DD]"}`}
            >
              {icon}
              <span
                className="sr-only"
                aria-hidden={isActive ? "false" : "true"}
              >
                {label}
              </span>
              <span className="absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity text-sm whitespace-nowrap bg-black text-white px-2 py-1 rounded-md shadow-md z-10">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;
