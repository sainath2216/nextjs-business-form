"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFormStore } from '@/store/formStore';
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
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

const formSchema = z.object({
  turnoverExceedingTenCrore: z.enum(["yes", "no"], {
    required_error: "Please select whether turnover exceeds 10 crore",
  }),
  hasFiledITR: z.enum(["yes", "no"], {
    required_error: "Please select whether you have filed ITR",
  }),
  acknowledgementNo2021: z.string().optional(),
  filingDate2021: z.date().optional(),
  acknowledgementNo2022: z.string().optional(),
  filingDate2022: z.date().optional(),
  acknowledgementNo2023: z.string().optional(),
  filingDate2023: z.date().optional(),
}).superRefine((data, ctx) => {
  if (data.hasFiledITR === "yes") {
    if (!data.acknowledgementNo2021) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Acknowledgement number for FY 2020-21 is required",
        path: ["acknowledgementNo2021"],
      });
    }
    if (!data.filingDate2021) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Filing date for FY 2020-21 is required",
        path: ["filingDate2021"],
      });
    }
    // Similar validations for 2022
    if (!data.acknowledgementNo2022) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Acknowledgement number for FY 2021-22 is required",
        path: ["acknowledgementNo2022"],
      });
    }
    if (!data.filingDate2022) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Filing date for FY 2021-22 is required",
        path: ["filingDate2022"],
      });
    }
  }
});

type FormData = z.infer<typeof formSchema>;

export function TurnoverForm() {
  const router = useRouter();
  const { updateFormData, formData, setCurrentStep } = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user is from outside India
  const isOutsideIndia = formData.general?.placeOfBusiness === "Outside India (Import/Export)";

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData.turnover || {
      turnoverExceedingTenCrore: "no",
      hasFiledITR: "no",
    },
  });

  useEffect(() => {
    setCurrentStep(6); // 7th step (0-based index)
  }, [setCurrentStep]);

  const watchHasFiledITR = form.watch("hasFiledITR");

  async function onSubmit(data: FormData) {
    try {
      setIsSubmitting(true);
      updateFormData('turnover', data);
      // Update navigation to match the path in constants
      router.push("/submitter");  // Changed from "/submitter-declaration" to "/submitter"
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

    // If outside India, show simplified view
    if (isOutsideIndia) {
      return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            <div className="text-center py-8">
              <p className="text-gray-600">
                Parties Registered Outside India are not required to Submit Tax Registration Details.
              </p>
              <p className="text-gray-600 mt-2">
                Kindly Press "Next" to continue.
              </p>
            </div>
  
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/address")}
                className="w-24"
              >
                Back
              </Button>
              <Button 
                onClick={() => router.push("/submitter")}  // Updated this path as well
                className="w-24"
              >
                Next
              </Button>
            </div>
  
            <div className="text-right text-sm text-gray-500">
              7/8
            </div>
          </div>
        </div>
      );
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-slate-50 p-4 rounded-md text-sm">
          In view of the Finance Act, 2021 introduced a new section 206AB, we hereby certify that we have filed the ITR and 
          aggregate of tax deducted at source and tax collected at source in our case in 26AS is more less than INR 50,000 for 
          immediately preceding two previous years i.e., for FY 2021-22 and FY 2022-23, details of which are as follows:
        </div>

        {/* Turnover Question */}
        <FormField
          control={form.control}
          name="turnoverExceedingTenCrore"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Turnover of our company/entity during FY 2022-23 exceeding Rs. 10 crs (Yes/No)*</FormLabel>
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

        {/* ITR Filing Question */}
        <FormField
          control={form.control}
          name="hasFiledITR"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Have your filed Income Tax Return for in the following Financial Year - FY 2020-21, FY 2021-22 and FY 2022-23?*</FormLabel>
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

        {watchHasFiledITR === "yes" && (
          <div className="space-y-6">
            {/* FY 2020-21 */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="acknowledgementNo2021"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Acknowledgement No (FY 2020-21)*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="filingDate2021"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Filing (FY 2020-21)*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd-MM-yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* FY 2021-22 */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="acknowledgementNo2022"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Acknowledgement No (FY 2021-22)*</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="filingDate2022"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Filing (FY 2021-22)*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd-MM-yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* FY 2022-23 (Optional) */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="acknowledgementNo2023"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Acknowledgement No (FY 2022-23)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Submit if you have filed ITR
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="filingDate2023"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Filing (FY 2022-23)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd-MM-yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Submit if you have filed ITR
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

<div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/address")}
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
          7/8
        </div>
      </form>
    </Form>
  );
}