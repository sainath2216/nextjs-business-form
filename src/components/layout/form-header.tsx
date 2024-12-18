"use client";
import Image from "next/image";
import { formSteps } from "@/lib/constants";
import { useFormStore } from "@/store/formStore";
import { ProgressSteps } from "@/components/ui/progress-steps";
import { useMemo } from "react";
import logo from "../logo/neospark.jpg";

type StepStatus = "complete" | "current" | "upcoming";

export function FormHeader() {
  const { currentStep } = useFormStore();

  const stepsWithStatus = useMemo(() => {
    return formSteps.map((step, index) => ({
      ...step,
      status:
        index < currentStep
          ? ("complete" as StepStatus)
          : index === currentStep
          ? ("current" as StepStatus)
          : ("upcoming" as StepStatus),
    }));
  }, [currentStep]);

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col md:flex-row items-center md:justify-center text-center md:text-left space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-24 h-auto md:w-32">
          <Image
            src={logo}
            alt="company-logo"
            width={128}
            height={128}
            priority
          />
        </div>
        <h1 className="text-2xl font-semibold">
          Business Partner Registration Form
        </h1>
      </div>
      <ProgressSteps steps={stepsWithStatus} currentStep={currentStep} />
    </div>
  );
}
