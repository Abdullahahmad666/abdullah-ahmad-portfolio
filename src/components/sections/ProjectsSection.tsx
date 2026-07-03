import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { SectionBackground } from "@/components/SectionBackground";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─── Project card with inner spotlight glow ──────────────────────────────── */
function ProjectCard({ project }: { project: typeof portfolioData.projects[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(220px circle at ${x}px ${y}px, rgba(37,99,235,0.13), transparent)`;
    glowRef.current.style.opacity = "1";
  };

  const onLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "rgba(8,17,31,0.8)",
        border: "1px solid rgba(37,99,235,0.1)",
      }}
      whileHover={{ borderColor: "rgba(37,99,235,0.35)", y: -5 } as any}
      transition={{ duration: 0.22 }}
      onClick={() => window.open(project.liveUrl, "_blank", "noopener,noreferrer")}
    >
      {/* Inner spotlight */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
        style={{ opacity: 0, zIndex: 1 }}
      />

      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
          loading="lazy"
          style={{ transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(6,8,14,0.72)" }}
        >
          <span
            className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-full"
            style={{ background: "rgba(37,99,235,0.8)", backdropFilter: "blur(4px)" }}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Demo
          </span>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3" style={{ zIndex: 2 }}>
          <span
            className="px-2.5 py-1 rounded-full text-xs font-medium font-mono-code"
            style={{
              background: "rgba(6,8,14,0.85)",
              border: "1px solid rgba(37,99,235,0.25)",
              color: "#93C5FD",
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5" style={{ zIndex: 2 }}>
        <h3
          className="font-syne font-bold text-base mb-2 group-hover:text-[#60A5FA] transition-colors duration-200"
          style={{ color: "#F0F4FF" }}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#7B8EAF" }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-xs font-mono-code"
              style={{ background: "rgba(37,99,235,0.1)", color: "#93C5FD" }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div
          className="flex gap-2 pt-4 border-t"
          style={{ borderColor: "rgba(37,99,235,0.1)" }}
        >
          <button
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.liveUrl, "_blank", "noopener,noreferrer");
            }}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Live Demo
          </button>
          <button
            className="flex items-center justify-center px-3 py-2 rounded-lg text-xs font-semibold transition-colors hover:bg-[#2563EB]/10"
            style={{ border: "1px solid rgba(37,99,235,0.25)", color: "#93C5FD" }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.liveUrl, "_blank", "noopener,noreferrer");
            }}
          >
            <Github className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Projects section ───────────────────────────────────────────────────── */
export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative py-24 md:py-32" ref={ref}>
      <SectionBackground />

      <div className="container mx-auto px-5 sm:px-8 relative" style={{ zIndex: 1 }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-16 md:mb-20">
            <p
              className="font-mono-code text-xs tracking-widest uppercase mb-4"
              style={{ color: "#2563EB" }}
            >
              03 — Projects
            </p>
            <h2
              className="font-syne font-black text-4xl sm:text-5xl leading-none"
              style={{ color: "#F0F4FF", letterSpacing: "-0.03em" }}
            >
              Selected work
            </h2>
          </motion.div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl">
            {portfolioData.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-14 max-w-xl">
            <div
              className="p-7 rounded-2xl"
              style={{
                background: "rgba(8,17,31,0.8)",
                border: "1px solid rgba(37,99,235,0.14)",
              }}
            >
              <h3 className="font-syne font-bold text-xl mb-2" style={{ color: "#F0F4FF" }}>
                Want to see more?
              </h3>
              <p className="text-sm mb-5" style={{ color: "#7B8EAF" }}>
                These are just a few highlights. Let's discuss how I can help bring your ideas to life.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-6 py-2.5 rounded-full text-sm font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors"
                >
                  Start a Project
                </button>
                <button
                  onClick={() => window.open("https://github.com/Abdullahahmad666", "_blank")}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#2563EB]/10 transition-colors"
                  style={{ border: "1px solid rgba(37,99,235,0.25)", color: "#93C5FD" }}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
