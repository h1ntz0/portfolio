import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div id={id} className={cn("flex flex-col gap-3", className)}>
      <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
      <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-pretty text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
