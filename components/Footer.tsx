import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t-2 border-black mt-auto">
      <div className="mx-auto max-w-[1400px] px-14 py-12 max-sm:px-6">
        <div className="grid grid-cols-4 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="w-fit">
              <div className="flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105">
                <Image src="/images/logo.svg" alt="logo" width={50} height={48} />
                <span className="font-extrabold text-2xl tracking-tight text-black">
                  Learn<span className="text-primary">Hub</span>
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering your learning journey with personalized, real-time AI study companions. Chat, learn, and test your knowledge dynamically.
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 border-2 border-black rounded-lg hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 border-2 border-black rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-black flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              Explore
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors duration-200 font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/companions" className="hover:text-primary transition-colors duration-200 font-medium">
                  Companions Library
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-primary transition-colors duration-200 font-medium">
                  Practice Quizzes
                </Link>
              </li>
              <li>
                <Link href="/my-journey" className="hover:text-primary transition-colors duration-200 font-medium">
                  My Journey Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Integration Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-black flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              AI Powered
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Powered by advanced real-time conversational intelligence and state-of-the-art inference engines.
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="bg-orange-50 text-orange-700 border border-orange-200 rounded-full px-3 py-1 text-xs font-semibold">
                Vapi AI (Voice)
              </span>
              <span className="bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1 text-xs font-semibold">
                Groq SDK (Inference)
              </span>
              <span className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 text-xs font-semibold">
                Llama 3 / GPT-4
              </span>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-black flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Subscribe to get updates on new subjects, tutors, and learning features.
            </p>
            <div className="flex gap-2 mt-1">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-grow border-2 border-black rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
              />
              <button className="bg-black hover:bg-primary text-white border-2 border-black hover:border-primary px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-200 my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} LearnHub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors duration-200">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
