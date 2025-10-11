import { useEffect, useState } from "react";

interface Student {
  name: string;
  class: string;
  school: string;
  village: string;
  roll: string;
  dob: string;
  contact: string;
  subjects: string[];
  attendance: string;
  avatar: string;
}

export default function StudentProfile() {
  const [student, setStudent] = useState<Student | undefined>();

  useEffect(() => {
    setStudent({
      name: "Rahul Sharma",
      class: "9th Grade",
      school: "Rural Govt. High School",
      village: "Rampur, UP",
      roll: "2022RLS109",
      dob: "14 July 2011",
      contact: "9876543210",
      subjects: ["Science", "Math", "Hindi", "English"],
      attendance: "92%",
      avatar: "https://ui-avatars.com/api/?name=Rahul+Sharma",
    });
  }, []);

  // Add a loading state check
  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-8 relative">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <img
            src={student.avatar}
            alt="Student Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
        </div>
        {/* Student Details */}
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold text-violet-700 mb-1">
            {student.name}
          </h2>
          <span className="inline-block bg-fuchsia-200 text-fuchsia-800 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            Student
          </span>
        </div>
        <div className="space-y-3 text-violet-900 font-medium">
          <div className="flex justify-between">
            <span>Class:</span>
            <span className="text-violet-700">{student.class}</span>
          </div>
          <div className="flex justify-between">
            <span>School:</span>
            <span className="text-violet-700">{student.school}</span>
          </div>
          <div className="flex justify-between">
            <span>Village:</span>
            <span className="text-violet-700">{student.village}</span>
          </div>
          <div className="flex justify-between">
            <span>Roll Number:</span>
            <span className="text-violet-700">{student.roll}</span>
          </div>
          <div className="flex justify-between">
            <span>Date of Birth:</span>
            <span className="text-violet-700">{student.dob}</span>
          </div>
          <div className="flex justify-between">
            <span>Contact:</span>
            <span className="text-violet-700">{student.contact}</span>
          </div>
          <div className="flex justify-between">
            <span>Subjects:</span>
            <span className="text-violet-700">
              {student.subjects.join(", ")}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Attendance:</span>
            <span className="text-violet-700">{student.attendance}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
