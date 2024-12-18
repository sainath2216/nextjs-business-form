"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Step {
  id: number;
  title: string;
  path: string;
}

interface StepIndicatorProps {
  steps: Step[];
}

export function StepIndicator({ steps }: StepIndicatorProps) {
  const pathname = usePathname();

  const getStepStatus = (stepPath: string) => {
    const currentStepIndex = steps.findIndex((step) => step.path === pathname);
    const stepIndex = steps.findIndex((step) => step.path === stepPath);

    if (stepIndex < currentStepIndex) return "completed";
    if (stepIndex === currentStepIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="w-full py-4">
      <nav aria-label="Progress">
        <ol className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const status = getStepStatus(step.path);

            return (
              <li key={step.path} className="relative flex items-center flex-1">
                {/* Step Indicator */}
                <Link
                  href={step.path}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-transform duration-200 z-10",
                    {
                      "border-purple-600 text-purple-600 scale-110":
                        status === "current",
                      "border-green-500 bg-green-500 text-white":
                        status === "completed",
                      "border-gray-300 text-gray-500": status === "upcoming",
                    }
                  )}
                >
                  {status === "completed" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </Link>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-[50%] left-[50%] h-[2px] w-full",
                      status === "completed"
                        ? "bg-green-500"
                        : "bg-gray-300"
                    )}
                  />
                )}

                {/* Step Label */}
                <span
                  className={cn(
                    "mt-2 text-center text-xs font-medium absolute top-12 left-0 w-full",
                    {
                      "text-purple-600": status === "current",
                      "text-green-500": status === "completed",
                      "text-gray-500": status === "upcoming",
                    }
                  )}
                >
                  {step.title}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
