import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Star } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { SectionBackground } from "@/components/SectionBackground";

/* Distance between card centres when fully spread */
const SPREAD  = 280;
/* Card width */
const CARD_W  = 268;
/* z-index when stacked — inner cards sit on top */
const STACK_Z = [1, 4, 5, 2];

/* ─── Stars ───────────────────────────────────────────────────────────────── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5"
          style={{
            fill:  i < count ? "#F59E0B" : "transparent",
            color: i < count ? "#F59E0B" : "rgba(123,142,175,0.3)",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Author chip ─────────────────────────────────────────────────────────── */
function Author({ testimonial }: { testimonial: (typeof portfolioData.testimonials)[number] }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-syne font-black text-xs"
        style={{
          background: "linear-gradient(135deg, rgba(37,99,235,0.22), rgba(245,158,11,0.14))",
          border: "1px solid rgba(37,99,235,0.3)",
        }}
      >
        <span style={{ color: "#60A5FA" }}>{testimonial.initials[0]}</span>
        <span style={{ color: "#F59E0B" }}>{testimonial.initials[1]}</span>
      </div>
      <div>
        <p className="text-sm font-semibold font-syne leading-tight" style={{ color: "#F0F4FF" }}>
          {testimonial.name}
        </p>
        <p className="text-xs font-mono-code mt-0.5" style={{ color: "#7B8EAF" }}>
          {testimonial.role} · {testimonial.company}
        </p>
      </div>
    </div>
  );
}

/* ─── Card that springs to its spread position when isInView changes ─────── */
function AnimatedCard({
  testimonial,
  index,
  total,
  isInView,
}: {
  testimonial: (typeof portfolioData.testimonials)[number];
  index: number;
  total: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const center   = (total - 1) / 2;
  const targetX  = (index - center) * SPREAD;
  const startRot = (index - center) * 11;
  const startSc  = 1 - Math.abs(index - center) * 0.07;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    glowRef.current.style.background = `radial-gradient(200px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(37,99,235,0.18), transparent)`;
    glowRef.current.style.opacity = "1";
  };
  const onLeave = () => { if (glowRef.current) glowRef.current.style.opacity = "0"; };

  return (
    <motion.div
      ref={cardRef}
      initial={{ x: 0, rotate: startRot, scale: startSc, opacity: 0 }}
      animate={
        isInView
          ? { x: targetX, rotate: 0, scale: 1, opacity: 1 }
          : { x: 0, rotate: startRot, scale: startSc, opacity: 0 }
      }
      transition={{
        type: "spring",
        stiffness: 72,
        damping: 18,
        delay: isInView ? index * 0.07 : 0,
        opacity: { duration: 0.35, ease: "easeOut" },
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={isInView ? { y: -10, transition: { type: "spring", stiffness: 220, damping: 22 } } as any : undefined}
      style={{
        position: "absolute",
        width: CARD_W,
        left: "50%",
        top: 0,
        marginLeft: -(CARD_W / 2),
        zIndex: STACK_Z[index] ?? 3,
        background: "rgba(8,17,31,0.9)",
        border: "1px solid rgba(37,99,235,0.14)",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      {/* Hover spotlight */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ opacity: 0, borderRadius: "1rem" }}
      />

      {/* Decorative quote mark */}
      <div
        className="absolute top-3 right-4 font-syne font-black select-none pointer-events-none"
        style={{ fontSize: 68, lineHeight: 1, color: "rgba(37,99,235,0.07)", zIndex: 0 }}
        aria-hidden="true"
      >
        "
      </div>

      <div className="relative p-6" style={{ zIndex: 1 }}>
        <Stars count={testimonial.rating} />

        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "#7B8EAF", minHeight: 92 }}
        >
          "{testimonial.text}"
        </p>

        <div style={{ height: 1, background: "rgba(37,99,235,0.12)", marginBottom: "1rem" }} />

        <Author testimonial={testimonial} />
      </div>
    </motion.div>
  );
}

/* ─── Static card for mobile ──────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.11 } } };

function StaticCard({ testimonial }: { testimonial: (typeof portfolioData.testimonials)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const onMove  = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    glowRef.current.style.background = `radial-gradient(200px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(37,99,235,0.15), transparent)`;
    glowRef.current.style.opacity = "1";
  };
  const onLeave = () => { if (glowRef.current) glowRef.current.style.opacity = "0"; };

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative rounded-2xl p-6 overflow-hidden"
      style={{ background: "rgba(8,17,31,0.9)", border: "1px solid rgba(37,99,235,0.14)" }}
      whileHover={{ borderColor: "rgba(37,99,235,0.38)", y: -5 } as any}
      transition={{ duration: 0.2 }}
    >
      <div ref={glowRef} className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300" style={{ opacity: 0 }} />
      <div
        className="absolute top-3 right-4 font-syne font-black select-none pointer-events-none"
        style={{ fontSize: 68, lineHeight: 1, color: "rgba(37,99,235,0.07)" }}
        aria-hidden="true"
      >
        "
      </div>
      <div className="relative">
        <Stars count={testimonial.rating} />
        <p className="text-sm leading-relaxed mb-6" style={{ color: "#7B8EAF", minHeight: 80 }}>
          "{testimonial.text}"
        </p>
        <div style={{ height: 1, background: "rgba(37,99,235,0.12)", marginBottom: "1rem" }} />
        <Author testimonial={testimonial} />
      </div>
    </motion.div>
  );
}

/* ─── Testimonials section ────────────────────────────────────────────────── */
export function TestimonialsSection() {
  const { testimonials } = portfolioData;
  const sectionRef   = useRef<HTMLElement>(null);
  const cardsRef     = useRef<HTMLDivElement>(null);

  /* Section header fade-in */
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });
  /* Cards open when the cards row is 20% into the viewport */
  const cardsInView  = useInView(cardsRef, { once: false, margin: "-20% 0px -10% 0px" });

  /* Estimated card height for the absolute-positioned container */
  const CARD_H = 370;

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24 md:py-32">
      <SectionBackground />

      <div className="container mx-auto px-5 sm:px-8 relative" style={{ zIndex: 1 }}>
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-24"
        >
          <p
            className="font-mono-code text-xs tracking-widest uppercase mb-4"
            style={{ color: "#2563EB" }}
          >
            04 — Testimonials
          </p>
          <div className="flex items-end gap-6 flex-wrap">
            <h2
              className="font-syne font-black text-4xl sm:text-5xl leading-none"
              style={{ color: "#F0F4FF", letterSpacing: "-0.03em" }}
            >
              What clients say
            </h2>
            <p className="text-sm pb-1" style={{ color: "#7B8EAF", maxWidth: 320 }}>
              A few kind words from people I've shipped things with.
            </p>
          </div>
        </motion.div>

        {/* ── DESKTOP: spring-open card spread ── */}
        <div ref={cardsRef} className="hidden lg:block relative" style={{ height: CARD_H }}>
          {testimonials.map((t, i) => (
            <AnimatedCard
              key={t.name}
              testimonial={t}
              index={i}
              total={testimonials.length}
              isInView={cardsInView}
            />
          ))}
        </div>

        {/* ── MOBILE / TABLET: stagger grid ── */}
        <motion.div
          className="lg:hidden grid sm:grid-cols-2 gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {testimonials.map((t) => (
            <StaticCard key={t.name} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
