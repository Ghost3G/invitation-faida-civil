import { cn } from "@/lib/utils/cn";

interface ShimmerTextProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
}

export function ShimmerText({
  children,
  as: Tag = "span",
  className,
}: ShimmerTextProps) {
  return (
    <Tag className={cn("shimmer-text font-display", className)}>{children}</Tag>
  );
}
