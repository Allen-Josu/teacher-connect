import { BookOpen, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
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
    </>
  );
}
