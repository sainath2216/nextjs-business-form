"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { FaRegCopyright } from "react-icons/fa";

export function Instructions() {
  const router = useRouter();

  return (
    <>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
          <CardDescription>
            Please read these instructions carefully before proceeding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              As per the regulations, it is mandatory for all companies and
              individuals to submit their KYC details. As part of regular KYC
              collection and updating, we request you kindly submit the below
              requested KYC details.
            </p>

            <div>
              <h3 className="font-medium mb-2">Required Documents:</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
                <li>Business Name and Contact Details</li>
                <li>
                  Business Ownership Type (Company/Partnership/LLP/Individual)
                </li>
                <li>Address Information</li>
                <li>GST Number</li>
                <li>PAN Number</li>
                <li>MSME/Udyog Aadhaar Number</li>
                <li>Contact Person Name and Designation</li>
                <li>Bank Account Details with supporting documents</li>
                <li>Turnover Declaration</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Important Notes:</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
                <li>Submit separate forms for different GST numbers</li>
                <li>All fields marked with * are mandatory</li>
                <li>Ensure all documents are clear and valid</li>
                <li>You can save and resume your application later</li>
                <li>Review all information before final submission</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={() => router.push("/general")}>
              Proceed to Registration
            </Button>
          </div>

          <div className="text-right text-sm text-gray-500">1/8</div>
        </CardContent>
      </Card>

      
      <div className="mt-4 flex flex-col sm:flex-row justify-center items-center text-center text-sm sm:text-base text-gray-500 border-t border-gray-300 pt-4 mt-12">
        <p>
          2016 <FaRegCopyright className="inline mx-1" /> Shaster Technologies
          Pvt Ltd All Rights Reserved
        </p>
      </div>
    </>
  );
}
