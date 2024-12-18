"use client";

import { GstDetailsForm } from "@/components/forms/gst-details-form";

export default function GstDetailsPage() {
  return (
    <div className="container max-w-3xl mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">GST, PAN & MSME Details</h1>
          <p className="text-muted-foreground">
            Please provide your tax and business registration details
          </p>
        </div>
        <GstDetailsForm />
      </div>
    </div>
  );
}