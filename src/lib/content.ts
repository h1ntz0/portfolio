import type { ProfileContent } from "@/types/content";

export const profileContent: ProfileContent = {
  name: "Zein",
  role: "Backend Developer",
  headline: "Building tools that live in the terminal",
  status:
    "Currently learning Go, building Telegram bots, and improving my Python skills.",
  bio: [
    "I'm a Backend Developer who loves building CLI tools, Telegram bots, and clean APIs. If it can be done from the terminal, I'll probably build it there.",
    "My journey started with Python and automation, then expanded into Go, REST API design, and database work. I believe small, consistent projects teach more than grand plans.",
    "This site documents what I build and learn — from Todo-cli to telegram-sticker-bot, plus everything in between.",
  ],
  quote:
    "“Quality is never an accident; it is always the result of intelligent effort.” — John Ruskin",
  values: [
    "Test first, ship with confidence",
    "Write code for humans, not machines",
    "Learn in public",
    "Small, consistent progress beats bursts",
    "Boring, reliable technology wins",
  ],
  education: [
    {
      degree: "Bachelor's Degree in Computer Science",
      school: "University",
      period: "2016 – 2020",
      description:
        "Focused on software engineering fundamentals, algorithms, and databases.",
    },
  ],
  experience: [
    {
      role: "Backend Developer (Personal Projects)",
      company: "Open Source & Learning",
      period: "2023 – Present",
      description:
        "Building backend projects to practice API design, CLI tooling, and automation.",
      highlights: [
        "Developed Todo-cli, a command-line task manager for daily productivity",
        "Built telegram-sticker-bot, an automated sticker management bot",
        "Studying Go, Node.js, and clean architecture patterns",
      ],
    },
    {
      role: "Self-taught Developer",
      company: "Learning Journey",
      period: "2022 – 2023",
      description:
        "Started the journey: fundamentals of programming, Git, databases, and REST APIs.",
      highlights: [
        "Learned TypeScript, JavaScript, and backend fundamentals",
        "Practiced with small automation scripts and API exercises",
      ],
    },
  ],
  skills: [
    {
      category: "Frontend",
      skills: [
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "HTML/CSS",
        "Framer Motion",
      ],
    },
    {
      category: "Backend",
      skills: [
        "Node.js",
        "REST API",
        "PostgreSQL",
        "Prisma",
        "Supabase",
        "GraphQL",
      ],
    },
    {
      category: "Automation & Testing",
      skills: [
        "Playwright",
        "Cypress",
        "Vitest",
        "Jest",
        "Testing Library",
        "CI/CD",
      ],
    },
    {
      category: "Cloud & Tools",
      skills: [
        "Git",
        "GitHub Actions",
        "Docker",
        "Vercel",
        "Postman",
        "Linux",
      ],
    },
    {
      category: "AI",
      skills: [
        "AI-assisted development",
        "Prompt engineering",
        "LLM APIs",
        "RAG basics",
      ],
    },
    {
      category: "Soft Skills",
      skills: [
        "Communication",
        "Problem solving",
        "Code review",
        "Documentation",
        "Mentoring",
      ],
    },
  ],
  projects: [
    {
      title: "Todo-cli",
      description:
        "Lightweight command-line todo app built with Golang. Add tasks, view them, mark as completed, or delete — right from the terminal.",
      category: "tool",
      technologies: ["Go", "CLI"],
      github: "https://github.com/h1ntz0/Todo-cli",
      featured: true,
    },
    {
      title: "telegram-sticker-bot",
      description:
        "Telegram bot that converts any photo into a ready-to-use sticker with automatic resizing and transparent padding. Built with python-telegram-bot, Pillow, and SQLite.",
      category: "tool",
      technologies: ["Python", "python-telegram-bot", "Pillow", "SQLite"],
      github: "https://github.com/h1ntz0/telegram-sticker-bot",
      featured: true,
    },
    {
      title: "Personal Portfolio",
      description:
        "This website — a modern, SEO-friendly, and fully responsive portfolio built with Next.js and Tailwind CSS.",
      category: "web",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/h1ntz0/portfolio",
      demo: "https://h1ntz0.github.io/portfolio",
    },
  ],
  learning: [
    {
      title: "Building with Go",
      type: "course",
      date: "2025",
      description:
        "Learning Go fundamentals, concurrency, and building CLI tools.",
    },
    {
      title: "Telegram Bot Development",
      type: "project",
      date: "2025",
      description:
        "Building telegram-sticker-bot: bot API integration, media handling, and deployment.",
    },
    {
      title: "REST API Design",
      type: "course",
      date: "2024",
      description:
        "Studied API design principles, error handling, versioning, and documentation.",
    },
    {
      title: "Clean Architecture",
      type: "book",
      date: "2024",
      description:
        "Studied layered architecture, dependency inversion, and how to keep business logic testable.",
    },
    {
      title: "Database Fundamentals",
      type: "course",
      date: "2024",
      description:
        "SQL, indexing, and database design for backend applications.",
    },
    {
      title: "Git & GitHub Workflow",
      type: "practice",
      date: "2023",
      description:
        "Branching strategies, pull requests, and open source collaboration.",
    },
  ],
  certifications: [],
  roadmap: [
    {
      topic: "Master Go for backend services",
      status: "in-progress",
      note: "Building REST APIs and CLI tools with Go",
    },
    {
      topic: "Deploy and scale telegram-sticker-bot",
      status: "in-progress",
      note: "Production deployment, monitoring, and rate-limit handling",
    },
    {
      topic: "System design fundamentals",
      status: "planned",
      note: "Designing scalable, testable backend services",
    },
    {
      topic: "Get more involved in open source",
      status: "in-progress",
      note: "Ship regular contributions and maintain a project",
    },
    {
      topic: "Database optimization",
      status: "planned",
      note: "Query tuning, indexing strategies, and caching",
    },
    {
      topic: "API documentation standards",
      status: "done",
      note: "OpenAPI/Swagger specs and developer-friendly docs",
    },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Discord", href: "https://discord.com" },
  ],
};
