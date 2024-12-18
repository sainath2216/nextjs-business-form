"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFormStore } from '@/store/formStore';
import { useState, useEffect } from "react"; 
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


// Title options for the contact person
const titles = [
  "Mr.",
  "Mrs.",
  "Ms.",
  "Dr.",
  "Prof.",
  "Select",
] as const;

// Country codes list
const countryCodes = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "USA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+86", country: "China", flag: "🇨🇳" },
] as const;

const formSchema = z.object({
  title: z.enum(titles),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  designation: z.string().min(1, "Designation is required"),
  countryCode: z.string().min(1, "Country code is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  hasEmail: z.enum(["yes", "no"]),
  email: z.string().optional(),
}).refine((data) => {
  if (data.hasEmail === "yes" && !data.email) {
    return false;
  }
  return true;
}, {
  message: "Email is required when 'Yes' is selected",
  path: ["email"],
});

type FormData = z.infer<typeof formSchema>;

export function ContactPersonForm() {
  const router = useRouter();
  const { updateFormData, formData, setCurrentStep } = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData.contactPerson || {
      title: "Select",
      hasEmail: "no",
      countryCode: "+91",
    },
  });

  useEffect(() => {
    setCurrentStep(4); // 5th step (0-based index)
  }, [setCurrentStep]);

  const watchHasEmail = form.watch("hasEmail");

  async function onSubmit(data: FormData) {
    try {
      setIsSubmitting(true);
      
      // Store the form data
      updateFormData('contactPerson', data);
  
      // Navigate to address form - using the correct path
      router.push("/address");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Contact Person Name Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <FormLabel>First Name*</FormLabel>
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

        {/* Contact Person Designation */}
        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Person Designation*</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Number */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Code*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country code" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <span className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.code}</span>
                          <span className="text-muted-foreground">({country.country})</span>
                        </span>
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Contact Number*</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email Section */}
        <FormField
          control={form.control}
          name="hasEmail"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you have contact person Email ID?*</FormLabel>
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

        {/* Conditional Email Input */}
        {watchHasEmail === "yes" && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email ID*</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormDescription>
                  Enter email to which you would like to receive submitted response details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

<div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/gst-details")}
            className="w-24"
          >
            Back
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-24"
          >
            {isSubmitting ? "Saving..." : "Next"}
          </Button>
        </div>

        <div className="text-right text-sm text-gray-500">
          5/8
        </div>
      </form>
    </Form>
  );
}