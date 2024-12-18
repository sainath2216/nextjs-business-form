"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useFormStore } from '@/store/formStore';
import { useFormNavigation } from '@/hooks/useFormNavigation';
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { FormState, GeneralFormData } from '@/types/form';

// Industry types remain the same
const vendorIndustryTypes = [
  "Boiler Fuel Supplier",
  "Dealership",
  "Distributor",
  "Event Organizer / Exhibition",
  "Fish Supplier",
  "Lab",
  "Manufacturing Industry",
  "Retailer",
  "Service Industry",
  "Trader",
  "Transporter",
  "University",
] as const;

const customerIndustryTypes = [
  "Agricultural Products",
  "Dealership",
  "Direct Consumer (Farmer/ End User)",
  "Distributor",
  "E-Commerce",
  "Feed Industry",
  "Leather",
  "Manufacturing",
  "Pharma",
  "Retailer",
  "Trading",
] as const;

// Form schema remains the same
const formSchema = z.object({
  hasBusinessEmail: z.enum(["yes", "no"], {
    required_error: "Please select whether you have a business email",
  }),
  businessEmail: z.string().email().optional().or(z.literal("")),
  partnerType: z.enum(["Vendor", "Customer", "Both"], {
    required_error: "Please select partner type",
  }),
  businessName: z.string({
    required_error: "Business name is required",
  }).min(1, "Business name is required"),
  ownershipType: z.enum(["Company", "HUF", "Individual", "LLP", "Partnership", "Other"], {
    required_error: "Please select ownership type",
  }),
  website: z.string().url().optional().or(z.literal("")),
  vendorIndustryType: z.enum(vendorIndustryTypes).optional(),
  customerIndustryType: z.enum(customerIndustryTypes).optional(),
  hasDealershipCertificate: z.enum(["yes", "no"]).optional(),
  dealershipCertificate: z.any().optional(),
  placeOfBusiness: z.enum(["Within India (Domestic)", "Outside India (Import/Export)"], {
    required_error: "Please select your place of business",
  }),
}).refine((data) => {
  if (data.hasBusinessEmail === "yes" && !data.businessEmail) {
    return false;
  }
  return true;
}, {
  message: "Business email is required when 'Yes' is selected",
  path: ["businessEmail"],
}).refine((data) => {
  if ((data.partnerType === "Vendor" || data.partnerType === "Both") && !data.vendorIndustryType) {
    return false;
  }
  return true;
}, {
  message: "Vendor industry type is required",
  path: ["vendorIndustryType"],
}).refine((data) => {
  if ((data.partnerType === "Customer" || data.partnerType === "Both") && !data.customerIndustryType) {
    return false;
  }
  return true;
}, {
  message: "Customer industry type is required",
  path: ["customerIndustryType"],
}).refine((data) => {
  if (data.hasDealershipCertificate === "yes" && !data.dealershipCertificate) {
    return false;
  }
  return true;
}, {
  message: "Dealership certificate is required",
  path: ["dealershipCertificate"],
});

type FormData = GeneralFormData;

export function GeneralForm() {
  const router = useRouter();
  const [fileError, setFileError] = useState<string>("");
  const { updateFormData, formData, setCurrentStep } = useFormStore();
  const { goToNext, goToPrevious } = useFormNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasBusinessEmail: formData.general?.hasBusinessEmail || "no",
      businessEmail: formData.general?.businessEmail || "",
      partnerType: formData.general?.partnerType,
      businessName: formData.general?.businessName || "",
      ownershipType: formData.general?.ownershipType,
      website: formData.general?.website || "",
      vendorIndustryType: formData.general?.vendorIndustryType,
      customerIndustryType: formData.general?.customerIndustryType,
      hasDealershipCertificate: formData.general?.hasDealershipCertificate || "no",
      placeOfBusiness: formData.general?.placeOfBusiness || "Within India (Domestic)",
    },
    mode: "onSubmit", // This ensures validation runs on form submission
  });

  // Watch values for conditional rendering
  const watchPartnerType = form.watch("partnerType");
  const watchVendorIndustryType = form.watch("vendorIndustryType");

  useEffect(() => {
    setCurrentStep(1); // 1st step (0-based index)
  }, [setCurrentStep]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateFormData('general', value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateFormData]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
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
      console.log("Submitting general form data:", data);
      updateFormData('general', data);
      console.log("Navigating to bank details");
      router.push("/bank-details");
    } catch (error) {
      console.error("Error handling form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Business Email Section */}
        <FormField
            control={form.control}
            name="hasBusinessEmail"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Do you have any Business Email ID?*</FormLabel>
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

          {/* Conditional Business Email Input */}
          {form.watch("hasBusinessEmail") === "yes" && (
            <FormField
              control={form.control}
              name="businessEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Email*</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="email@company.com" 
                      {...field} 
                      className="w-full sm:w-3/4"
                    />
                  </FormControl>
                  <FormDescription>
                    You will receive submitted response details to this email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Business Name */}
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Enterprise Name*</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    className="w-full sm:w-3/4"
                  />
                </FormControl>
                <FormDescription>
                  Enter the name under which you trade with the company.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ownership Type */}
          <FormField
            control={form.control}
            name="ownershipType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ownership Type*</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full sm:w-3/4">
                      <SelectValue placeholder="Select ownership type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Company">Company</SelectItem>
                    <SelectItem value="HUF">HUF</SelectItem>
                    <SelectItem value="Individual">Individual</SelectItem>
                    <SelectItem value="LLP">LLP</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Partner Type */}
          <FormField
            control={form.control}
            name="partnerType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Partner Type*</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full sm:w-3/4">
                      <SelectValue placeholder="Select whether you are a vendor or customer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Vendor">Vendor</SelectItem>
                    <SelectItem value="Customer">Customer</SelectItem>
                    <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select whether you are a vendor or customer or both to our organization.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Website */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website (optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="www.website.com" 
                    {...field}
                    className="w-full sm:w-3/4"
                  />
                </FormControl>
                <FormDescription>
                  Enter your Business Website Link.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Vendor Industry Type */}
          {(watchPartnerType === "Vendor" || watchPartnerType === "Both") && (
            <FormField
              control={form.control}
              name="vendorIndustryType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Vendor Industry Type*</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-2"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {vendorIndustryTypes.map((type) => (
                          <FormItem key={type} className="flex items-center space-x-3">
                            <FormControl>
                              <RadioGroupItem value={type} />
                            </FormControl>
                            <FormLabel className="font-normal">{type}</FormLabel>
                          </FormItem>
                        ))}
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {/* Customer Industry Type */}
          {(watchPartnerType === "Customer" || watchPartnerType === "Both") && (
            <FormField
              control={form.control}
              name="customerIndustryType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Customer Industry Type*</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-2"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {customerIndustryTypes.map((type) => (
                          <FormItem key={type} className="flex items-center space-x-3">
                            <FormControl>
                              <RadioGroupItem value={type} />
                            </FormControl>
                            <FormLabel className="font-normal">{type}</FormLabel>
                          </FormItem>
                        ))}
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Dealership Certificate Section */}
          {watchVendorIndustryType === "Dealership" && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="hasDealershipCertificate"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Do you have Dealership Certificates?*</FormLabel>
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

              {form.watch("hasDealershipCertificate") === "yes" && (
                <FormField
                  control={form.control}
                  name="dealershipCertificate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dealership Certificate*</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, "dealershipCertificate")}
                          className="cursor-pointer w-full sm:w-3/4"
                        />
                      </FormControl>
                      <FormDescription>
                        Upload a valid dealership certificate (PDF, JPEG, PNG, max 5MB)
                      </FormDescription>
                      {fileError && (
                        <p className="text-sm font-medium text-destructive">{fileError}</p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}
          {/* Place of Business */}
          <FormField
            control={form.control}
            name="placeOfBusiness"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select your place of Business*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3">
                      <FormControl>
                        <RadioGroupItem value="Within India (Domestic)" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Within India (Domestic)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3">
                      <FormControl>
                        <RadioGroupItem value="Outside India (Import/Export)" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Outside India (Import/Export)
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  The place of Business will determine whether it is mandatory to collect Tax Compliance Details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Form Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={goToPrevious}
              className="w-24"
            >
              Back
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-24"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                "Next"
              )}
            </Button>
          </div>

          <div className="text-right text-sm text-gray-500 mt-4">
            Step 2 of 8
          </div>
        </form>
      </Form>
    </div>
  );
}