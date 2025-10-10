import React, { useState } from "react";
import {
  Bot,
  BookOpen,
  Send,
  Upload,
  FileText,
  Sparkles,
  ChevronDown,
  Save,
  Download,
  Copy,
  RefreshCw,
  Zap,
  Clock,
  Users,
  Menu,
  X,
  Settings,
  Bell,
  MessageSquare,
  Lightbulb,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface ChatMessage {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: string;
}

interface Template {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface GeneratedContent {
  title: string;
  subject: string;
  grade: string;
  duration: string;
  content: string;
}

const AIAssistant: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    "generate" | "chat" | "history"
  >("generate");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "ai",
      content:
        "Hello! I'm your AI teaching assistant. I can help you generate lesson plans, create study materials, answer questions, and adapt content for your students. How can I assist you today?",
      timestamp: "10:30 AM",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null);

  const templates: Template[] = [
    {
      id: 1,
      title: "Lesson Plan",
      description:
        "Complete structured lesson plan with objectives and activities",
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-violet-500 to-purple-500",
    },
    {
      id: 2,
      title: "Study Notes",
      description: "Comprehensive notes for students to study",
      icon: <FileText className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "Practice Questions",
      description: "Question bank with answers for assessment",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      title: "Quick Summary",
      description: "Brief topic overview for quick revision",
      icon: <Zap className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "Activity Ideas",
      description: "Engaging classroom activities and exercises",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 6,
      title: "Explanation",
      description: "Detailed concept explanation with examples",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "Social Studies",
    "Hindi",
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

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: ChatMessage = {
        id: chatMessages.length + 1,
        type: "user",
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatMessages([...chatMessages, newMessage]);
      setInputMessage("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: chatMessages.length + 2,
          type: "ai",
          content:
            "I understand you need help with that topic. Let me generate a comprehensive resource for you...",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setChatMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleGenerate = () => {
    if (selectedSubject && selectedGrade && selectedTopic) {
      setIsGenerating(true);
      setTimeout(() => {
        setGeneratedContent({
          title: `${selectedTopic} - Lesson Plan`,
          subject: selectedSubject,
          grade: selectedGrade,
          duration: "45 minutes",
          content: `# ${selectedTopic}\n\n## Learning Objectives\n1. Understand the core concepts of ${selectedTopic}\n2. Apply knowledge through practical examples\n3. Solve problems related to ${selectedTopic}\n\n## Introduction (5 minutes)\nBegin with a real-world example that connects to students' everyday experiences...\n\n## Main Content (30 minutes)\n### Concept Explanation\nDetailed explanation of ${selectedTopic} with visual aids and examples...\n\n### Interactive Activity\nGroup work where students explore ${selectedTopic} through hands-on activities...\n\n## Practice (8 minutes)\nWorksheet with 5 problems of varying difficulty levels...\n\n## Conclusion (2 minutes)\nRecap key points and assign homework for reinforcement.`,
        });
        setIsGenerating(false);
      }, 2000);
    }
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
              <Bot className="w-6 h-6" />
              <span className="text-xl font-bold">AI Teaching Assistant</span>
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
          } lg:translate-x-0 fixed lg:static w-64 bg-white h-[calc(100vh-4rem)] shadow-lg transition-transform duration-300 z-40 overflow-y-auto`}
        >
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Quick Start
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedTab("generate")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    selectedTab === "generate"
                      ? "bg-violet-50 text-violet-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Content</span>
                </button>
                <button
                  onClick={() => setSelectedTab("chat")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    selectedTab === "chat"
                      ? "bg-violet-50 text-violet-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Chat Assistant</span>
                </button>
                <button
                  onClick={() => setSelectedTab("history")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    selectedTab === "history"
                      ? "bg-violet-50 text-violet-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  <span>History</span>
                </button>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Recent Generations
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="font-medium text-sm text-gray-800">
                    Algebra Basics
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Math • Grade 8
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="font-medium text-sm text-gray-800">
                    Plant Biology
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Science • Grade 6
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="font-medium text-sm text-gray-800">
                    Grammar Rules
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    English • Grade 7
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg border border-violet-200">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-sm text-gray-800 mb-1">
                    Pro Tip
                  </div>
                  <div className="text-xs text-gray-600">
                    Upload your existing notes to help AI understand your
                    teaching style better!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-0">
          <div className="max-w-6xl mx-auto">
            {/* Generate Content Tab */}
            {selectedTab === "generate" && (
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Generate Teaching Materials
                  </h1>
                  <p className="text-gray-600">
                    AI-powered content generation tailored to your curriculum
                    and teaching style
                  </p>
                </div>

                {/* Template Selection */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Choose Content Type
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-violet-500 hover:shadow-lg transition-all text-left group"
                      >
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${template.color} rounded-lg flex items-center justify-center text-white mb-3`}
                        >
                          {template.icon}
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-violet-600">
                          {template.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {template.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Content Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <div className="relative">
                        <select
                          value={selectedSubject}
                          onChange={(e) => setSelectedSubject(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select Subject</option>
                          {subjects.map((subject) => (
                            <option key={subject} value={subject}>
                              {subject}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Grade Level
                      </label>
                      <div className="relative">
                        <select
                          value={selectedGrade}
                          onChange={(e) => setSelectedGrade(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select Grade</option>
                          {grades.map((grade) => (
                            <option key={grade} value={grade}>
                              {grade}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Topic
                    </label>
                    <input
                      type="text"
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      placeholder="e.g., Fractions, Plant Cell, Simple Past Tense"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Instructions (Optional)
                    </label>
                    <textarea
                      placeholder="Any specific requirements, teaching approach, or student context..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleGenerate}
                      disabled={
                        !selectedSubject ||
                        !selectedGrade ||
                        !selectedTopic ||
                        isGenerating
                      }
                      className="flex-1 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Generate Content
                        </>
                      )}
                    </button>
                    <button className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Upload Notes
                    </button>
                  </div>
                </div>

                {/* Generated Content Preview */}
                {generatedContent && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          {generatedContent.title}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span>{generatedContent.subject}</span>
                          <span>•</span>
                          <span>{generatedContent.grade}</span>
                          <span>•</span>
                          <span>{generatedContent.duration}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="Copy"
                        >
                          <Copy className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="Download"
                        >
                          <Download className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="Save"
                        >
                          <Save className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="prose max-w-none bg-gray-50 rounded-lg p-6">
                      <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
                        {generatedContent.content}
                      </pre>
                    </div>
                    <div className="mt-4 flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          Content generated successfully!
                        </span>
                      </div>
                      <button className="text-violet-600 font-medium text-sm hover:text-violet-700">
                        Regenerate with changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Chat Assistant Tab */}
            {selectedTab === "chat" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    AI Chat Assistant
                  </h1>
                  <p className="text-gray-600">
                    Ask questions, get teaching advice, or discuss lesson ideas
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-300px)] flex flex-col">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.type === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-2xl ${
                            message.type === "user"
                              ? "bg-violet-500 text-white"
                              : "bg-gray-100 text-gray-800"
                          } rounded-2xl px-6 py-3`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span
                            className={`text-xs mt-1 block ${
                              message.type === "user"
                                ? "text-violet-200"
                                : "text-gray-500"
                            }`}
                          >
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        placeholder="Ask me anything about teaching, lesson planning, or content creation..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* History Tab */}
            {selectedTab === "history" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Generation History
                  </h1>
                  <p className="text-gray-600">
                    Access all your previously generated content
                  </p>
                </div>

                <div className="grid gap-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            Introduction to Fractions
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Mathematics • Grade 5</span>
                            <span>•</span>
                            <span>Lesson Plan</span>
                            <span>•</span>
                            <span>Generated 2 days ago</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Download className="w-5 h-5 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Copy className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIAssistant;
