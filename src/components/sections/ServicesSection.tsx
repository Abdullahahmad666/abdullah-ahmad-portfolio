import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { SectionBackground } from "@/components/SectionBackground";
import * as LucideIcons from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const CARD_NUMS = ["01", "02", "03", "04", "05", "06"];

/* ─── Service card ────────────────────────────────────────────────────────── */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof portfolioData.services)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const Icon = LucideIcons[
    service.icon as keyof typeof LucideIcons
  ] as React.ComponentType<{ className?: string }>;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(240px circle at ${x}px ${y}px, rgba(37,99,235,0.18), transparent)`;
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
      className="group relative p-7 rounded-2xl overflow-hidden cursor-default flex flex-col"
      style={{
        background: "rgba(8,17,31,0.82)",
        border: "1px solid rgba(37,99,235,0.14)",
        minHeight: 280,
      }}
      whileHover={{ borderColor: "rgba(37,99,235,0.45)", y: -6 } as any}
      transition={{ duration: 0.22 }}
    >
      {/* Inner spotlight */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{ opacity: 0, zIndex: 0 }}
      />

      {/* Card number — top-right */}
      <div
        className="absolute top-5 right-5 font-mono-code text-xs font-medium"
        style={{ color: "rgba(37,99,235,0.35)", zIndex: 1 }}
      >
        {CARD_NUMS[index]}
      </div>

      {/* Content */}
      <div className="relative flex flex-col flex-1" style={{ zIndex: 1 }}>
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
          style={{ background: "var(--gradient-primary)" }}
        >
          {Icon && <Icon className="h-4.5 w-4.5 text-white h-5 w-5" />}
        </div>

        <h3 className="font-syne font-bold text-lg mb-3 leading-snug" style={{ color: "#F0F4FF" }}>
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "#7B8EAF" }}>
          {service.description}
        </p>

        <ul className="space-y-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "#7B8EAF" }}>
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "#2563EB" }}
              />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-7 right-7 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "var(--gradient-primary)" }}
      />
    </motion.div>
  );
}

/* ─── Services section ───────────────────────────────────────────────────── */
export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-24 md:py-32" ref={ref}>
      <SectionBackground />

      {/* Large watermark "02" — purely decorative */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none font-syne font-black leading-none"
        style={{
          fontSize: "clamp(14rem, 28vw, 26rem)",
          color: "rgba(37,99,235,0.04)",
          letterSpacing: "-0.06em",
          zIndex: 0,
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        02
      </div>

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
              02 — Services
            </p>
            <div className="flex items-end gap-6 flex-wrap">
              <h2
                className="font-syne font-black text-4xl sm:text-5xl leading-none"
                style={{ color: "#F0F4FF", letterSpacing: "-0.03em" }}
              >
                What I build
              </h2>
              <p className="text-sm pb-1" style={{ color: "#7B8EAF", maxWidth: 340 }}>
                End-to-end solutions — from pixel-perfect interfaces to scalable back-end systems.
              </p>
            </div>
          </motion.div>

          {/* Grid — full width, 2 cols md, 4 cols xl */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {portfolioData.services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-14 flex items-center gap-5 flex-wrap">
            <motion.button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3.5 rounded-full text-sm font-semibold bg-[#2563EB] text-white"
              whileHover={{ scale: 1.04 } as any}
              whileTap={{ scale: 0.97 }}
            >
              Let's Talk
            </motion.button>
            <span className="text-sm" style={{ color: "#7B8EAF" }}>
              Available for freelance & full-time opportunities
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
