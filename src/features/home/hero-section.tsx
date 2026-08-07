"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/shared/brand-icons";
import { useProfileContent } from "@/hooks/use-profile-content";
import { siteConfig } from "@/lib/site-config";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HeroSection() {
  const { name, headline, status } = useProfileContent();

  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:py-32"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-6"
      >
        <motion.span
          variants={item}
          className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
        >
          {name} · {siteConfig.title}
        </motion.span>

        <motion.h1
          id="hero-heading"
          variants={item}
          className="max-w-2xl text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-xl text-base text-muted-foreground text-pretty sm:text-lg"
        >
          {status || siteConfig.description}
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Button size="lg" asChild>
            <Link href="/#projects">
              View Projects
              <ArrowRight data-icon="inline-end" className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon data-icon="inline-start" className="size-4" />
              GitHub
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
