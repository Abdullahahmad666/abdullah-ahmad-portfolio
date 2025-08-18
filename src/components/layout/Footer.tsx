import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import * as LucideIcons from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold gradient-text mb-4">
                {portfolioData.name}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                {portfolioData.tagline}
              </p>
              <p className="text-sm text-muted-foreground">
                Based in {portfolioData.location}
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <nav className="space-y-3">
                {portfolioData.navigation.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ x: 5 }}
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
          </div>

          {/* Social Links */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6">Connect</h4>
              <div className="flex space-x-4">
                {portfolioData.socialLinks.map((social) => {
                  const IconComponent = LucideIcons[social.icon as keyof typeof LucideIcons] as React.ComponentType<any>;
                  
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {IconComponent && <IconComponent className="h-5 w-5" />}
                      <span className="sr-only">{social.name}</span>
                    </motion.a>
                  );
                })}
              </div>
              
              <div className="mt-6 space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Email:</strong> {portfolioData.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Phone:</strong> {portfolioData.phone}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-border mt-12 pt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} {portfolioData.name}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}