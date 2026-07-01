import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import * as LucideIcons from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const [first, second] = portfolioData.name.split(" ");

  return (
    <footer
      style={{
        background: "#06080E",
        borderTop: "1px solid rgba(37,99,235,0.12)",
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-14">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-syne font-black text-2xl mb-3" style={{ color: "#F0F4FF", letterSpacing: "-0.03em" }}>
              {first[0]}
              <span style={{ color: "#2563EB" }}>{second[0]}</span>
              <span style={{ color: "rgba(240,244,255,0.3)" }}>.</span>
            </p>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "#7B8EAF" }}>
              {portfolioData.tagline}
            </p>
            <p className="text-xs font-mono-code" style={{ color: "#7B8EAF" }}>
              {portfolioData.location}
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="font-mono-code text-xs uppercase tracking-widest mb-5" style={{ color: "#7B8EAF" }}>
              Navigation
            </p>
            <nav className="space-y-2.5">
              {portfolioData.navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="block text-sm hover:text-white transition-colors duration-200"
                  style={{ color: "rgba(240,244,255,0.55)" }}
                  whileHover={{ x: 4 } as any}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Social + contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="font-mono-code text-xs uppercase tracking-widest mb-5" style={{ color: "#7B8EAF" }}>
              Connect
            </p>
            <div className="flex gap-2 mb-6">
              {portfolioData.socialLinks.map((s) => {
                const Icon = LucideIcons[s.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
                return (
                  <motion.a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200"
                    style={{
                      background: "rgba(37,99,235,0.1)",
                      border: "1px solid rgba(37,99,235,0.18)",
                      color: "#93C5FD",
                    }}
                    whileHover={{ scale: 1.1, y: -2 } as any}
                    whileTap={{ scale: 0.95 }}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                  </motion.a>
                );
              })}
            </div>
            <div className="space-y-1.5">
              <p className="text-xs" style={{ color: "rgba(240,244,255,0.45)" }}>
                {portfolioData.email}
              </p>
              <p className="text-xs" style={{ color: "rgba(240,244,255,0.45)" }}>
                {portfolioData.phone}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t"
          style={{ borderColor: "rgba(37,99,235,0.1)" }}
        >
          <p className="text-xs font-mono-code" style={{ color: "rgba(240,244,255,0.3)" }}>
            © {year} {portfolioData.name}. All rights reserved.
          </p>
          <p className="text-xs font-mono-code" style={{ color: "rgba(240,244,255,0.2)" }}>
            Built with React + Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
