import Link from 'next/link';
import { personalData } from '@/utils/data/personal-data';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { FaFacebook, FaTwitterSquare } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-800 bg-navy-light">
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <Link href="/" className="text-2xl font-bold font-poppins text-white hover:text-cyan-400 transition-colors duration-300 inline-block mb-4">
              <span className="text-cyan-400">&lt;</span>
              {personalData.name.split(' ')[0]}
              <span className="text-cyan-400">/&gt;</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {personalData.designation} passionate about building innovative solutions with AI and modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/#${item.toLowerCase()}`}
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <Link
                href={personalData.github}
                target="_blank"
                className="text-slate-400 hover:text-cyan-400 hover:scale-110 transition-all duration-300"
                aria-label="GitHub"
              >
                <BsGithub size={24} />
              </Link>
              <Link
                href={personalData.linkedIn}
                target="_blank"
                className="text-slate-400 hover:text-cyan-400 hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <BsLinkedin size={24} />
              </Link>
              <Link
                href={personalData.leetcode}
                target="_blank"
                className="text-slate-400 hover:text-cyan-400 hover:scale-110 transition-all duration-300"
                aria-label="LeetCode"
              >
                <SiLeetcode size={24} />
              </Link>
              <Link
                href={personalData.twitter}
                target="_blank"
                className="text-slate-400 hover:text-cyan-400 hover:scale-110 transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitterSquare size={24} />
              </Link>
              <Link
                href={personalData.facebook}
                target="_blank"
                className="text-slate-400 hover:text-cyan-400 hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </Link>
            </div>
            <p className="text-slate-400 text-sm">
              <a href={`mailto:${personalData.email}`} className="hover:text-cyan-400 transition-colors duration-300">
                {personalData.email}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} {personalData.name}. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm">
              Built with <span className="text-cyan-400">Next.js</span> & <span className="text-cyan-400">Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;