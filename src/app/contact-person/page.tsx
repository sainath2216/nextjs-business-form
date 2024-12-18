"use client";

import { ContactPersonForm } from "@/components/forms/contact-person-form";

export default function ContactPersonPage() {
  return (
    <div className="container max-w-3xl mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Contact Person Details</h1>
          <p className="text-muted-foreground">
            Please provide the details of the primary contact person
          </p>
        </div>
        <ContactPersonForm />
      </div>
    </div>
  );
}