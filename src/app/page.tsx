import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { HeroSection } from "@/features/home/hero-section";
import { AboutSection } from "@/features/about/about-section";
import { SkillsSection } from "@/features/about/skills-section";
import { ExperienceSection } from "@/features/about/experience-section";
import { ProjectsSection } from "@/features/projects/projects-section";
import { LearningSection } from "@/features/learning/learning-section";
import { GitHubActivitySection } from "@/features/github/github-activity";
import { ContactSection } from "@/features/contact/contact-section";
import { siteConfig } from "@/lib/site-config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.title,
  description: siteConfig.description,
  url: siteConfig.url,
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <LearningSection />
        <GitHubActivitySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
