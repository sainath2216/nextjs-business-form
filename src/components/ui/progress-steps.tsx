"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface Step {
  id: number;
  name: string;
  href: string;
  status: "complete" | "current" | "upcoming";
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="relative">
        <div className="w-full h-2 bg-purple-700 rounded-full">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <ol className="mt-4 flex items-center justify-between w-full">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={cn(
              "relative flex flex-col items-center",
              stepIdx !== steps.length - 1 ? "flex-1" : undefined
            )}
          >
            {/* Step number */}
            <div className="flex items-center justify-center">
              {step.status === "complete" ? (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              ) : (
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2",
                    step.status === "current"
                      ? "border-white bg-white text-purple-600"
                      : "border-white bg-transparent text-white"
                  )}
                >
                  <span className="text-sm font-medium">{step.id}</span>
                </div>
              )}
            </div>

            {/* Step name */}
            <div className="mt-2 text-xs text-center">
              <span
                className={cn(
                  "font-medium",
                  step.status === "complete" ? "text-green-500" :
                  step.status === "current" ? "text-white" :
                  "text-white/70"
                )}
              >
                {step.name}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}