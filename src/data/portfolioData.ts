export const portfolioData = {
  // Personal Information
  name: "Abdullah Ahmad",
  title: "Full Stack Developer",
  tagline: "Building digital experiences that matter",
  bio: "I'm a passionate full-stack developer with 1+ years of experience creating modern web applications. I specialize in React, Node.js, and cloud technologies, helping businesses transform their ideas into powerful digital solutions.",
  location: "Pakistan, Lahore",
  email: "abdullah.ahmad3579@gmail.com",
  phone: "+92-332-4331776",
  
  // Navigation
  navigation: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ],
  
  // Social Links
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/Abdullahahmad666",
      icon: "Github"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abdullah-ahmad-a00913259/",
      icon: "Linkedin"
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: "Twitter"
    },
    {
      name: "Dribbble",
      url: "https://dribbble.com",
      icon: "Dribbble"
    }
  ],
  
  // Services
  services: [
    {
      title: "Frontend Development",
      description: "Creating responsive, interactive user interfaces using React, TypeScript, and modern CSS frameworks.",
      icon: "Code",
      features: [
        "React & Next.js Applications",
        "TypeScript Development",
        "Responsive Design",
        "Performance Optimization"
      ]
    },
    {
      title: "Backend Development",
      description: "Building scalable server-side applications with Node.js, databases, and cloud services.",
      icon: "Server",
      features: [
        "RESTful API Development",
        "Database Design",
        "Cloud Integration",
        "Authentication Systems"
      ]
    },
    {
      title: "UI/UX Design",
      description: "Designing intuitive user experiences with modern design principles and user-centered approach.",
      icon: "Palette",
      features: [
        "User Interface Design",
        "Wireframing & Prototyping",
        "Design Systems",
        "User Experience Research"
      ]
    },
    {
      title: "Consulting",
      description: "Providing technical guidance and strategic advice for your digital transformation journey.",
      icon: "Users",
      features: [
        "Technical Architecture",
        "Code Reviews",
        "Performance Audits",
        "Team Mentoring"
      ]
    }
  ],
  
  // Projects
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern React-based e-commerce platform with advanced filtering, shopping cart, and payment integration. Features responsive design and real-time inventory management.",
      image: "/images/ecommerce-project.jpg",
      liveUrl: "https://demo-ecommerce.com",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Web Development"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.",
      image: "/images/task-management.jpg",
      liveUrl: "https://demo-taskapp.com",
      technologies: ["React", "TypeScript", "Firebase", "Tailwind"],
      category: "Web App"
    },
    {
      id: 3,
      title: "AI-Powered Analytics Dashboard",
      description: "Interactive analytics dashboard with AI-driven insights, real-time data visualization, and predictive analytics for business intelligence.",
      image: "/images/analytics-dashboard.jpg",
      liveUrl: "https://demo-analytics.com",
      technologies: ["React", "Python", "TensorFlow", "D3.js"],
      category: "Data Visualization"
    },
    {
      id: 4,
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication, transaction history, and financial planning tools. Built with React Native.",
      image: "/images/banking-app.jpg",
      liveUrl: "https://demo-banking.com",
      technologies: ["React Native", "Node.js", "PostgreSQL", "JWT"],
      category: "Mobile Development"
    },
    {
      id: 5,
      title: "Restaurant Management System",
      description: "Comprehensive restaurant management system with order tracking, inventory management, and customer relationship features.",
      image: "/images/restaurant-system.jpg",
      liveUrl: "https://demo-restaurant.com",
      technologies: ["React", "Express", "MySQL", "Socket.io"],
      category: "Business Solutions"
    },
    {
      id: 6,
      title: "Social Media Platform",
      description: "Modern social media platform with real-time messaging, content sharing, and advanced privacy controls. Features include stories, posts, and live streaming.",
      image: "/images/social-platform.jpg",
      liveUrl: "https://demo-social.com",
      technologies: ["React", "GraphQL", "MongoDB", "Redis"],
      category: "Social Network"
    }
  ],

  // Skills
  skills: [
    { name: "React", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "AWS", level: 75 },
    { name: "Shopify", level: 85 }
  ],
  
  // Testimonials
  testimonials: [
    {
      name: "Sarah Mitchell",
      role: "Product Manager",
      company: "TechCorp",
      initials: "SM",
      rating: 5,
      text: "Abdullah delivered an exceptional e-commerce platform that exceeded all expectations. His attention to detail and ability to turn complex requirements into clean, working code is genuinely impressive.",
    },
    {
      name: "James Chen",
      role: "CTO",
      company: "StartupXYZ",
      initials: "JC",
      rating: 5,
      text: "Working with Abdullah was a pleasure from start to finish. He built our entire backend API from scratch — clean, scalable, and delivered ahead of schedule. Would hire again without hesitation.",
    },
    {
      name: "Aisha Rahman",
      role: "Founder",
      company: "DesignHub",
      initials: "AR",
      rating: 5,
      text: "Abdullah transformed our outdated website into a modern, high-performance platform. Our conversion rate jumped 40% in the first month. He's the rare developer who understands both code and product.",
    },
    {
      name: "Marcus Webb",
      role: "Lead Developer",
      company: "AgencyBlue",
      initials: "MW",
      rating: 5,
      text: "Exceptional React knowledge, clean architecture, and fast turnaround. Abdullah is my first call for complex frontend work. He communicates clearly and never disappears mid-project.",
    },
  ],

  // Stats
  stats: [
    { label: "Projects Completed", value: "10+" },
    { label: "Years Experience", value: "1+" },
    { label: "Happy Clients", value: "5+" },
    { label: "Code Commits", value: "700+" }
  ]
};

export type PortfolioData = typeof portfolioData;