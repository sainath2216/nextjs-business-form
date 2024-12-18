"use client";

import { TurnoverForm } from "@/components/forms/turnover-form";

export default function TurnoverPage() {
  return (
    <div className="container max-w-3xl mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Turnover Declaration</h1>
          <p className="text-muted-foreground">
            Please provide your turnover and ITR filing details
          </p>
        </div>
        <TurnoverForm />
      </div>
    </div>
  );
}