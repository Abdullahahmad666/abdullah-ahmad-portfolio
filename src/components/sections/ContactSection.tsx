import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { portfolioData } from "@/data/portfolioData";
import { SectionBackground } from "@/components/SectionBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Rotating circular badge ─────────────────────────────────────────────── */
function RotatingBadge() {
  const text = "AVAILABLE · LET'S WORK TOGETHER · LAHORE 2026 · ";
  const r = 56;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 148, height: 148 }}>
      {/* Rotating text ring */}
      <motion.svg
        className="absolute inset-0 overflow-visible"
        viewBox="0 0 148 148"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path
            id="badge-circle"
            d={`M74,74 m-${r},0 a${r},${r} 0 1,1 ${r * 2},0 a${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        <text
          style={{
            fontSize: 8.5,
            fill: "#60A5FA",
            letterSpacing: "0.14em",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
          }}
        >
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </motion.svg>

      {/* Static center monogram */}
      <div
        className="relative z-10 flex items-center justify-center rounded-full"
        style={{
          width: 64,
          height: 64,
          background: "rgba(37,99,235,0.12)",
          border: "1px solid rgba(37,99,235,0.3)",
          boxShadow: "0 0 24px rgba(37,99,235,0.2)",
        }}
      >
        <span className="font-syne font-black text-xl" style={{ letterSpacing: "-0.04em" }}>
          <span style={{ color: "#60A5FA" }}>A</span>
          <span style={{ color: "#F59E0B" }}>A</span>
        </span>
      </div>
    </div>
  );
}

/* ─── Magnetic send button ────────────────────────────────────────────────── */
interface MagneticProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function MagneticButton({ children, className, style, ...rest }: MagneticProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      style={{ x: sx, y: sy, ...(style as object) }}
      className={className}
      onMouseMove={onMove as any}
      onMouseLeave={onLeave}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
}

/* ─── Form input style ────────────────────────────────────────────────────── */
const inputBase: React.CSSProperties = {
  background: "rgba(8,17,31,0.9)",
  border: "1px solid rgba(37,99,235,0.18)",
  color: "#F0F4FF",
  borderRadius: "0.75rem",
  padding: "0.75rem 1rem",
  width: "100%",
  outline: "none",
  fontSize: "0.875rem",
  transition: "border-color 0.2s",
};

interface FormData { name: string; email: string; subject: string; message: string; }

/* ─── Contact section ─────────────────────────────────────────────────────── */
export function ContactSection() {
  const ref = useRef(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelGlowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast({ title: "Message sent!", description: "I'll get back to you shortly." });
    setForm({ name: "", email: "", subject: "", message: "" });
    setSubmitting(false);
  };

  /* Mini spotlight that follows mouse inside the left panel */
  const onPanelMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current || !panelGlowRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    panelGlowRef.current.style.background = `radial-gradient(320px circle at ${x}px ${y}px, rgba(37,99,235,0.1), transparent)`;
  };

  const contacts = [
    { icon: Mail,    label: "Email",    value: portfolioData.email,    href: `mailto:${portfolioData.email}` },
    { icon: Phone,   label: "Phone",    value: portfolioData.phone,    href: `tel:${portfolioData.phone}` },
    { icon: MapPin,  label: "Location", value: portfolioData.location, href: undefined },
  ];

  const socials = [
    { icon: Github,   label: "GitHub",   url: "https://github.com/Abdullahahmad666" },
    { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/abdullah-ahmad-a00913259/" },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32" ref={ref}>
      <SectionBackground orbColor="#1D4ED8" />

      {/* Watermark */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 select-none pointer-events-none font-syne font-black leading-none"
        style={{
          fontSize: "clamp(14rem, 28vw, 26rem)",
          color: "rgba(37,99,235,0.04)",
          letterSpacing: "-0.06em",
          zIndex: 0,
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        04
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
              04 — Contact
            </p>
            <div className="flex items-end gap-6 flex-wrap">
              <h2
                className="font-syne font-black text-4xl sm:text-5xl leading-none"
                style={{ color: "#F0F4FF", letterSpacing: "-0.03em" }}
              >
                Let's connect
              </h2>
              <p className="text-sm pb-1" style={{ color: "#7B8EAF", maxWidth: 340 }}>
                Open to full-time roles, freelance projects, and exciting collaborations.
              </p>
            </div>
          </motion.div>

          {/* Full-width two-column grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* LEFT — badge + info + socials */}
            <motion.div
              ref={panelRef}
              variants={fadeUp}
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(8,17,31,0.6)",
                border: "1px solid rgba(37,99,235,0.12)",
                padding: "2rem",
              }}
              onMouseMove={onPanelMove}
            >
              {/* Mini spotlight layer */}
              <div
                ref={panelGlowRef}
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{ zIndex: 0 }}
              />

              <div className="relative" style={{ zIndex: 1 }}>
                {/* Top: badge + availability side-by-side */}
                <div className="flex items-center gap-6 mb-8 flex-wrap">
                  <RotatingBadge />

                  <div className="flex-1 min-w-40">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                        style={{ boxShadow: "0 0 6px rgba(74,222,128,0.7)" }}
                      />
                      <span className="text-sm font-semibold" style={{ color: "#4ADE80" }}>
                        Currently available
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "#7B8EAF" }}>
                      Typical response time within 24 hours.
                    </p>
                    <div className="flex gap-3 mt-4">
                      {socials.map(({ icon: Icon, label, url }) => (
                        <a
                          key={label}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                        >
                          <motion.div
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                            style={{
                              background: "rgba(37,99,235,0.1)",
                              border: "1px solid rgba(37,99,235,0.2)",
                              color: "#93C5FD",
                            }}
                            whileHover={{ scale: 1.06, borderColor: "#2563EB" } as any}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Icon className="h-3.5 w-3.5" />
                            {label}
                          </motion.div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="mb-7" style={{ height: 1, background: "rgba(37,99,235,0.12)" }} />

                {/* Contact links */}
                <div className="space-y-5">
                  {contacts.map(({ icon: Icon, label, value, href }) => (
                    <motion.a
                      key={label}
                      href={href}
                      className="flex items-center gap-4 group"
                      whileHover={{ x: 6 } as any}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                        style={{
                          background: "rgba(37,99,235,0.1)",
                          border: "1px solid rgba(37,99,235,0.22)",
                        }}
                      >
                        <Icon className="h-4 w-4" style={{ color: "#60A5FA" }} />
                      </div>
                      <div>
                        <p
                          className="text-xs font-mono-code uppercase tracking-wider mb-0.5"
                          style={{ color: "#7B8EAF" }}
                        >
                          {label}
                        </p>
                        <p className="text-sm font-medium" style={{ color: "#F0F4FF" }}>
                          {value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Form */}
            <motion.div variants={fadeUp}>
              <div
                className="p-7 rounded-2xl h-full"
                style={{
                  background: "rgba(8,17,31,0.85)",
                  border: "1px solid rgba(37,99,235,0.14)",
                }}
              >
                <form onSubmit={onSubmit} className="space-y-4 flex flex-col h-full">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(["name", "email"] as const).map((field) => (
                      <div key={field}>
                        <label
                          htmlFor={field}
                          className="block text-xs font-mono-code uppercase tracking-wider mb-1.5"
                          style={{ color: "#7B8EAF" }}
                        >
                          {field === "name" ? "Name *" : "Email *"}
                        </label>
                        <input
                          id={field}
                          name={field}
                          type={field === "email" ? "email" : "text"}
                          required
                          value={form[field]}
                          onChange={onChange}
                          placeholder={field === "name" ? "Your name" : "you@email.com"}
                          style={inputBase}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#2563EB")}
                          onBlur={(e) =>
                            (e.currentTarget.style.borderColor = "rgba(37,99,235,0.18)")
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-mono-code uppercase tracking-wider mb-1.5"
                      style={{ color: "#7B8EAF" }}
                    >
                      Subject *
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={onChange}
                      placeholder="What's this about?"
                      style={inputBase}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#2563EB")}
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "rgba(37,99,235,0.18)")
                      }
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono-code uppercase tracking-wider mb-1.5"
                      style={{ color: "#7B8EAF" }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={onChange}
                      placeholder="Tell me about your project…"
                      style={{ ...inputBase, resize: "none", flex: 1, minHeight: 120 }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#2563EB")}
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "rgba(37,99,235,0.18)")
                      }
                    />
                  </div>

                  {/* Magnetic send button */}
                  <div className="flex justify-center pt-1">
                    <MagneticButton
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold bg-[#2563EB] text-white disabled:opacity-60 transition-opacity"
                    >
                      {submitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </MagneticButton>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
