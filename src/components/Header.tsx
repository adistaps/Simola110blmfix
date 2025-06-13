
import { Bell, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const navigate = useNavigate();
  const [notificationCount] = useState(3);

  // Sample notifications data with report IDs
  const notifications = [
    {
      id: 1,
      title: "Laporan Baru",
      message: "Laporan kecelakaan di Jl. Malioboro",
      time: "5 menit yang lalu",
      type: "new",
      reportId: "RPT001"
    },
    {
      id: 2,
      title: "Status Update",
      message: "Laporan RPT002 telah diproses",
      time: "15 menit yang lalu",
      type: "update",
      reportId: "RPT002"
    },
    {
      id: 3,
      title: "Laporan Darurat",
      message: "Kebakaran di Jl. Sultan Agung",
      time: "30 menit yang lalu",
      type: "urgent",
      reportId: "RPT004"
    }
  ];

  const handleNotificationClick = (reportId: string) => {
    navigate(`/reports/${reportId}`);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <h3 className="font-semibold">Notifikasi</h3>
                <p className="text-sm text-gray-500">{notificationCount} notifikasi baru</p>
              </div>
              {notifications.map((notification) => (
                <DropdownMenuItem 
                  key={notification.id} 
                  className="p-3 border-b cursor-pointer"
                  onClick={() => handleNotificationClick(notification.reportId)}
                >
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{notification.title}</span>
                      {notification.type === "urgent" && (
                        <Badge variant="destructive" className="text-xs">Darurat</Badge>
                      )}
                      {notification.type === "new" && (
                        <Badge className="text-xs bg-blue-500">Baru</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-400">{notification.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
              <div className="p-2">
                <Button variant="ghost" className="w-full text-sm">
                  Lihat Semua Notifikasi
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleProfileClick}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <span className="mr-2">⚙️</span>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <span className="mr-2">🚪</span>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
