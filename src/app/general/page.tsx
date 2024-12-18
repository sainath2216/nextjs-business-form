"use client";

import { GeneralForm } from "@/components/forms/general-form"; 

export default function GeneralPage() {
  return (
    <div className="container max-w-3xl mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">General Information</h1>
          <p className="text-muted-foreground">
            Please provide your business details
          </p>
        </div>
        <GeneralForm />
      </div>
    </div>
  );
}