import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolioData";

export function AboutSection() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Passionate about creating digital experiences that make a difference
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Bio Section */}
            <motion.div variants={itemVariants}>
              <Card className="p-8 glass border-primary/20 shadow-glow-primary/20">
                <h3 className="text-2xl font-semibold mb-6 gradient-text">My Story</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {portfolioData.bio}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-3">Core Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.skills.map((skill) => (
                      <Badge
                        key={skill.name}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <p className="font-medium">{portfolioData.location}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="font-medium">{portfolioData.email}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Stats Section */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-2 gap-6">
                {portfolioData.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: { delay: index * 0.1, duration: 0.5 }
                      }
                    }}
                  >
                    <Card className="p-6 text-center glass border-accent/20 hover:shadow-glow-accent/20 transition-all duration-300">
                      <div className="text-3xl font-bold gradient-text mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Skills Progress */}
              <motion.div
                variants={itemVariants}
                className="mt-8"
              >
                <h4 className="text-lg font-medium mb-4">Technical Expertise</h4>
                <div className="space-y-4">
                  {portfolioData.skills.slice(0, 4).map((skill, index) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className="h-2 bg-gradient-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ delay: 1 + index * 0.2, duration: 1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}