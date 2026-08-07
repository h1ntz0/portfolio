"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2 } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import {
  DiscordIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/shared/brand-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProfileContent } from "@/hooks/use-profile-content";
import { siteConfig } from "@/lib/site-config";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const socialIcons: Record<string, typeof GithubIcon> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Instagram: InstagramIcon,
  Discord: DiscordIcon,
};

export function ContactSection() {
  const { socials } = useProfileContent();
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const subject = encodeURIComponent(
      `Message from ${values.name} via ${siteConfig.name}`
    );
    const body = encodeURIComponent(
      `${values.message}\n\n— ${values.name} (${values.email})`
    );
    window.location.assign(
      `mailto:hello@example.com?subject=${subject}&body=${body}`
    );
    setSent(true);
    reset();
  });

  return (
    <section
      aria-labelledby="contact-heading"
      id="contact"
      className="mx-auto w-full max-w-5xl scroll-mt-16 px-4 py-16 sm:py-24"
    >
      <SectionHeading
        eyebrow="Contact"
        title="Let's work together"
        description="Have a project, a role, or a question? My inbox is always open."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle asChild className="text-base">
              <h3>Other ways to reach me</h3>
            </CardTitle>
            <CardDescription>
              Prefer social media? Find me on any of these:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {socials.map((social) => {
                const Icon = socialIcons[social.label] ?? MailIcon;

                return (
                  <li key={social.label}>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon className="size-4" />
                        {social.label}
                      </a>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle asChild className="text-base">
              <h3>Send a message</h3>
            </CardTitle>
            <CardDescription>
              Fill in the form — it opens your email client with everything
              prefilled.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div
                role="status"
                className="flex flex-col items-center gap-3 rounded-lg border border-border bg-muted/50 px-6 py-10 text-center"
              >
                <CheckCircle2 className="size-8 text-foreground/70" />
                <p className="font-medium">Message ready to send!</p>
                <p className="text-sm text-muted-foreground">
                  Your email client should have opened with the message. If
                  not, check your email settings.
                </p>
                <Button variant="outline" onClick={() => setSent(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.name)}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p role="alert" className="text-xs text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p role="alert" className="text-xs text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    aria-invalid={Boolean(errors.message)}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p role="alert" className="text-xs text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    <Send className="size-4" />
                    {isSubmitting ? "Sending..." : "Send message"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
