import * as React from "react"
import { cn } from "../../lib/utils"

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        {
          "border-transparent bg-primary text-on-primary shadow hover:bg-primary/80": variant === "default",
          "border-transparent bg-secondary text-on-secondary hover:bg-secondary/80": variant === "secondary",
          "border-transparent bg-error text-on-error hover:bg-error/80": variant === "destructive",
          "text-on-surface border-outline-variant": variant === "outline",
          // LexGuard semantic risk colors
          "border-transparent bg-green-500/10 text-green-700 dark:text-green-400": variant === "safe",
          "border-transparent bg-yellow-500/10 text-yellow-700 dark:text-yellow-400": variant === "moderate",
          "border-transparent bg-orange-500/10 text-orange-700 dark:text-orange-400": variant === "high",
          "border-transparent bg-red-500/10 text-red-700 dark:text-red-400": variant === "critical",
        },
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
