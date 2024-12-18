"use client";

import { AddressForm } from "@/components/forms/address-form";

export default function AddressPage() {
  return (
    <div className="container max-w-3xl mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Address Details</h1>
          <p className="text-muted-foreground">
            Please provide your business address details
          </p>
        </div>
        <AddressForm />
      </div>
    </div>
  );
}