// data/content.ts

export const site = {
  name: "Knotic",
  logo: "✳",
  tagline: "Hack. Build. Scale.",
  description:
    "Knotic helps organizations accelerate innovation through AI systems, hackathons, developer programs, and ecosystem-driven execution.",
  email: "knotic@gmail.com",
  phone: "+91 XXXX",
  address: {
    street: "Saket",
    city: "New Delhi",
    country: "India",
  },
  social: {
    twitter: "#",
    instagram: "#",
    linkedin: "#",
  },
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const partners = [
  { name: "rezoomex", logo: "/images/partners/rezoomex_logo.png" },
  { name: "Adya",     logo: "/images/partners/adya_ai.svg"     },
  { name: "trae",     logo: "/images/partners/TRAE.jpg"     },
];

export const services = {
  heading: "From idea to execution, we've got you.",
  subheading:
    "We run hackathons, build developer communities, and ship AI systems that solve real problems.",
  cta: "All services",
  items: [
    {
      id: "Hackathon",
      title: "Hackathon & Innovation Programs",
      description:
        "Design and run high-impact hackathons, challenges, and developer ecosystems.",
      image: "/images/Hackathon.jpg", // ← leading slash + folder
    },
    {
      id: "Developer Ecosystem",
      title: "Developer Ecosystem & Media",
      description:
        "Full-stack web platforms, backends, ERP systems, and SaaS MVPs - build for scale.",
      image: "/images/developer-ecosystem.jpg",
    },
    {
      id: "AI Systems",
      title: "AI Systems & Digital Platforms",
      description:
        "LLM apps, AI agents, and intelligent automation systems that reduce operational load.",
      image: "/images/AI.jpg",
    },
  ],
};

export const features = [
  {
    icon: "+",
    title: "Built for Builders",
    description: "We work with teams that want to ship, not just plan.",
  },
  {
    icon: "◎",
    title: "Community at the Core",
    description:
      "Every program we run grows a network that outlasts the event.",
  },
  {
    icon: "✳",
    title: "From 10 to 10,000",
    description:
      "Whether it's a local hackathon or a national program, we scale it.",
  },
  {
    icon: "↗",
    title: "We Stay Till It Ships",
    description:
      "Not just strategy — we stick around until the thing actually works.",
  },
];

export const process = {
  sectionLabel: "HOW WE WORK",
  heading: "We build intelligent workflows that simplify complexity",
  steps: [
    {
      id: 1,
      title: "Discover & Define",
      description:
        "We dive deep into your business, goals, and challenges to identify where AI can create the most impact.",
      image: "/images/process01.jpg",
    },
    {
      id: 2,
      title: "Design & Architect",
      description:
        "We map out the ideal system architecture, choosing the right tools and models for your specific use case.",
      image: "/images/process02.jpg",
    },
    {
      id: 3,
      title: "Build & Integrate",
      description:
        "Our team builds the solution and integrates it directly into your existing stack with minimal friction.",
      image: "/images/process03.jpg",
    },
    {
      id: 4,
      title: "Launch & Evolve",
      description:
        "We deploy, monitor, and continuously refine your system so it grows smarter over time.",
      image: "/images/process04.jpg",
    },
  ],
};

export const testimonials = [
  {
    id: 1,
    quote:
      "Their approach completely transformed how we operate. What used to take hours is now automated and seamless.",
    name: "Noah Wilson",
    title: "Head of NexaFlow",
    avatar: "/avatars/1.jpg",
  },
  {
    id: 2,
    quote:
      "Element built us a decision engine that cut our processing time by 80%. It just works, and keeps getting better.",
    name: "Sara Chen",
    title: "CTO at Meridian Labs",
    avatar: "/avatars/2.jpg",
  },
  {
    id: 3,
    quote:
      "We went from spreadsheets to a fully automated pipeline in under three weeks. Incredible team, incredible results.",
    name: "Luca Ferretti",
    title: "Operations Lead at Stratos",
    avatar: "/avatars/3.jpg",
  },
  {
    id: 4,
    quote:
      "The integration was flawless. Our tools finally talk to each other, and our team can focus on actual work.",
    name: "Amara Osei",
    title: "Founder of Vault Digital",
    avatar: "/avatars/4.jpg",
  },
  {
    id: 5,
    quote:
      "Real-time insights we never had before. Element gave us the data layer we didn't know we were missing.",
    name: "James Park",
    title: "VP Product at Relic",
    avatar: "/avatars/5.jpg",
  },
];

export const faq = {
  heading: "Got Questions?\nWe've Got Answers.",
  cta: "Book consultation",
  items: [
    {
      id: 1,
      question: "What does Knotic specialize in?",
      answer:
        "Knotic specializes in AI-powered product engineering, scalable SaaS development, innovation programs, and developer ecosystem initiatives. We help organizations build modern digital products and engage technical communities effectively.",
    },
    {
      id: 2,
      question: "What kinds of products do you build?",
      answer:
        "We build AI-powered applications, SaaS platforms, custom websites, mobile apps, AI agents, automation systems, internal tools, and creator-focused digital platforms.",
    },
    {
      id: 3,
      question: "Do you work with startups and enterprises?",
      answer:
        "Yes. We work with startups, enterprises, universities, developer-focused organizations, and creator ecosystems. Our approach is tailored to the scale and stage of each project.",
    },
    {
      id: 4,
      question: "Can you help us build an MVP?",
      answer:
        "Absolutely. We help founders and early-stage teams turn ideas into production-ready MVPs with fast execution, scalable architecture, and product-focused development.",
    },
    {
      id: 5,
      question: "What AI services does Knotic offer?",
      answer:
        "Our AI services include AI agents, workflow automation, LLM integrations, conversational AI systems, internal AI tools, and custom AI product development.",
    },
    {
      id: 6,
      question: "Do you organize hackathons and innovation programs?",
      answer:
        "Yes. We manage end-to-end innovation programs including hackathons, AI bootcamps, developer workshops, hiring challenges, and community engagement initiatives for startups, enterprises, and universities.",
    },
    {
      id: 7,
      question: "Do you provide post-launch support and maintenance?",
      answer:
        "Yes. We provide ongoing maintenance, optimization, monitoring, and technical support to ensure long-term reliability, scalability, and performance.",
    },

    {
      id: 8,
      question: "How can we collaborate with Knotic?",
      answer:
        "You can connect with us through the Contact section or book a strategy call to discuss your product, innovation, or ecosystem goals.",
    },
  ],
};

export const cta = {
  heading: "Ready to build\nsmarter systems?",
  subheading: "Let's create workflows that think, adapt, and scale with you.",
  buttonLabel: "Free Demo",
};
