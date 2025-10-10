import React, { useState } from "react";
import {
  BookOpen,
  Bot,
  Users,
  Download,
  Globe,
  Upload,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  FileText,
  Video,
  Image,
  Calendar,
  MessageSquare,
  TrendingUp,
  Clock,
  Award,
  Wifi,
  WifiOff,
} from "lucide-react";

interface QuickAction {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface RecentActivity {
  type: string;
  title: string;
  time: string;
  icon: React.ReactNode;
}

interface Resource {
  title: string;
  subject: string;
  grade: string;
  downloads: number;
  type: string;
}

const TeacherDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  const quickActions: QuickAction[] = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Lesson Assistant",
      description: "Generate lesson plans and notes",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Share Resources",
      description: "Upload your teaching materials",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Translate Content",
      description: "Adapt to local language",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Offline Sync",
      description: "Download for offline access",
      color: "from-orange-500 to-red-500",
    },
  ];

  const recentActivities: RecentActivity[] = [
    {
      type: "download",
      title: "Downloaded Math Grade 5 - Fractions",
      time: "2 hours ago",
      icon: <Download className="w-4 h-4" />,
    },
    {
      type: "collaboration",
      title: "Connected with Priya Kumar (Science)",
      time: "5 hours ago",
      icon: <Users className="w-4 h-4" />,
    },
    {
      type: "ai",
      title: "Generated lesson notes for English",
      time: "1 day ago",
      icon: <Bot className="w-4 h-4" />,
    },
    {
      type: "upload",
      title: "Shared Social Studies resources",
      time: "2 days ago",
      icon: <Upload className="w-4 h-4" />,
    },
  ];

  const trendingResources: Resource[] = [
    {
      title: "Mathematics - Algebra Basics",
      subject: "Math",
      grade: "Grade 8",
      downloads: 1247,
      type: "PDF",
    },
    {
      title: "Science - Plant Biology",
      subject: "Science",
      grade: "Grade 6",
      downloads: 892,
      type: "Video",
    },
    {
      title: "English Grammar Worksheets",
      subject: "English",
      grade: "Grade 7",
      downloads: 756,
      type: "PDF",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg fixed top-0 w-full z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              <span className="text-xl font-bold hidden sm:block">
                Teachers Connect
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources, teachers, subjects..."
                className="w-full pl-10 pr-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              {isOnline ? (
                <Wifi className="w-4 h-4" />
              ) : (
                <WifiOff className="w-4 h-4" />
              )}
              <span className="text-sm hidden sm:inline">
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
            <button className="relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button className="hidden sm:block">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static w-64 bg-white h-[calc(100vh-4rem)] shadow-lg transition-transform duration-300 z-40 overflow-y-auto`}
        >
          <div className="p-6">
            {/* User Profile */}
            <div className="flex items-center gap-3 pb-6 border-b">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                RK
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Raj Kumar</h3>
                <p className="text-sm text-gray-500">Mathematics Teacher</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-6 space-y-2">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 bg-violet-50 text-violet-600 rounded-lg font-medium"
              >
                <TrendingUp className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <BookOpen className="w-5 h-5" />
                <span>Resource Library</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Bot className="w-5 h-5" />
                <span>AI Assistant</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Users className="w-5 h-5" />
                <span>Teacher Network</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Download className="w-5 h-5" />
                <span>Offline Manager</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Globe className="w-5 h-5" />
                <span>Translation Center</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Calendar className="w-5 h-5" />
                <span>My Schedule</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Messages</span>
              </a>
            </nav>

            {/* Logout */}
            <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full mt-6">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-0">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl p-8 text-white mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome back, Raj! 👋</h1>
              <p className="text-lg opacity-90">
                Ready to make a difference today? Here's your teaching
                dashboard.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500 text-sm">
                    Resources Downloaded
                  </span>
                  <Download className="w-5 h-5 text-violet-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800">47</div>
                <div className="text-sm text-green-600 mt-1">
                  ↑ 12 this week
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500 text-sm">
                    Teacher Connections
                  </span>
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800">23</div>
                <div className="text-sm text-green-600 mt-1">↑ 3 new</div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500 text-sm">
                    Resources Shared
                  </span>
                  <Upload className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800">12</div>
                <div className="text-sm text-gray-500 mt-1">856 downloads</div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500 text-sm">AI Assists Used</span>
                  <Bot className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800">34</div>
                <div className="text-sm text-green-600 mt-1">↑ 8 this week</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition-all text-left"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center text-white mb-3`}
                    >
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {action.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Recent Activity
                  </h2>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
                      >
                        <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center text-violet-600 flex-shrink-0">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800">{activity.title}</p>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trending Resources */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                      Trending Resources
                    </h2>
                    <TrendingUp className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="space-y-3">
                    {trendingResources.map((resource, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-violet-100 to-purple-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-violet-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">
                            {resource.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{resource.subject}</span>
                            <span>•</span>
                            <span>{resource.grade}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-violet-600">
                            {resource.downloads}
                          </div>
                          <div className="text-xs text-gray-500">downloads</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Widgets */}
              <div className="space-y-6">
                {/* Today's Schedule */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Today's Schedule
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-violet-50 rounded-lg">
                      <div className="w-2 h-12 bg-violet-500 rounded-full"></div>
                      <div>
                        <div className="font-medium text-gray-800">
                          Math - Grade 7
                        </div>
                        <div className="text-sm text-gray-500">
                          9:00 AM - 10:00 AM
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-12 bg-blue-500 rounded-full"></div>
                      <div>
                        <div className="font-medium text-gray-800">
                          Science - Grade 8
                        </div>
                        <div className="text-sm text-gray-500">
                          11:00 AM - 12:00 PM
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-12 bg-green-500 rounded-full"></div>
                      <div>
                        <div className="font-medium text-gray-800">
                          Math - Grade 6
                        </div>
                        <div className="text-sm text-gray-500">
                          2:00 PM - 3:00 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl shadow-sm p-6 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Your Impact</h2>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-3xl font-bold">2,847</div>
                      <div className="text-sm opacity-90">
                        Total resource views
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">156</div>
                      <div className="text-sm opacity-90">Teachers helped</div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="text-sm opacity-90">
                        You're in the top 10% of contributors! 🎉
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
