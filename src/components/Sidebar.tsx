
import { Home, FileText, Users, Settings, BarChart3, Download, MessageSquare, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: Users, label: "Users", path: "/users" },
    { icon: BarChart3, label: "Statistics", path: "/statistics" },
    { icon: Download, label: "Download Reports", path: "/download" },
    { icon: MessageSquare, label: "Feedback", path: "/feedback" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-lg font-bold text-gray-900">SIMOLA 110</h1>
        <p className="text-sm text-gray-600 opacity-75">POLDA Daerah Istimewa Yogyakarta</p>
      </div>

      {/* Menu Items */}
      <nav className="mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-none transition-colors",
                isActive
                  ? "bg-gray-100 text-gray-900 border-r-2 border-blue-500"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
