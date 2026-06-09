import * as React from "react"
import { cn } from "@/lib/utils"

export interface LabelProps extends React.ComponentProps<"label"> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-xs font-black uppercase tracking-wider text-black select-none block mb-1",
          className
        )}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label }
