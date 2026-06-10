import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps extends React.ComponentProps<"select"> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          className={cn(
            "flex h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 pr-10 text-sm text-black font-medium focus-visible:outline-none focus-visible:border-[#E2C27A] focus-visible:ring-1 focus-visible:ring-[#E2C27A]/30 disabled:cursor-not-allowed disabled:opacity-50 transition-all appearance-none cursor-pointer shadow-sm",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {/* Custom Down Arrow Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
