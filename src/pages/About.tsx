import { Globe, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <section className="px-4 py-12">
      <div
        className="
          mx-auto
          max-w-4xl

          rounded-2xl
          border border-white/5
          bg-zinc-900

          p-8 md:p-12

          text-center

          shadow-[0_10px_40px_rgba(0,0,0,0.5)]
        "
      >
        {/* Profile Image */}
        <img
          src="/ameerhamza.jpeg"
          alt="Ameer Hamza"
          className="
            mx-auto
            mb-6

            h-44
            w-44

            rounded-full
            object-cover

            border-4
            border-orange-500

            shadow-[0_4px_20px_rgba(249,115,22,0.4)]
          "
        />

        {/* Heading */}
        <h2 className="mb-2 text-4xl font-bold text-white">About Me</h2>

        <h3 className="mb-5 text-2xl font-semibold text-orange-500">
          Ameer Hamza
        </h3>

        {/* Description */}
        <p
          className="
            mx-auto
            mb-8
            max-w-2xl

            text-lg
            leading-8
            text-zinc-400
          "
        >
          I'm an aspiring Full Stack Developer passionate about building modern
          web applications and continuously improving my skills. Currently, I'm
          focused on learning and mastering the MERN Stack, TypeScript, Next.js,
          SQL databases, and backend development.
          <br />
          <br />
          My goal is to become a professional software developer, contribute to
          real-world projects, and grow through constant learning and hands-on
          development.
        </p>

        {/* Social Links */}
        <div
          className="
            flex
            flex-wrap
            justify-center
            gap-4
          "
        >
          {/* Resume */}
          <a
            href="/ameerhamza-resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex
              items-center
              gap-2

              rounded-lg
              border
              border-orange-500

              bg-orange-500
              px-5
              py-3

              font-medium
              text-black

              transition-all
              duration-300

              hover:scale-105
              hover:bg-orange-400
            "
          >
            <FileText size={18} />
            Resume
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/ameer-hamza-jameel-556717332?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex
              items-center
              gap-2

              rounded-lg
              border
              border-blue-500

              bg-blue-500/10
              px-5
              py-3

              font-medium
              text-blue-400

              transition-all
              duration-300

              hover:scale-105
              hover:bg-blue-500/20
            "
          >
            <FaLinkedin size={18} />
            LinkedIn
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Ameer-Hamza-11"
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex
              items-center
              gap-2

              rounded-lg
              border
              border-zinc-700

              bg-zinc-800
              px-5
              py-3

              font-medium
              text-white

              transition-all
              duration-300

              hover:scale-105
              hover:bg-zinc-700
            "
          >
            <FaGithub size={18} />
            GitHub
          </a>

          {/* Website */}
          <a
            href="https://next-js-portfolio-by-ameer-hamza.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex
              items-center
              gap-2

              rounded-lg
              border
              border-white/10

              bg-zinc-800
              px-5
              py-3

              font-medium
              text-white

              transition-all
              duration-300

              hover:scale-105
              hover:border-orange-500
              hover:text-orange-500
            "
          >
            <Globe size={18} />
            Website
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
