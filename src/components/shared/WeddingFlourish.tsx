import { cn } from "@/lib/utils/cn";

interface WeddingFlourishProps {
  className?: string;
  variant?: "line" | "monogram";
  initials?: string;
}

/** Ornement floral élégant pour mariage civil */
export function WeddingFlourish({
  className,
  variant = "line",
  initials = "L & F",
}: WeddingFlourishProps) {
  if (variant === "monogram") {
    return (
      <div className={cn("flex flex-col items-center gap-2", className)}>
        <svg
          width="72"
          height="28"
          viewBox="0 0 72 28"
          fill="none"
          aria-hidden
          className="text-rose-glow/70"
        >
          <path
            d="M2 14 C14 4, 22 4, 36 14 C50 24, 58 24, 70 14"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M2 18 C14 8, 22 8, 36 18 C50 28, 58 28, 70 18"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.45"
            fill="none"
          />
        </svg>
        <span className="font-script text-2xl tracking-wide text-rose-glow">
          {initials}
        </span>
        <svg
          width="72"
          height="28"
          viewBox="0 0 72 28"
          fill="none"
          aria-hidden
          className="rotate-180 text-rose-glow/70"
        >
          <path
            d="M2 14 C14 4, 22 4, 36 14 C50 24, 58 24, 70 14"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center justify-center gap-3", className)}
      aria-hidden
    >
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-rose-glow/60" />
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 2.5 C9 2.5 4 6.5 4 10.5 C4 13 6 14.5 9 14.5 C12 14.5 14 13 14 10.5 C14 6.5 9 2.5 9 2.5Z"
          stroke="currentColor"
          strokeWidth="1"
          className="text-accent"
          fill="rgba(143,168,138,0.15)"
        />
        <circle cx="9" cy="10.5" r="1.2" className="fill-rose-glow" fill="#d4a5ab" />
      </svg>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-rose-glow/60" />
    </div>
  );
}
