"use client";

import { Linkedin, Github, Mail, Instagram } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/rudra-solanki-90207925b/",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/rudra141004/web_final_project",
    },
    {
      name: "Gmail",
      icon: Mail,
      url: "mailto:solankirudra1410.email@gmail.com",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/rudra._1410",
    },
  ];

  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">About Me</h2>
          <p className="text-gray-300 text-1xl leading-relaxed">
          My Name is Rudra Solanki !. I am a dedicated and passionate
                software developer student, currently pursuing my journey into
                the world of technology and innovation. With a strong foundation
                in programming languages such as Java, Python, JavaScript, and
                C++, I am constantly exploring new tools and technologies to
                build efficient and creative solutions.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="grid grid-cols-4 gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full hover:scale-110"
              >
                <link.icon size={20} className="text-yellow-400" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
