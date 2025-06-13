
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertTriangle, FileText } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Reports",
      value: "1,234",
      change: "+10%",
      isPositive: true,
      icon: FileText,
    },
    {
      title: "Success Rate",
      value: "95%",
      change: "-5%",
      isPositive: false,
      icon: TrendingUp,
    },
    {
      title: "Total Errors",
      value: "50",
      change: "+2%",
      isPositive: true,
      icon: AlertTriangle,
    },
    {
      title: "Weekly Reports",
      value: "250",
      change: "+15%",
      isPositive: true,
      icon: FileText,
    },
  ];

  const recentActivities = [
    {
      title: "Emergency Report Received",
      id: "Report ID: 12345",
      time: "5 min ago",
    },
    {
      title: "Crime Report Updated",
      id: "Report ID: 67890",
      time: "10 min ago",
    },
    {
      title: "Information Report Processed",
      id: "Report ID: 11223",
      time: "15 min ago",
    },
    {
      title: "Accident Report Closed",
      id: "Report ID: 44556",
      time: "20 min ago",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header title="Dashboard" />
        
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className={`text-xs ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Report Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-2xl font-bold">1234</div>
                  <div className="text-sm text-gray-600">Total +10%</div>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-blue-600">Emergency</span>
                    <span className="text-red-600">Crime</span>
                    <span className="text-green-600">Information</span>
                    <span className="text-yellow-600">Accidents</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Report Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-2xl font-bold">250</div>
                  <div className="text-sm text-gray-600">Last 4 Weeks +15%</div>
                  <div className="flex space-x-4 text-sm">
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.id}</p>
                    </div>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
