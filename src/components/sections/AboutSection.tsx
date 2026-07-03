import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { SectionBackground } from "@/components/SectionBackground";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── 3D tilt profile card ────────────────────────────────────────────────── */
function ProfileCard() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const springCfg = { stiffness: 160, damping: 22, mass: 0.7 };
  const sx = useSpring(mx, springCfg);
  const sy = useSpring(my, springCfg);
  const rotateX = useTransform(sy, [0, 1], [12, -12]);
  const rotateY = useTransform(sx, [0, 1], [-12, 12]);
  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  const [first, second] = portfolioData.name.split(" ");

  return (
    <div style={{ perspective: "900px" }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Gradient border wrapper */}
        <div
          className="rounded-3xl p-px"
          style={{
            background:
              "linear-gradient(135deg, rgba(37,99,235,0.55) 0%, rgba(96,165,250,0.3) 50%, rgba(245,158,11,0.35) 100%)",
          }}
        >
          <div
            className="rounded-3xl overflow-hidden relative"
            style={{ background: "#08111F" }}
          >
            {/* Glare highlight */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background: useTransform(
                  [glareX, glareY] as any,
                  ([gx, gy]: string[]) =>
                    `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.06), transparent 55%)`,
                ),
                zIndex: 10,
              }}
            />

            {/* Top area — gradient backdrop */}
            <div
              className="relative flex flex-col items-center pt-10 pb-8 px-8"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 65%)",
              }}
            >
              {/* Availability pill */}
              <div
                className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-mono-code"
                style={{
                  background: "rgba(34,197,94,0.12)",
                  border: "1px solid rgba(34,197,94,0.25)",
                  color: "#4ADE80",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Open to work
              </div>

              {/* Avatar — spinning conic ring */}
              <div
                className="relative mb-5"
                style={{
                  width: 116,
                  height: 116,
                  transform: "translateZ(30px)",
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                  style={{
                    background:
                      "conic-gradient(from 0deg, #2563EB, #60A5FA, #93C5FD, #F59E0B, #2563EB)",
                  }}
                />
                {/* Inner dark circle */}
                <div
                  className="absolute rounded-full flex items-center justify-center"
                  style={{
                    inset: 3,
                    background: "#08111F",
                  }}
                >
                  <span
                    className="font-syne font-black text-3xl"
                    style={{ color: "#60A5FA", letterSpacing: "-0.04em" }}
                  >
                    {first[0]}
                    <span style={{ color: "#F59E0B" }}>{second[0]}</span>
                  </span>
                </div>
              </div>

              {/* Name */}
              <p
                className="font-syne font-black text-xl leading-tight text-center mb-1"
                style={{
                  color: "#F0F4FF",
                  letterSpacing: "-0.02em",
                  transform: "translateZ(20px)",
                }}
              >
                {portfolioData.name}
              </p>
              <p
                className="text-sm font-mono-code text-center"
                style={{ color: "#60A5FA", transform: "translateZ(15px)" }}
              >
                {portfolioData.title}
              </p>
            </div>

            {/* Bottom area — stats row */}
            <div
              className="grid grid-cols-3 divide-x divide-[rgba(37,99,235,0.15)]"
              style={{ borderTop: "1px solid rgba(37,99,235,0.15)" }}
            >
              {portfolioData.stats.slice(0, 3).map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center py-4 px-2"
                >
                  <span
                    className="font-syne font-black text-xl"
                    style={{ color: "#2563EB", letterSpacing: "-0.03em" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[10px] font-mono-code text-center leading-tight mt-0.5"
                    style={{ color: "#7B8EAF" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shadow glow beneath card */}
        <div
          className="absolute -inset-x-4 -bottom-4 rounded-3xl pointer-events-none"
          style={{
            height: "40%",
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(37,99,235,0.18), transparent 70%)",
            filter: "blur(16px)",
            zIndex: -1,
          }}
        />
      </motion.div>
    </div>
  );
}

/* ─── About section ──────────────────────────────────────────────────────── */
export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-24 md:py-32" ref={ref}>
      <SectionBackground />

      <div className="container mx-auto px-5 sm:px-8 relative" style={{ zIndex: 1 }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-16 md:mb-20">
            <p
              className="font-mono-code text-xs tracking-widest uppercase mb-4"
              style={{ color: "#2563EB" }}
            >
              01 — About
            </p>
            <h2
              className="font-syne font-black text-4xl sm:text-5xl leading-none"
              style={{ color: "#F0F4FF", letterSpacing: "-0.03em" }}
            >
              Who I am
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* LEFT — Bio + skills */}
            <motion.div variants={fadeUp}>
              <p
                className="text-base sm:text-lg leading-relaxed mb-8"
                style={{ color: "#7B8EAF" }}
              >
                {portfolioData.bio}
              </p>

              <div
                className="grid grid-cols-2 gap-4 pt-6 border-t mb-8"
                style={{ borderColor: "rgba(37,99,235,0.15)" }}
              >
                <div>
                  <p
                    className="text-xs font-mono-code uppercase tracking-wider mb-1"
                    style={{ color: "#7B8EAF" }}
                  >
                    Location
                  </p>
                  <p className="text-sm font-medium" style={{ color: "#F0F4FF" }}>
                    {portfolioData.location}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs font-mono-code uppercase tracking-wider mb-1"
                    style={{ color: "#7B8EAF" }}
                  >
                    Email
                  </p>
                  <p className="text-sm font-medium truncate" style={{ color: "#F0F4FF" }}>
                    {portfolioData.email}
                  </p>
                </div>
              </div>

              {/* Core stack chips */}
              <p
                className="text-xs font-mono-code uppercase tracking-wider mb-4"
                style={{ color: "#7B8EAF" }}
              >
                Core Stack
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {portfolioData.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1.5 rounded-full text-xs font-medium font-mono-code"
                    style={{
                      background: "rgba(37,99,235,0.1)",
                      border: "1px solid rgba(37,99,235,0.22)",
                      color: "#93C5FD",
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>

              {/* Skill bars */}
              <p
                className="text-xs font-mono-code uppercase tracking-wider mb-5"
                style={{ color: "#7B8EAF" }}
              >
                Proficiency
              </p>
              <div className="space-y-4">
                {portfolioData.skills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium" style={{ color: "#F0F4FF" }}>
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono-code" style={{ color: "#7B8EAF" }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className="w-full h-1 rounded-full overflow-hidden"
                      style={{ background: "rgba(37,99,235,0.1)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "var(--gradient-primary)" }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          delay: 0.5 + i * 0.1,
                          duration: 1,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — 3D profile card */}
            <motion.div variants={fadeUp} className="flex flex-col gap-6 lg:pt-4">
              <ProfileCard />

              {/* 4th stat separately */}
              {portfolioData.stats[3] && (
                <div
                  className="p-5 rounded-2xl flex items-center gap-4"
                  style={{
                    background: "rgba(37,99,235,0.07)",
                    border: "1px solid rgba(37,99,235,0.14)",
                  }}
                >
                  <span
                    className="font-syne font-black text-4xl"
                    style={{ color: "#2563EB", letterSpacing: "-0.03em" }}
                  >
                    {portfolioData.stats[3].value}
                  </span>
                  <span className="text-sm" style={{ color: "#7B8EAF" }}>
                    {portfolioData.stats[3].label}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
