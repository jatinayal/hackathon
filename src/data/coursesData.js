import thunderImg from '../assets/images/thunder.png';
import devopsImg from '../assets/images/devops.png';
import courseImg from '../assets/images/course.png';

export const coursesData = [
  {
    id: "thunder-web",
    title: "Thunder: 100 Days of Code",
    subtitle: "Web Development + System Design + Security + DevOps",
    duration: "100 Days",
    hours: "120+ Hours",
    level: "Beginner to Advanced",
    badges: ["LIVE", "POPULAR"],
    isLive: true,
    isPopular: true,
    accent: "#f59e0b",
    image: thunderImg,
    instructors: ["Rohit Negi", "Aditya Tandon"],
    link: "#courses"
  },
  {
    id: "devops",
    title: "DevOps Full Course",
    displayTitle: "DevOps: From Foundations to Production",
    subtitle: "Linux + CI/CD + Docker + Kubernetes + Terraform + Cloud",
    duration: "8 weeks",
    hours: "60+ Hours",
    level: "Beginner to Advanced",
    badges: ["LIVE"],
    isLive: true,
    accent: "#eab308",
    image: devopsImg,
    instructors: ["Rohit Negi"],
    link: "#courses"
  },
  {
    id: "combo",
    title: "DSA + GenAI Combo",
    subtitle: "Complete tech stack with DSA and AI",
    duration: "4 months",
    hours: "100+ Hours",
    level: "Beginner to Advanced",
    badges: ["LIVE", "POPULAR"],
    isLive: true,
    isPopular: true,
    accent: "#38bdf8",
    image: courseImg,
    instructors: ["Rohit Negi", "Aditya Tandon"],
    link: "#courses"
  },
  {
    id: "dsa-cpp",
    title: "Data Structure & Algorithms",
    subtitle: "Master DSA with C++ from basics to advanced level",
    duration: "4 months",
    hours: "100+ Hours",
    level: "Beginner to Advanced",
    badges: ["LIVE"],
    isLive: true,
    accent: "#a855f7",
    image: courseImg,
    instructors: ["Rohit Negi"],
    link: "#courses"
  },
  {
    id: "genai",
    title: "Generative AI",
    subtitle: "Build autonomous AI agents from scratch",
    duration: "4 months",
    hours: "50+ Hours",
    level: "Beginner to Advanced",
    badges: ["LIVE"],
    isLive: true,
    accent: "#10b981",
    image: courseImg,
    instructors: ["Rohit Negi"],
    link: "#courses"
  }
];
