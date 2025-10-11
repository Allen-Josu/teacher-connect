import React, { useEffect, useState } from "react";
import {
  Search,
  BookOpen,
  Download,
  Eye,
  Heart,
  Star,
  ChevronDown,
  Grid,
  List,
  SortAsc,
  FileText,
  Video,
  Image,
  File,
  Menu,
  X,
  Bell,
  Settings,
  Upload,
  Bookmark,
  Share2,
  MoreVertical,
  Play,
  TrendingUp,
  Award,
  Check,
} from "lucide-react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export interface Document {
  _id: string;
  entity: string;
  entityId: string;
  documentURL: string;
  username: string;
  imageUrl: string;
  rating: number;
  views: number;
  downloads: number;
  uploadedOn: string;
  tags: string[];
  description: string;
  title: string;
  documentType: string;
  level: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

const ResourceLibrary: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [resources, setResources] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/file-upload?mode=all`);
        setResources(response.data.results || []);
      } catch (error) {
        console.error("Error fetching resources:", error);
        setResources([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(resources);
  

  const categories = [
    { id: "all", name: "All Resources", count: 2847 },
    {
      id: "trending",
      name: "Trending",
      count: 156,
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: "featured",
      name: "Featured",
      count: 89,
      icon: <Award className="w-4 h-4" />,
    },
    {
      id: "saved",
      name: "My Saved",
      count: 23,
      icon: <Bookmark className="w-4 h-4" />,
    },
    {
      id: "uploads",
      name: "My Uploads",
      count: 12,
      icon: <Upload className="w-4 h-4" />,
    },
  ];

  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "Social Studies",
    "Hindi",
    "Computer Science",
  ];

  const grades = [
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
  ];

  const types = ["PDF", "Video", "Image", "Document"];

  const getTypeIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes("pdf")) {
      return <FileText className="w-4 h-4" />;
    } else if (lowerType.includes("video") || lowerType.includes("mp4")) {
      return <Video className="w-4 h-4" />;
    } else if (
      lowerType.includes("image") ||
      lowerType.includes("png") ||
      lowerType.includes("jpg")
    ) {
      return <Image className="w-4 h-4" />;
    }
    return <File className="w-4 h-4" />;
  };

  const getGradientColor = (index: number) => {
    const gradients = [
      "from-violet-500 to-purple-500",
      "from-green-500 to-emerald-500",
      "from-blue-500 to-cyan-500",
      "from-orange-500 to-red-500",
      "from-pink-500 to-rose-500",
      "from-indigo-500 to-purple-500",
    ];
    return gradients[index % gradients.length];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

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
                Resource Library
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button>
              <Bell className="w-6 h-6" />
            </button>
            <button>
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
          } lg:translate-x-0 fixed w-64 bg-white top-16 left-0 h-[calc(100vh-4rem)] shadow-lg transition-transform duration-300 z-40 overflow-y-auto`}
        >
          <div className="p-6">
            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? "bg-violet-50 text-violet-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-500 uppercase">
                  Filters
                </h3>
                <button className="text-xs text-violet-600 hover:text-violet-700">
                  Clear All
                </button>
              </div>

              {/* Subject Filter */}
              <div className="mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-between w-full text-sm font-medium text-gray-700 mb-2"
                >
                  <span>Subject</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div className="space-y-2">
                  {subjects.slice(0, 5).map((subject) => (
                    <label
                      key={subject}
                      className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-800"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                      />
                      <span>{subject}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Grade Filter */}
              <div className="mb-4">
                <button className="flex items-center justify-between w-full text-sm font-medium text-gray-700 mb-2">
                  <span>Grade Level</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="space-y-2">
                  {grades.slice(0, 5).map((grade) => (
                    <label
                      key={grade}
                      className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-800"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                      />
                      <span>{grade}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <button className="flex items-center justify-between w-full text-sm font-medium text-gray-700 mb-2">
                  <span>Resource Type</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="space-y-2">
                  {types.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-800"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Upload Button */}
            <div className="border-t pt-6">
              <button className="w-full bg-gradient-to-r from-violet-500 to-purple-500 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Resource
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Explore Teaching Resources
              </h1>
              <p className="text-gray-600">
                Discover and download quality materials shared by teachers
                across India
              </p>
            </div>

            {/* Search and Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by topic, subject, or keyword..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${
                      viewMode === "grid" ? "bg-white shadow-sm" : ""
                    }`}
                  >
                    <Grid className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list" ? "bg-white shadow-sm" : ""
                    }`}
                  >
                    <List className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Sort */}
                <div className="relative">
                  <select className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white cursor-pointer">
                    <option>Most Downloaded</option>
                    <option>Most Recent</option>
                    <option>Highest Rated</option>
                    <option>Most Viewed</option>
                  </select>
                  <SortAsc className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Active Filters */}
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="text-sm text-gray-500">Active filters:</span>
                <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm flex items-center gap-1">
                  Mathematics
                  <X className="w-3 h-3 cursor-pointer" />
                </span>
                <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm flex items-center gap-1">
                  Grade 8
                  <X className="w-3 h-3 cursor-pointer" />
                </span>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  1-{resources.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-800">
                  {resources.length}
                </span>{" "}
                resources
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
                <p className="mt-4 text-gray-600">Loading resources...</p>
              </div>
            ) : resources.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No resources found</p>
                <p className="text-sm mt-2">
                  Try adjusting your filters or search query
                </p>
              </div>
            ) : (
              <>
                {/* Resources Grid/List */}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((resource, index) => (
                      <div
                        key={resource._id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all overflow-hidden group"
                      >
                        {/* Thumbnail */}
                        <div
                          className={`h-40 bg-gradient-to-br ${getGradientColor(
                            index
                          )} flex items-center justify-center text-white relative`}
                        >
                          <div className="text-6xl opacity-20">
                            {getTypeIcon(resource.documentType)}
                          </div>
                          {resource.documentType
                            .toLowerCase()
                            .includes("video") && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <Play className="w-8 h-8 text-white" />
                              </div>
                            </div>
                          )}
                          <div className="absolute top-3 right-3">
                            <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                              <Heart className="w-4 h-4 text-white" />
                            </button>
                          </div>
                          <div className="absolute bottom-3 left-3">
                            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs font-medium flex items-center gap-1">
                              {getTypeIcon(resource.documentType)}
                              {resource.documentType.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-800 line-clamp-2 flex-1 group-hover:text-violet-600 transition-colors">
                              {resource.title}
                            </h3>
                            <button className="ml-2">
                              <MoreVertical className="w-5 h-5 text-gray-400" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                            {resource.description}
                          </p>

                          {/* Tags */}
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            {resource.tags.slice(0, 2).map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-violet-50 text-violet-700 rounded text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                            {resource.tags.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                                +{resource.tags.length - 2}
                              </span>
                            )}
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                              {resource.level}
                            </span>
                          </div>

                          {/* Author */}
                          <div className="flex items-center gap-2 mb-3 pb-3 border-b">
                            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {resource.username.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-medium text-gray-700">
                                  {resource.username}
                                </span>
                                <Check className="w-3 h-3 text-blue-500" />
                              </div>
                              <span className="text-xs text-gray-500">
                                {formatDate(resource.createdAt)}
                              </span>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Download className="w-4 h-4" />
                              <span>{resource.downloads}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{resource.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-medium text-gray-700">
                                {resource.rating.toFixed(1)}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <button className="flex-1 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                              <Download className="w-4 h-4" />
                              Download
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                              <Share2 className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {resources.map((resource, index) => (
                      <div
                        key={resource._id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all"
                      >
                        <div className="flex gap-6">
                          {/* Thumbnail */}
                          <div
                            className={`w-48 h-32 rounded-lg bg-gradient-to-br ${getGradientColor(
                              index
                            )} flex items-center justify-center text-white flex-shrink-0 relative`}
                          >
                            <div className="text-4xl opacity-20">
                              {getTypeIcon(resource.documentType)}
                            </div>
                            {resource.documentType
                              .toLowerCase()
                              .includes("video") && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                                  <Play className="w-6 h-6 text-white" />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-1 hover:text-violet-600 cursor-pointer">
                                  {resource.title}
                                </h3>
                                <p className="text-gray-600 mb-3">
                                  {resource.description}
                                </p>
                              </div>
                              <button>
                                <MoreVertical className="w-5 h-5 text-gray-400" />
                              </button>
                            </div>

                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                  {resource.username
                                    .substring(0, 2)
                                    .toUpperCase()}
                                </div>
                                <span className="text-sm text-gray-700">
                                  {resource.username}
                                </span>
                                <Check className="w-3 h-3 text-blue-500" />
                              </div>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">
                                {formatDate(resource.createdAt)}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                {resource.tags.slice(0, 3).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-sm font-medium"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                  {resource.level}
                                </span>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Download className="w-4 h-4" />
                                    <span>{resource.downloads}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    <span>{resource.views}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="font-medium text-gray-700">
                                      {resource.rating.toFixed(1)}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <button className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2">
                                  <Download className="w-4 h-4" />
                                  Download
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                  <Eye className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                  <Share2 className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Pagination */}
            {resources.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  disabled
                >
                  Previous
                </button>
                <button className="px-4 py-2 bg-violet-500 text-white rounded-lg">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  3
                </button>
                <span className="px-2">...</span>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  475
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResourceLibrary;
