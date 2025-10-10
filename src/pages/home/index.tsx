import React, { useState, useEffect } from "react";
import { BookOpen, Bot, Wifi, Globe, Users, Zap, Menu, X } from "lucide-react";

interface Stat {
  number: string;
  label: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Step {
  number: number;
  title: string;
  description: string;
}

interface ImpactCard {
  title: string;
  description: string;
}

const TeachersConnect: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats: Stat[] = [
    { number: "65%", label: "Rural Schools Face Teacher Shortage" },
    { number: "40%", label: "Learning Time Lost to Teacher Absence" },
    { number: "80%", label: "Teachers Handle Multiple Subjects" },
    { number: "1000+", label: "Teachers Already Connected" },
  ];

  const features: Feature[] = [
    {
      icon: <Bot className="w-12 h-12 text-violet-600" />,
      title: "AI-Assisted Learning Continuity",
      description:
        "When teachers are absent, our AI system generates lesson notes and provides Q&A support based on the teacher's curriculum, ensuring students never miss valuable learning time.",
    },
    {
      icon: <BookOpen className="w-12 h-12 text-violet-600" />,
      title: "Quality Resource Library",
      description:
        "Access thousands of high-quality, curriculum-aligned teaching materials shared by experienced urban and rural teachers across the country.",
    },
    {
      icon: <Wifi className="w-12 h-12 text-violet-600" />,
      title: "Offline-First Design",
      description:
        "Download resources and sync when connected. Our platform works seamlessly even with limited or inconsistent internet connectivity.",
    },
    {
      icon: <Globe className="w-12 h-12 text-violet-600" />,
      title: "Multilingual Support",
      description:
        "Automatically translate teaching materials into local languages. Adapt notes from any region to your classroom's linguistic needs.",
    },
    {
      icon: <Users className="w-12 h-12 text-violet-600" />,
      title: "Teacher Collaboration Hub",
      description:
        "Connect with fellow teachers and subject experts. Share experiences, get advice, and build a supportive professional network.",
    },
    {
      icon: <Zap className="w-12 h-12 text-violet-600" />,
      title: "RAG-Powered Insights",
      description:
        "Retrieval-Augmented Generation provides contextual answers from your teaching materials, making lesson preparation faster and more effective.",
    },
  ];

  const steps: Step[] = [
    {
      number: 1,
      title: "Sign Up & Profile Setup",
      description:
        "Create your teacher profile, specify subjects, grade levels, and regional preferences to get personalized resources.",
    },
    {
      number: 2,
      title: "Upload Your Materials",
      description:
        "Share your teaching notes and materials. Our AI learns from your style to provide better assistance.",
    },
    {
      number: 3,
      title: "Access & Collaborate",
      description:
        "Download resources, connect with peers, and let AI assist during teacher absences or multi-subject challenges.",
    },
    {
      number: 4,
      title: "Continuous Learning",
      description:
        "Receive updates, participate in discussions, and contribute to building a stronger educational ecosystem.",
    },
  ];

  const impactCards: ImpactCard[] = [
    {
      title: "Reducing Teacher Burden",
      description:
        "Teachers handling 5-6 subjects can now access ready-made, quality resources, reducing preparation time by up to 60% and allowing more focus on student engagement.",
    },
    {
      title: "Zero Learning Loss",
      description:
        "With AI-assisted continuity, students can maintain their learning momentum even during teacher absences, ensuring curriculum completion and better outcomes.",
    },
    {
      title: "Breaking Language Barriers",
      description:
        "Teachers new to a region can adapt materials to local languages instantly, making education more accessible and culturally relevant for students.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-purple-700 shadow-lg"
            : "bg-gradient-to-r from-violet-500 to-purple-500"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 text-white text-xl font-bold">
              <BookOpen className="w-6 h-6" />
              <span>Teachers Connect</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-white hover:text-purple-200 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-white hover:text-purple-200 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#impact"
                className="text-white hover:text-purple-200 transition-colors"
              >
                Impact
              </a>
              <a
                href="#contact"
                className="text-white hover:text-purple-200 transition-colors"
              >
                Contact
              </a>
              <button className="bg-white text-violet-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                Get Started
              </button>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col gap-4">
                <a
                  href="#features"
                  className="text-white hover:text-purple-200"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-white hover:text-purple-200"
                >
                  How It Works
                </a>
                <a href="#impact" className="text-white hover:text-purple-200">
                  Impact
                </a>
                <a href="#contact" className="text-white hover:text-purple-200">
                  Contact
                </a>
                <button className="bg-white text-violet-600 px-6 py-2 rounded-full font-semibold">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-violet-500 via-purple-400 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Bridging the Rural-Urban Teaching Gap
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-95">
            Empowering rural teachers with AI-assisted guidance, quality
            resources, and collaborative tools to ensure every student receives
            exceptional education, regardless of location.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-violet-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
              Join as Teacher
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-violet-600 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transform hover:-translate-y-2 transition-all"
              >
                <div className="text-5xl font-bold text-violet-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Powerful Features for Rural Teachers
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Comprehensive solutions designed to address the unique challenges
            faced by rural educators
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-violet-50 to-purple-50 p-8 rounded-2xl border-t-4 border-violet-500 hover:shadow-2xl transform hover:-translate-y-2 transition-all"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 px-4 bg-gradient-to-br from-violet-500 to-purple-500 text-white"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            How Teachers Connect Works
          </h2>
          <p className="text-xl text-center mb-16 opacity-95">
            Simple steps to transform your teaching experience
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-16 h-16 bg-white text-violet-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="opacity-90">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Real Impact on Rural Education
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Addressing critical challenges with innovative solutions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactCards.map((card, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border-l-4 border-violet-500 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <h3 className="text-2xl font-bold text-violet-600 mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Rural Education?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of teachers already making a difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-violet-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-violet-600 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-violet-400">
                Teachers Connect
              </h3>
              <p className="text-gray-400">
                Empowering rural educators to bridge the teaching quality gap
                through technology and collaboration.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-violet-400">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Resources
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-violet-400">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Teacher Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-violet-400">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Teachers Connect. All rights reserved. Building
              bridges in education, one teacher at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TeachersConnect;
