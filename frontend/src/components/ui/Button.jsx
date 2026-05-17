import * as React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-on-primary shadow hover:bg-primary/90": variant === "default",
          "bg-error text-on-error shadow-sm hover:bg-error/90": variant === "destructive",
          "border border-outline bg-surface-container-lowest shadow-sm hover:bg-surface-container-low text-on-surface": variant === "outline",
          "hover:bg-surface-container-low text-on-surface": variant === "ghost",
          "bg-secondary text-on-secondary shadow-sm hover:bg-secondary/80": variant === "secondary",
          "h-9 px-4 py-2": size === "default",
          "h-8 rounded-md px-3 text-xs": size === "sm",
          "h-10 rounded-md px-8": size === "lg",
          "h-9 w-9": size === "icon",
        },
        className
      )}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
