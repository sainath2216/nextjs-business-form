"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/store/formStore";
import { FaRegCopyright } from "react-icons/fa";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

const gstTypes = [
  "Regular",
  "Composite Supplier",
  "Unregistered",
  "Consumer",
] as const;

// Enhanced form schema with better validations
const formSchema = z
  .object({
    gstType: z.enum(gstTypes, {
      required_error: "Please select GST Registration Type",
    }),
    gstNumber: z.string().optional(),
    gstCertificate: z.any().optional(),
    panNumber: z.string().min(1, "PAN number is required"),
    panDocument: z.any().optional(),
    hasMsmeUdyog: z.enum(["yes", "no"], {
      required_error: "Please select whether you have MSME/Udyog",
    }),
    msmeUdyogNumber: z.string().optional(),
    msmeUdyogCertificate: z.any().optional(),
  })
  .refine(
    (data) => {
      if (
        ["Regular", "Composite Supplier"].includes(data.gstType) &&
        !data.gstNumber
      ) {
        return false;
      }
      return true;
    },
    {
      message: "GST number is required for Regular and Composite Supplier",
      path: ["gstNumber"],
    }
  )
  .refine(
    (data) => {
      if (
        ["Regular", "Composite Supplier"].includes(data.gstType) &&
        !data.gstCertificate
      ) {
        return false;
      }
      return true;
    },
    {
      message: "GST certificate is required for Regular and Composite Supplier",
      path: ["gstCertificate"],
    }
  )
  .refine(
    (data) => {
      if (!data.panDocument) {
        return false;
      }
      return true;
    },
    {
      message: "PAN document is required",
      path: ["panDocument"],
    }
  )
  .refine(
    (data) => {
      if (data.hasMsmeUdyog === "yes" && !data.msmeUdyogNumber) {
        return false;
      }
      return true;
    },
    {
      message: "MSME/Udyog number is required when selected Yes",
      path: ["msmeUdyogNumber"],
    }
  )
  .refine(
    (data) => {
      if (data.hasMsmeUdyog === "yes" && !data.msmeUdyogCertificate) {
        return false;
      }
      return true;
    },
    {
      message: "MSME/Udyog certificate is required when selected Yes",
      path: ["msmeUdyogCertificate"],
    }
  );

type FormData = z.infer<typeof formSchema>;

export function GstDetailsForm() {
  const router = useRouter();
  const [fileError, setFileError] = useState<string>("");
  const { updateFormData, formData, setCurrentStep } = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOutsideIndia =
    formData.general?.placeOfBusiness === "Outside India (Import/Export)";

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData.gst || {
      gstType: "Unregistered",
      hasMsmeUdyog: "no",
    },
  });

  useEffect(() => {
    setCurrentStep(3); // 4th step (0-based index)
  }, [setCurrentStep]);

  const watchGstType = form.watch("gstType");
  const watchHasMsmeUdyog = form.watch("hasMsmeUdyog");

  if (isOutsideIndia) {
    return (
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-6">
          <div className="text-center py-8">
            <p className="text-gray-600">
              Parties Registered Outside India are not required to Submit Tax
              Registration Details.
            </p>
            <p className="text-gray-600 mt-2">
              Kindly Press "Next" to continue.
            </p>
          </div>

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/bank-details")}
              className="w-24"
            >
              Back
            </Button>
            <Button
              onClick={() => router.push("/contact-person")}
              className="w-24"
            >
              Next
            </Button>
          </div>

          <div className="text-right text-sm text-gray-500">4/8</div>
        </div>
      </div>
    );
  }

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
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
      form.setValue(fieldName as any, file);
    }
  };

  async function onSubmit(data: FormData) {
    try {
      setIsSubmitting(true);
      updateFormData("gst", data);
      router.push("/contact-person");
    } catch (error) {
      console.error("Error handling form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* GST Registration Type */}
        <FormField
          control={form.control}
          name="gstType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GST Registration Type<span className="text-red-500">*</span></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your GST Registration Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {gstTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Conditional GST Number and Certificate */}
        {["Regular", "Composite Supplier"].includes(watchGstType || "") && (
          <>
            <FormField
              control={form.control}
              name="gstNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GST Number<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your GST Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gstCertificate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload GST Certificate<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e, "gstCertificate")}
                      className="cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* PAN Details */}
        <FormField
          control={form.control}
          name="panNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PAN No.<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter PAN Number. If PAN is not available, input 'PANNOTAVIL'"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="panDocument"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload PAN<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, "panDocument")}
                  className="cursor-pointer"
                />
              </FormControl>
              {fileError && (
                <p className="text-sm font-medium text-destructive">
                  {fileError}
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* MSME/Udyog Details */}
        <FormField
          control={form.control}
          name="hasMsmeUdyog"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you have MSME/Udyog Aadhaar No?<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Conditional MSME/Udyog Number and Certificate */}
        {watchHasMsmeUdyog === "yes" && (
          <>
            <FormField
              control={form.control}
              name="msmeUdyogNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MSME/Udyog Aadhaar No.<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="msmeUdyogCertificate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MSME/Udyog Aadhaar Certificate<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) =>
                        handleFileUpload(e, "msmeUdyogCertificate")
                      }
                      className="cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/bank-details")}
            className="w-24"
          >
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting} className="w-24">
            {isSubmitting ? "Saving..." : "Next"}
          </Button>
        </div>

        <div className="text-right text-sm text-gray-500">4/8</div>
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
