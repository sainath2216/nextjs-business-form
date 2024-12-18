"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/store/formStore";
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
import { PlusCircle, Trash2 } from "lucide-react";

const addressTypes = ["Bill To", "Ship To", "Both"] as const;

const addressSchema = z.object({
  addressType: z.enum(addressTypes),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pincode: z.string().min(1, "Pincode is required"),
});

const formSchema = z.object({
  addresses: z.array(addressSchema).min(1, "At least one address is required"),
});

type FormData = z.infer<typeof formSchema>;

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Australia",
  "Canada",
  // Add more countries as needed
];

// Add this type definition based on your schema
type AddressData = {
  addressType: "Bill To" | "Ship To" | "Both";
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

// Move this function before useForm
const getDefaultAddress = (): AddressData => ({
  addressType: "Bill To",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "India", // Default country
  pincode: "",
});

export function AddressForm() {
  const router = useRouter();
  const { updateFormData, formData, setCurrentStep } = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData.address || {
      addresses: [getDefaultAddress()],
    },
  });

  useEffect(() => {
    setCurrentStep(5); // 6th step (0-based index)
  }, [setCurrentStep]);

  const { fields, append, remove } = useFieldArray({
    name: "addresses",
    control: form.control,
  });

  async function onSubmit(data: FormData) {
    try {
      setIsSubmitting(true);

      // Store the form data
      updateFormData("address", data);

      // Navigate to turnover form - using the correct path
      router.push("/turnover");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="space-y-6 border rounded-lg p-6 relative"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                #{index + 1} -{" "}
                {index === 0 ? "Business Address" : "Additional Address"}
              </h3>
              {index > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              )}
            </div>

            {/* Address Type */}
            <FormField
              control={form.control}
              name={`addresses.${index}.addressType`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Address Type<span className="text-red-500">*</span></FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select address type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {addressTypes.map((type) => (
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

            {/* Address Line 1 */}
            <FormField
              control={form.control}
              name={`addresses.${index}.addressLine1`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address Line 2 */}
            <FormField
              control={form.control}
              name={`addresses.${index}.addressLine2`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name={`addresses.${index}.city`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* State */}
            <FormField
              control={form.control}
              name={`addresses.${index}.state`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="State/Region/Province" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Country */}
            <FormField
              control={form.control}
              name={`addresses.${index}.country`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country<span className="text-red-500">*</span></FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pincode */}
            <FormField
              control={form.control}
              name={`addresses.${index}.pincode`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Postal / Zip Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        {/* Add Address Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => append(getDefaultAddress())}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Another Address
        </Button>

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/contact-person")}
            className="w-24"
          >
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting} className="w-24">
            {isSubmitting ? "Saving..." : "Next"}
          </Button>
        </div>

        <div className="text-right text-sm text-gray-500">6/8</div>
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
