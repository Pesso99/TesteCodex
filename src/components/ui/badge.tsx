import { cn } from "@/lib/utils/cn";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-primary/30 bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary",
        className
      )}
      {...props}
    />
  );
}
