import * as React from "react"
import { Input as ShadcnInput } from "./input"
import { Label } from "./label"
import { cn } from "@/lib/utils"

interface InputWithLabelProps extends React.ComponentProps<"input"> {
  label?: string
  error?: string
  helperText?: string
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    const id = React.useId()
    
    return (
      <div className="space-y-2">
        {label && <Label htmlFor={id}>{label}</Label>}
        <ShadcnInput
          ref={ref}
          id={id}
          aria-invalid={!!error}
          className={cn(error && "border-destructive", className)}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    )
  }
)

InputWithLabel.displayName = "InputWithLabel"

export { InputWithLabel }
