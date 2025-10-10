import { useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, FileText, Download, Sparkles, User } from "lucide-react";

export default function StudentProfilePage() {
  const [student] = useState({
    name: "Rahul Sharma",
    class: "9th Grade",
    school: "Rural Govt. High School",
    village: "Rampur, UP",
    rollNumber: "2022RLS109",
    dob: "14 July 2011",
    contact: "9876543210",
    subjects: ["Science", "Math", "Hindi", "English"],
    attendance: "92%",
  });

  const [videoLectures] = useState([
    { id: 1, title: "Math - Quadratic Equations", blobUrl: "/videos/math-quadratic.mp4" },
    { id: 2, title: "Science - Plants", blobUrl: "/videos/science-plants.mp4" },
  ]);

  const [pdfNotes] = useState([
    { id: 1, title: "Quadratic Equations Notes", blobUrl: "/notes/quadratic.pdf" },
    { id: 2, title: "Plant Science Notes", blobUrl: "/notes/plants.pdf" },
  ]);

  return (
    <div
      className="min-h-screen flex text-gray-800"
      style={{
        background: "#BC13FE", // Hero gradient
      }}
    >
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/3 lg:w-1/4 bg-white/20 backdrop-blur-lg p-6 flex flex-col items-center border-r border-gray-300 shadow-lg"
      >
        <h2 className="text-2xl font-extrabold text-violet-600 drop-shadow-md">{student.name}</h2>
        <p className="text-gray-700 font-medium mt-1">{student.class}</p>

        <div className="mt-6 space-y-2 w-full text-sm bg-white/10 rounded-xl p-4">
          {[
            ["🏫 School", student.school],
            ["📍 Village", student.village],
            ["🎫 Roll No", student.rollNumber],
            ["🎂 DOB", student.dob],
            ["📞 Contact", student.contact],
            ["📘 Subjects", student.subjects.join(", ")],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col border-b border-gray-300 pb-2">
              <span className="text-gray-500">{label}</span>
              <span className="font-semibold text-gray-800">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 w-full">
          <p className="font-semibold text-center mb-1 text-gray-800">Attendance</p>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-violet-500 h-4 text-xs text-center font-bold text-white"
              style={{ width: student.attendance }}
            >
              {student.attendance}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-10"
        >
          <h1 className="text-4xl font-extrabold drop-shadow-md flex items-center gap-2 text-gray-900">
            <User className="text-gray-700" /> Welcome, {student.name.split(" ")[0]}!
          </h1>
          <span className="bg-white/30 px-4 py-1 rounded-full text-sm font-semibold shadow text-gray-900">
            Student Dashboard
          </span>
        </motion.div>

        {/* Grid for Video & PDFs */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Video Lectures */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-300"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <PlayCircle className="text-violet-500" /> Video Lectures
            </h2>

            <div className="space-y-5">
              {videoLectures.map((video) => (
                <motion.div
                  key={video.id}
                  whileHover={{ scale: 1.03 }}
                  className="p-4 bg-white/10 rounded-xl border border-gray-300 shadow-md"
                >
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-gray-900">
                    <PlayCircle size={20} className="text-violet-500" />
                    {video.title}
                  </h3>
                  <video
                    controls
                    src={video.blobUrl}
                    className="w-full rounded-lg border border-gray-300 shadow-sm"
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* PDF Notes */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-300"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <FileText className="text-violet-500" /> PDF Notes
            </h2>

            <div className="space-y-5">
              {pdfNotes.map((pdf) => (
                <motion.div
                  key={pdf.id}
                  whileHover={{ scale: 1.03 }}
                  className="flex justify-between items-center p-4 bg-white/10 rounded-xl border border-gray-300 shadow-md"
                >
                  <span className="font-semibold text-gray-900">{pdf.title}</span>
                  <a
                    href={pdf.blobUrl}
                    download
                    className="flex items-center gap-2 bg-gradient-to-br from-violet-500 via-purple-400 to-purple-500 px-4 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
                  >
                    <Download size={18} /> Download
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>

      {/* Floating AI Assistant */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-md border border-gray-300 shadow-lg rounded-2xl p-5 w-80"
      >
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
          <Sparkles className="text-purple-500" /> Ask AI Assistant
        </h3>
        <textarea
          placeholder="Ask your study question..."
          className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 text-sm focus:ring-2 focus:ring-purple-300 focus:outline-none"
        ></textarea>
        <button className="mt-3 w-full bg-gradient-to-br from-violet-500 via-purple-400 to-purple-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition">
          Ask
        </button>
      </motion.div>
    </div>
  )
}
