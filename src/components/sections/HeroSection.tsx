import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolioData";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";

function FloatingOrb() {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#8b5cf6" wireframe />
      </Sphere>
    </Float>
  );
}

export function HeroSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Canvas */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <FloatingOrb />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Main heading with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Hi, I'm{" "}
              <span className="gradient-text animate-glow">
                {portfolioData.name.split(" ")[0]}
              </span>
            </motion.h1>
            
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {portfolioData.title}
            </motion.h2>
          </motion.div>

          {/* Tagline */}
          <motion.p 
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {portfolioData.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button
              onClick={scrollToContact}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-primary"
              size="lg"
            >
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              size="lg"
            >
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <button
              onClick={scrollToAbout}
              className="text-muted-foreground hover:text-primary transition-colors animate-bounce"
            >
              <ArrowDown className="h-6 w-6" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
    </section>
  );
}