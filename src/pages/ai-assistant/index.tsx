import React, { useState } from "react";
import { useAIEngine } from "../../utils/useAIEngine";
import {
  Bot,
  BookOpen,
  Send,
  Upload,
  Sparkles,
  ChevronDown,
  Copy,
  Menu,
  X,
  Settings,
  Bell,
  Lightbulb,
  Brain,
  Mic,
} from "lucide-react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface LessonPlanParams {
  subject: string;
  grade: string;
  topic: string;
  additionalInstructions: string;
}

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

const AIAssistant: React.FC = () => {
  const { engine, loading, retrieveContext } = useAIEngine();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLessonPlanForm, setShowLessonPlanForm] = useState(false);
  const [tempKnowledge, setTempKnowledge] = useState<string[]>([]);
  const [lessonPlanParams, setLessonPlanParams] = useState<LessonPlanParams>({
    subject: "",
    grade: "",
    topic: "",
    additionalInstructions: "",
  });

  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI teaching assistant. I can help you with questions, generate lesson plans, and provide educational support. How can I assist you today?",
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string>("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Generate lesson plan and send to chat
  const handleGenerateLessonPlan = async () => {
    if (
      !engine ||
      loading ||
      !lessonPlanParams.subject ||
      !lessonPlanParams.grade ||
      !lessonPlanParams.topic
    )
      return;

    const context =
      retrieveContext(lessonPlanParams.topic) +
      "\n---\n" +
      tempKnowledge.join("\n---\n");

    const lessonPlanPrompt = `Generate a comprehensive lesson plan for ${
      lessonPlanParams.subject
    } (${lessonPlanParams.grade}) on the topic: "${lessonPlanParams.topic}".

${
  lessonPlanParams.additionalInstructions
    ? "Additional Requirements: " + lessonPlanParams.additionalInstructions
    : ""
}

Please structure the lesson plan with:
1. Learning Objectives
2. Introduction/Hook
3. Main Content with Activities
4. Practice Exercises
5. Conclusion and Assessment
6. Duration: 45 minutes

${context ? "Use this relevant context:\n" + context : ""}`;

    // Close the form and send to chat
    setShowLessonPlanForm(false);
    setInputMessage("");

    // Add user message
    const userMessage: Message = { role: "user", content: lessonPlanPrompt };
    setChatMessages((prev) => [...prev, userMessage]);

    // Generate response
    await generateChatResponse([...chatMessages, userMessage]);

    // Reset form
    setLessonPlanParams({
      subject: "",
      grade: "",
      topic: "",
      additionalInstructions: "",
    });
  };

  // Handle regular chat messages
  const handleSendMessage = async () => {
    if (!engine || loading || !inputMessage.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: inputMessage.trim() };
    setChatMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setError("");

    await generateChatResponse([...chatMessages, userMessage]);
  };

  // Core streaming chat generation
  const generateChatResponse = async (messages: Message[]) => {
    setIsStreaming(true);

    // Add empty assistant message for streaming
    setChatMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const chunks = await engine.chat.completions.create({
        messages: messages,
        stream: true,
      });

      let fullReply = "";

      for await (const chunk of chunks) {
        const delta = chunk.choices[0]?.delta?.content;
        if (delta) {
          fullReply += delta;
          setChatMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content = fullReply;
            return newMessages;
          });
        }
      }
    } catch (error: unknown) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate response";
      setError(errorMessage);
      setChatMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content =
          "Sorry, an error occurred while generating the response.";
        return newMessages;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (
      file.type === "text/plain" ||
      file.type === "text/markdown" ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".md")
    ) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setTempKnowledge((prev) => [...prev, ev.target?.result as string]);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      };
      reader.onerror = () => setError("Error reading file!");
      reader.readAsText(file);
    } else {
      setError("Only .txt or .md files are supported.");
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
    };
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
    recognition.start();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const LoadingModel = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="relative">
        <div className="w-32 h-32 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        <Brain className="w-16 h-16 text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="text-2xl font-bold mt-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Loading AI Model...
      </p>
      <p className="text-sm text-gray-400 max-w-md text-center mt-4">
        First-time setup may take a moment. Subsequent loads will be instant!
      </p>
      <div className="w-64 h-2 bg-white/10 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 animate-pulse"></div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingModel />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-40 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "700ms" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1400ms" }}
        ></div>
      </div>

      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-xl transition-all"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Bot className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Teaching Assistant
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white/10 rounded-xl transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-white/10 rounded-xl transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="flex pt-20">
        {/* Sidebar - Always fixed overlay */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed w-72 top-20 left-0 h-[calc(100vh-5rem)] transition-transform duration-300 z-40 overflow-y-auto`}
        >
          <div className="p-6 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
              <h3 className="text-sm font-semibold text-gray-300 uppercase mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowLessonPlanForm(!showLessonPlanForm)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:scale-105"
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">Generate Lesson Plan</span>
                </button>

                <label
                  htmlFor="sidebar-upload"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-white/10 cursor-pointer"
                >
                  <Upload className="w-5 h-5" />
                  <span className="font-medium">Upload Notes</span>
                </label>
                <input
                  type="file"
                  id="sidebar-upload"
                  accept=".txt,.md"
                  onChange={handleUpload}
                  className="hidden"
                />
              </div>

              {uploadSuccess && (
                <div className="mt-3 p-2 bg-green-500/20 rounded-lg border border-green-500/30 text-xs text-green-400">
                  ✓ {tempKnowledge.length} file(s) uploaded
                </div>
              )}
            </div>

            {/* Recent Topics */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
              <h3 className="text-sm font-semibold text-gray-300 uppercase mb-3">
                Suggested Topics
              </h3>
              <div className="space-y-2">
                {["Photosynthesis", "Fractions", "Grammar Rules"].map(
                  (topic, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInputMessage(`Tell me about ${topic}`)}
                      className="w-full text-left p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-sm"
                    >
                      {topic}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/30">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm mb-1">Pro Tip</div>
                  <div className="text-xs text-gray-300">
                    Upload your teaching notes to get personalized AI responses
                    that match your style!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content - Centered */}
        <main className="flex-1 p-6 relative z-10 flex justify-center items-start">
          <div className="w-full max-w-3xl">
            {/* Chat Interface */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AI Chat Assistant
                </h1>
                <p className="text-gray-300 text-lg">
                  Your intelligent teaching companion powered by WebLLM
                </p>
              </div>

              {/* Lesson Plan Form - Collapsible */}
              {showLessonPlanForm && (
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-yellow-400" />
                      Generate Lesson Plan
                    </h2>
                    <button
                      onClick={() => setShowLessonPlanForm(false)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Subject
                      </label>
                      <div className="relative">
                        <select
                          value={lessonPlanParams.subject}
                          onChange={(e) =>
                            setLessonPlanParams({
                              ...lessonPlanParams,
                              subject: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white focus:border-purple-400 focus:outline-none appearance-none"
                        >
                          <option value="" className="bg-slate-800">
                            Select Subject
                          </option>
                          {subjects.map((subject) => (
                            <option
                              key={subject}
                              value={subject}
                              className="bg-slate-800"
                            >
                              {subject}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Grade Level
                      </label>
                      <div className="relative">
                        <select
                          value={lessonPlanParams.grade}
                          onChange={(e) =>
                            setLessonPlanParams({
                              ...lessonPlanParams,
                              grade: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white focus:border-purple-400 focus:outline-none appearance-none"
                        >
                          <option value="" className="bg-slate-800">
                            Select Grade
                          </option>
                          {grades.map((grade) => (
                            <option
                              key={grade}
                              value={grade}
                              className="bg-slate-800"
                            >
                              {grade}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Topic
                    </label>
                    <input
                      type="text"
                      value={lessonPlanParams.topic}
                      onChange={(e) =>
                        setLessonPlanParams({
                          ...lessonPlanParams,
                          topic: e.target.value,
                        })
                      }
                      placeholder="e.g., Fractions, Plant Cell, Simple Past Tense"
                      className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Additional Instructions (Optional)
                    </label>
                    <textarea
                      value={lessonPlanParams.additionalInstructions}
                      onChange={(e) =>
                        setLessonPlanParams({
                          ...lessonPlanParams,
                          additionalInstructions: e.target.value,
                        })
                      }
                      placeholder="Any specific requirements, teaching approach, or student context..."
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    onClick={handleGenerateLessonPlan}
                    disabled={
                      !lessonPlanParams.subject ||
                      !lessonPlanParams.grade ||
                      !lessonPlanParams.topic ||
                      isStreaming
                    }
                    className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-2xl hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-3"
                  >
                    <Sparkles className="w-6 h-6" />
                    Generate in Chat
                  </button>
                </div>
              )}

              {/* Chat Messages */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 h-[calc(100vh-350px)] flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-3xl ${
                          msg.role === "user"
                            ? "bg-gradient-to-br from-purple-500 to-pink-500"
                            : "bg-white/10"
                        } rounded-2xl px-6 py-4 relative group`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                          {msg.content}
                        </p>
                        {msg.role === "assistant" && msg.content && (
                          <button
                            onClick={() => copyToClipboard(msg.content)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 hover:bg-white/10 rounded-lg transition-all"
                            title="Copy"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {isStreaming && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 rounded-2xl px-6 py-4">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="border-t border-white/10 p-4">
                  {error && (
                    <div className="mb-3 p-3 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-2">
                      <X className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-red-300">{error}</span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && !isStreaming && handleSendMessage()
                      }
                      placeholder="Ask me anything about teaching, lesson planning, or get educational support..."
                      className="flex-1 px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
                      disabled={isStreaming}
                    />
                    <button
                      onClick={handleVoiceInput}
                      disabled={isListening || isStreaming}
                      className={`p-3 rounded-xl transition-all ${
                        isListening
                          ? "bg-red-500 animate-pulse"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                      title="Voice Input"
                    >
                      <Mic className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={isStreaming || !inputMessage.trim()}
                      className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default AIAssistant;
