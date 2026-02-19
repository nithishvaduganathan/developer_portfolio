"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = ["about", "skills", "experience", "projects", "education", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "/#about", id: "about" },
    { name: "Skills", href: "/#skills", id: "skills" },
    { name: "Experience", href: "/#experience", id: "experience" },
    { name: "Projects", href: "/#projects", id: "projects" },
    { name: "Education", href: "/#education", id: "education" },
    { name: "Contact", href: "/#contact", id: "contact" },
  ];

  const handleNavClick = (e, href) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-navy-light/95 backdrop-blur-md shadow-lg border-b border-slate-800"
          : "bg-transparent"
        }`}
    >
      <div className="container">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold font-poppins text-white hover:text-cyan-400 transition-colors duration-300"
          >
            <span className="text-cyan-400">&lt;</span>
            NITHISH VADUGANATHAN
            <span className="text-cyan-400">/&gt;</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="group relative font-mono text-sm text-slate-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  <span className="text-cyan-400 mr-1">0{index + 1}.</span>
                  {item.name}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400"></span>
                  )}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                className="btn btn-secondary text-sm py-2 px-4"
              >
                Blog
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyan-400 p-2 hover:bg-navy-light rounded-md transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
            }`}
        >
          <ul className="space-y-4">
            {navItems.map((item, index) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block font-mono text-sm py-2 px-4 rounded-md transition-colors duration-300 ${activeSection === item.id
                      ? "bg-navy-light text-cyan-400"
                      : "text-slate-300 hover:bg-navy-light hover:text-cyan-400"
                    }`}
                >
                  <span className="text-cyan-400 mr-2">0{index + 1}.</span>
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                className="block text-center btn btn-secondary text-sm py-2 px-4"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;