import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolioData";
import * as LucideIcons from "lucide-react";

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="services" className="py-20" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={cardVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              My <span className="gradient-text">Services</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive solutions to bring your digital vision to life
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {portfolioData.services.map((service, index) => {
              const IconComponent = LucideIcons[service.icon as keyof typeof LucideIcons] as React.ComponentType<any>;
              
              return (
                <motion.div key={service.title} variants={cardVariants}>
                  <Card className="group p-8 h-full glass border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-glow-primary/20 hover:-translate-y-2">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        {IconComponent && (
                          <IconComponent className="h-8 w-8 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold group-hover:gradient-text transition-all duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="pt-4">
                        <h4 className="text-sm font-medium mb-3 text-primary">Key Features:</h4>
                        <div className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <motion.div
                              key={feature}
                              initial={{ opacity: 0, x: -20 }}
                              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                              transition={{ delay: 0.5 + index * 0.1 + featureIndex * 0.05 }}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-500"></div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            variants={cardVariants}
            className="text-center mt-16"
          >
            <Card className="p-8 glass border-accent/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="text-muted-foreground mb-6">
                Let's discuss how I can help bring your ideas to life with cutting-edge technology and creative solutions.
              </p>
              <motion.button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-gradient-primary text-white px-8 py-3 rounded-lg font-medium hover:scale-105 transition-transform shadow-glow-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Talk
              </motion.button>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}