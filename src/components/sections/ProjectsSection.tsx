import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export function ProjectsSection() {
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

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={cardVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A showcase of my recent work, featuring modern web applications and innovative solutions
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {portfolioData.projects.map((project, index) => (
              <motion.div key={project.id} variants={cardVariants}>
                <Card className="group overflow-hidden glass border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-glow-primary/20 cursor-pointer">
                  {/* Project Image */}
                  <div 
                    className="relative overflow-hidden"
                    onClick={() => handleProjectClick(project.liveUrl)}
                  >
                    <div className="aspect-video bg-muted relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center space-y-4">
                          <ExternalLink className="h-8 w-8 mx-auto" />
                          <p className="text-sm font-medium">View Live Demo</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-background/90 text-foreground border-primary/20">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 
                        className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300 cursor-pointer"
                        onClick={() => handleProjectClick(project.liveUrl)}
                      >
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-primary">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs border-accent/30 text-accent hover:bg-accent/10"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        onClick={() => handleProjectClick(project.liveUrl)}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                        size="sm"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button
                        onClick={() => handleProjectClick(project.liveUrl)}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        size="sm"
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Animated border */}
                  <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            variants={cardVariants}
            className="text-center mt-16"
          >
            <Card className="p-8 glass border-accent/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Want to See More?</h3>
              <p className="text-muted-foreground mb-6">
                These are just a few highlights from my portfolio. I'd love to discuss how I can help bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-gradient-primary text-white shadow-glow-primary"
                  size="lg"
                >
                  Start Your Project
                </Button>
                <Button
                  onClick={() => window.open("https://github.com", '_blank')}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  size="lg"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View All Code
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}