"use client";

import { formSteps } from "@/lib/constants";
import { useFormStore } from "@/store/formStore";
import { ProgressSteps } from "@/components/ui/progress-steps";
import { useMemo } from "react";

type StepStatus = "complete" | "current" | "upcoming";

export function FormHeader() {
  const { currentStep } = useFormStore();

  const stepsWithStatus = useMemo(() => {
    return formSteps.map((step, index) => ({
      ...step,
      status: index < currentStep 
        ? ("complete" as StepStatus)
        : index === currentStep 
          ? ("current" as StepStatus)
          : ("upcoming" as StepStatus)
    }));
  }, [currentStep]);

  return (
    <div className="space-y-6 text-white">
      <h1 className="text-2xl font-semibold">
        Business Partner Registration Form
      </h1>
      <ProgressSteps steps={stepsWithStatus} currentStep={currentStep} />
    </div>
  );
}