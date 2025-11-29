import * as React from "react"
import { Button, buttonVariants } from "./button"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { VariantProps } from "class-variance-authority"

interface ButtonWithLoadingProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  asChild?: boolean
}

const ButtonWithLoading = React.forwardRef<HTMLButtonElement, ButtonWithLoadingProps>(
  ({ children, isLoading, disabled, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={isLoading || disabled}
        className={className}
        {...props}
      >
        {isLoading && <Loader2 className="animate-spin" />}
        {children}
      </Button>
    )
  }
)

ButtonWithLoading.displayName = "ButtonWithLoading"

export { ButtonWithLoading }
