import { cn } from "@/lib/utils/cn";

interface ScriptTextProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
}

export function ScriptText({
  children,
  as: Tag = "span",
  className,
}: ScriptTextProps) {
  return (
    <Tag className={cn("font-script leading-none", className)}>{children}</Tag>
  );
}
