export type ProjectCategory =
  | "web"
  | "automation"
  | "ai"
  | "tool"
  | "open-source";

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export type LearningType = "course" | "book" | "practice" | "project";

export interface LearningItem {
  title: string;
  type: LearningType;
  date: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export type RoadmapStatus = "planned" | "in-progress" | "done";

export interface RoadmapItem {
  topic: string;
  status: RoadmapStatus;
  note?: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  description: string;
}

export interface ProfileContent {
  name: string;
  role: string;
  headline: string;
  status: string;
  bio: string[];
  quote: string;
  values: string[];
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillGroup[];
  projects: Project[];
  learning: LearningItem[];
  certifications: Certification[];
  roadmap: RoadmapItem[];
  socials: SocialLink[];
}
