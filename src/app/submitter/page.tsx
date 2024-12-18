"use client";

import { SubmitterForm } from "@/components/forms/submitter-form";

export default function SubmitterPage() {
  return (
    <div className="container max-w-3xl mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Submitter Declaration</h1>
          <p className="text-muted-foreground">
            Please provide submitter details and verify the form
          </p>
        </div>
        <SubmitterForm />
      </div>
    </div>
  );
}