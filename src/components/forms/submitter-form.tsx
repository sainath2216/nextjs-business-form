"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Captcha } from "@/components/ui/captcha";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/store/formStore";
import { Alert, AlertDescription } from "@/components/ui/alert";

const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."] as const;

const formSchema = z.object({
  title: z.enum(titles, {
    required_error: "Please select a title",
  }),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  department: z.string().min(1, "Department is required"),
  designation: z.string().min(1, "Designation is required"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the declaration",
  }),
  verificationCode: z.string().min(1, "Verification code is required"),
});

type FormData = z.infer<typeof formSchema>;

export function SubmitterForm() {
  const [showSummary, setShowSummary] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const router = useRouter();
  const [captchaCode, setCaptchaCode] = useState("");
  const { formData, setCurrentStep, updateFormData } = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  useEffect(() => {
    setCurrentStep(7);
  }, [setCurrentStep]);

  const handleCaptchaChange = (code: string) => {
    console.log("Setting captcha code:", code);
    updateFormData("captchaCode", code);
    form.setValue("verificationCode", "");
  };

  const validateCaptcha = (inputCode: string): boolean => {
    return inputCode === captchaCode;
  };

  async function onSubmit(data: FormData) {
    try {
      setError(null);
      setCaptchaError(null);
      setIsSubmitting(true);

      console.log("Entered code:", data.verificationCode);
      console.log("Generated code:", formData.captchaCode);
      // Store submitter data
      updateFormData("submitter", data);

      if (data.verificationCode !== formData.captchaCode) {
        setCaptchaError("Invalid captcha code");
        return;
      }

      // Get all form data
      const completeFormData = {
        general: formData.general || {},
        bank: formData.bank || {},
        gst: formData.gst || {},
        contactPerson: formData.contactPerson || {},
        address: formData.address || {},
        turnover: formData.turnover || {},
        submitter: data,
      };

      console.log("Sending data:", completeFormData); // Debug log

      // Submit to API
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeFormData),
      }).catch((error) => {
        console.log("Fetch error:", error); // Debug log
        throw new Error(`Network error: ${error.message}`);
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText); // Debug log
        throw new Error(`Server error: ${errorText}`);
      }

      const result = await response.json();
      console.log("Success response:", result); // Debug log

      router.push("/success");
    } catch (error) {
      console.error("Submission error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to submit form"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const formatDataForDisplay = (data: any) => {
    if (!data) return [];
    return Object.entries(data).map(([key, value]) => ({
      field: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      value: formatValue(value),
    }));
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (value instanceof File) return value.name;
    if (Array.isArray(value)) return value.join(", ");
    return String(value);
  };

  const formSections = {
    "General Information": formatDataForDisplay(formData.general),
    "Bank Details": formatDataForDisplay(formData.bank),
    "GST & PAN Details": formatDataForDisplay(formData.gst),
    "Contact Person": formatDataForDisplay(formData.contactPerson),
    "Address Details": formatDataForDisplay(formData.address),
    "Turnover Details": formatDataForDisplay(formData.turnover),
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {/* Submitter Name Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title<span className="text-red-500">*</span></FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {titles.map((title) => (
                      <SelectItem key={title} value={title}>
                        {title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name<span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Last Name is optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Department */}
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Designation */}
        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designation<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Declaration */}
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  By submitting this form, I hereby solemnly declare that the
                  information provided in this form is correct and up-to-date to
                  the best of my knowledge.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Verification Code with CAPTCHA */}
        {captchaError && (
          <div className="text-red-600 text-sm">{captchaError}</div>
        )}
        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code<span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Input {...field} placeholder="Enter the code shown below" />
                  <Captcha onCodeChange={handleCaptchaChange} />
                </div>
              </FormControl>
              <FormDescription>
                Enter the characters shown in the image above
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/turnover")}
          >
            Back
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                Review Submission
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Form Summary</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {Object.entries(formSections).map(
                  ([section, data]) =>
                    data.length > 0 && (
                      <div key={section} className="space-y-2">
                        <h3 className="text-lg font-semibold border-b pb-2">
                          {section}
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Field
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Value
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {data.map(({ field, value }, index) => (
                                <tr
                                  key={index}
                                  className={
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                  }
                                >
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {field}
                                  </td>
                                  <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500">
                                    {value}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Button type="submit" className="bg-[#E91E63]">
            Submit
          </Button>
        </div>

        <div className="text-right text-sm text-gray-500">8/8</div>
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
