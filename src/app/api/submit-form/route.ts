import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    console.log('API received:', formData);

    // Test database connection
    await prisma.$connect();
    console.log('Database connected');

    // Format submitter name from the form data
    const submitterFullName = [
      formData.submitter?.firstName,
      formData.submitter?.lastName
    ].filter(Boolean).join(' ');

    const submission = await prisma.formSubmission.create({
      data: {
        // General Details
        businessEmailId: formData.general?.businessEmailId ?? null,
        businessName: formData.general?.businessName,
        ownershipType: formData.general?.ownershipType,
        partnerType: formData.general?.partnerType,
        website: formData.general?.website ?? null,
        vendorIndustryType: formData.general?.vendorIndustryType,
        placeOfBusiness: formData.general?.placeOfBusiness,

        // Bank Details
        bankName: formData.bank?.bankName ?? null,
        accountNumber: formData.bank?.accountNumber ?? null,
        ifscCode: formData.bank?.ifscCode ?? null,
        bankDocument: formData.bank?.bankDocument ?? null,

        // GST Details
        gstType: formData.gst?.gstType ?? null,
        gstNumber: formData.gst?.gstNumber ?? null,
        gstCertificate: null, // Handle file separately
        panNumber: formData.gst?.panNumber ?? null,
        panDocument: null,
        hasMsmeUdyog: formData.gst?.hasMsmeUdyog ?? null,
        msmeUdyogNumber: formData.gst?.msmeUdyogNumber ?? null,
        msmeUdyogCertificate: null,

        // Contact Person
        title: formData.contactPerson?.title ?? null,
        firstName: formData.contactPerson?.firstName ?? null,
        lastName: formData.contactPerson?.lastName ?? null,
        designation: formData.contactPerson?.designation ?? null,
        countryCode: formData.contactPerson?.countryCode ?? null,
        phoneNumber: formData.contactPerson?.phoneNumber ?? null,
        hasEmail: formData.contactPerson?.hasEmail ?? null,
        email: formData.contactPerson?.email ?? null,

        // Address Details
        addresses: formData.address?.addresses ?? null,

        // Turnover Declaration
        turnoverExceedingTenCrore: formData.turnover?.turnoverExceedingTenCrore ?? null,
        hasFiledITR: formData.turnover?.hasFiledITR ?? null,
        acknowledgementNo2021: formData.turnover?.acknowledgementNo2021 ?? null,
        filingDate2021: formData.turnover?.filingDate2021 ? new Date(formData.turnover.filingDate2021) : null,
        acknowledgementNo2022: formData.turnover?.acknowledgementNo2022 ?? null,
        filingDate2022: formData.turnover?.filingDate2022 ? new Date(formData.turnover.filingDate2022) : null,
        acknowledgementNo2023: formData.turnover?.acknowledgementNo2023 ?? null,
        filingDate2023: formData.turnover?.filingDate2023 ? new Date(formData.turnover.filingDate2023) : null,

        // Submitter Details
        submitterName: formData.submitter?.name ?? null,
        submitterDesignation: formData.submitter?.designation ?? null,
        submitterEmail: formData.submitter?.email ?? null,
        declaration: formData.submitter?.declaration ?? false,
      }
    });

    console.log('Submission created:', submission);

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      data: submission
    }, { status: 200 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}