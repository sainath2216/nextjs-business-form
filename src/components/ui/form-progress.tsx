// components/ui/form-progress.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max: number;
  variant?: "default" | "success" | "destructive";
  size?: "default" | "sm" | "lg";
  showPercentage?: boolean;
  showStepCount?: boolean;
}

const FormProgress = React.forwardRef<HTMLDivElement, FormProgressProps>(
  (
    {
      className,
      value,
      max,
      variant = "default",
      size = "default",
      showPercentage = false,
      showStepCount = true,
      ...props
    },
    ref
  ) => {
    const percentage = Math.round((value / max) * 100);

    const variants = {
      default: "bg-purple-600",
      success: "bg-green-600",
      destructive: "bg-red-600",
    };

    const sizes = {
      sm: "h-1",
      default: "h-2",
      lg: "h-3",
    };

    return (
      <div ref={ref} className={cn("w-full space-y-2", className)} {...props}>
        <div className="w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn(
              "transition-all duration-300 ease-in-out rounded-full",
              variants[variant],
              sizes[size]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          {showStepCount && (
            <span>
              Step {value} of {max}
            </span>
          )}
          {showPercentage && <span>{percentage}%</span>}
        </div>
      </div>
    );
  }
);

FormProgress.displayName = "FormProgress";

export { FormProgress };