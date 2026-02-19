"use client";

import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaStackOverflow } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';

function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("contact");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="contact" className="section relative">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-400 font-mono">06. </span>
            Get In Touch
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-transparent"></div>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-navy-light rounded-full flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-navy-dark transition-all duration-300">
                    <MdAlternateEmail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <a href={`mailto:${personalData.email}`} className="text-slate-200 hover:text-cyan-400 transition-colors duration-300">
                      {personalData.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-navy-light rounded-full flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-navy-dark transition-all duration-300">
                    <IoMdCall size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Phone</p>
                    <a href={`tel:${personalData.phone}`} className="text-slate-200 hover:text-cyan-400 transition-colors duration-300">
                      {personalData.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-navy-light rounded-full flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-navy-dark transition-all duration-300">
                    <CiLocationOn size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Location</p>
                    <p className="text-slate-200">{personalData.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Connect With Me</h3>
              <div className="flex flex-wrap gap-4">
                <Link
                  target="_blank"
                  href={personalData.github}
                  className="w-12 h-12 bg-navy-light rounded-full flex items-center justify-center text-slate-400 hover:bg-cyan-400 hover:text-navy-dark hover:scale-110 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <IoLogoGithub size={24} />
                </Link>
                <Link
                  target="_blank"
                  href={personalData.linkedIn}
                  className="w-12 h-12 bg-navy-light rounded-full flex items-center justify-center text-slate-400 hover:bg-cyan-400 hover:text-navy-dark hover:scale-110 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <BiLogoLinkedin size={24} />
                </Link>
                <Link
                  target="_blank"
                  href={personalData.twitter}
                  className="w-12 h-12 bg-navy-light rounded-full flex items-center justify-center text-slate-400 hover:bg-cyan-400 hover:text-navy-dark hover:scale-110 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <FaXTwitter size={24} />
                </Link>
                <Link
                  target="_blank"
                  href={personalData.stackOverflow}
                  className="w-12 h-12 bg-navy-light rounded-full flex items-center justify-center text-slate-400 hover:bg-cyan-400 hover:text-navy-dark hover:scale-110 transition-all duration-300"
                  aria-label="Stack Overflow"
                >
                  <FaStackOverflow size={24} />
                </Link>
                <Link
                  target="_blank"
                  href={personalData.facebook}
                  className="w-12 h-12 bg-navy-light rounded-full flex items-center justify-center text-slate-400 hover:bg-cyan-400 hover:text-navy-dark hover:scale-110 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebook size={24} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;