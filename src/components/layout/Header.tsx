import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handle = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const [first, second] = portfolioData.name.split(" ");

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className="transition-all duration-300"
        style={
          isScrolled
            ? {
                background: "rgba(6,8,14,0.85)",
                backdropFilter: "blur(14px)",
                borderBottom: "1px solid rgba(37,99,235,0.12)",
              }
            : {}
        }
      >
        <nav className="container mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollTo("#home")}
              className="font-syne font-black text-lg tracking-tight text-white hover:opacity-80 transition-opacity"
            >
              {first[0]}
              <span style={{ color: "#2563EB" }}>{second[0]}</span>
              <span className="text-white/40">.</span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {portfolioData.navigation.map((item, i) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07 }}
                  onClick={() => scrollTo(item.href)}
                  className="relative px-4 py-2 text-sm font-medium group"
                  style={{ color: "rgba(240,244,255,0.65)" }}
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-200">
                    {item.name}
                  </span>
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-[#2563EB] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </motion.button>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white/70 hover:text-white transition-colors p-1"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 pb-4"
            >
              {portfolioData.navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollTo(item.href)}
                  className="block w-full text-left px-2 py-3 text-sm font-medium hover:text-white transition-colors"
                  style={{ color: "rgba(240,244,255,0.65)" }}
                >
                  {item.name}
                </button>
              ))}
            </motion.div>
          )}
        </nav>
      </div>
    </motion.header>
  );
}
