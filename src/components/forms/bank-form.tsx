"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/store/formStore";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FaRegCopyright } from "react-icons/fa";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  bankAccountName: z.string().min(1, "Bank account name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  bankName: z.string().min(1, "Bank name is required"),
  ifscCode: z
    .string()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format"),
  documentType: z.enum([
    "Cancelled Cheque",
    "Scanned Passbook Copy (First Page)",
    "Bank Statement",
    "Letter Head (For Virtual Account)",
  ]),
  document: z.any().optional().nullable(),
});

type FormData = z.infer<typeof formSchema>;

export function BankDetailsForm() {
  const router = useRouter();
  const { updateFormData, formData, setCurrentStep } = useFormStore();
  const [fileError, setFileError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debugLog = (...args: unknown[]) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(...args);
    }
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData?.bank || {
      bankAccountName: "",
      accountNumber: "",
      bankName: "",
      ifscCode: "",
      documentType: "Cancelled Cheque",
      document: undefined,
    },
  });

  useEffect(() => {
    debugLog("BankDetailsForm mounted");
    debugLog("Initial formData:", formData);
    debugLog("Current step being set to 2");
    setCurrentStep(2);
  }, [setCurrentStep, formData]);

  if (!formData) {
    debugLog("No form data available");
    return null;
  }

  debugLog("General form data:", formData.general);

  const isCustomer = formData.general?.partnerType === "Customer";
  debugLog("Is customer check:", isCustomer);

  if (isCustomer) {
    debugLog("Showing customer view");
    return (
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1>Bank Details Form</h1>
        <div className="space-y-6">
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold mb-4">Bank Details</h2>
            <p className="text-gray-600">
              Bank Details can be skipped for customers.
            </p>
            <p className="text-gray-600 mt-2">
              Click Next to proceed to GST Details.
            </p>
          </div>

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/general")}
              className="w-24"
            >
              Back
            </Button>
            <Button
              onClick={() => {
                debugLog("Next clicked - updating form data");
                updateFormData("bank", {
                  skipped: true,
                  partnerType: "Customer",
                });
                debugLog("Navigating to GST details");
                router.push("/gst-details");
              }}
              className="w-24"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }

  debugLog("Rendering full form");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileError("File size should be less than 5MB");
        return;
      }
      if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
        setFileError("Only PDF, JPEG, and PNG files are allowed");
        return;
      }
      setFileError("");
      form.setValue("document", file);
    }
  };

  async function onSubmit(data: FormData) {
    try {
      setIsSubmitting(true);
      // Store in form store
      updateFormData("bank", data);
      // Navigate to next page
      router.push("/gst-details");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="bankAccountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Business Account Name<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter your bank account name" {...field} />
              </FormControl>
              <FormDescription>
                Enter the name under which your bank account is registered
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Account No.<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter Bank Account Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter Bank Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ifscCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IFSC Code<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter IFSC Code" {...field} />
              </FormControl>
              <FormDescription>
                Enter your bank's IFSC code (e.g., HDFC0000001)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="documentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Which of the following would you like to upload?<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  {[
                    "Cancelled Cheque",
                    "Scanned Passbook Copy (First Page)",
                    "Bank Statement",
                    "Letter Head (For Virtual Account)",
                  ].map((type) => (
                    <FormItem
                      key={type}
                      className="flex items-center space-x-3"
                    >
                      <FormControl>
                        <RadioGroupItem value={type} />
                      </FormControl>
                      <FormLabel className="font-normal">{type}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="document"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Upload Document<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    handleFileUpload(e);
                    onChange(e.target.files?.[0] || null);
                  }}
                  className="cursor-pointer"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Upload the selected document (PDF, JPEG, PNG, max 5MB)
              </FormDescription>
              {fileError && (
                <p className="text-sm font-medium text-destructive">
                  {fileError}
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/general")}
          >
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Next"}
          </Button>
        </div>

        <div className="text-right text-sm text-gray-500">3/8</div>
        <div className="flex flex-col sm:flex-row justify-center items-center text-center text-sm sm:text-base text-gray-500 border-t border-gray-300 pt-4">
          <p>
            2016 <FaRegCopyright className="inline mx-1" /> Shaster Technologies
            Pvt Ltd All Rights Reserved
          </p>
        </div>
      </form>
    </Form>
  );
}
