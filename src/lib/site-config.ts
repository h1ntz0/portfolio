export const siteConfig = {
  name: "GitHub Profile Website",
  title: "Software Engineer & QA Automation Engineer",
  description:
    "Portfolio, learning journey, projects, and software development activity of a Software Engineer & QA Automation Engineer.",
  url: "https://h1ntz0.github.io/portfolio",
  email: "arofizain12@gmail.com",
  githubUsername: "h1ntz0",
  links: {
    github: "https://github.com/h1ntz0",
    linkedin: "https://linkedin.com/in/username-saya",
  },
} as const;

export type SiteConfig = typeof siteConfig;
