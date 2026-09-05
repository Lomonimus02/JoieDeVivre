import { cn } from "@/lib/utils";

export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden>
      <span className="rule-gold h-px w-16 opacity-60" />
      <span className="size-1 rotate-45 bg-gold" />
      <span className="rule-gold h-px w-16 opacity-60" />
    </div>
  );
}

export function SectionEyebrow({ children }: { children: string }) {
  return <p className="eyebrow text-gold">{children}</p>;
}
