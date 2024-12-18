export interface FormState {
  general?: GeneralFormData;
  bankDetails?: BankDetailsFormData;
  gstDetails?: GSTDetailsFormData;
  contactPerson?: ContactPersonFormData;
  addresses?: AddressFormData[];
  turnover?: TurnoverFormData;
  submitter?: SubmitterFormData;
  lastUpdated?: string;
  currentStep?: number;
}

export interface GeneralFormData {
  hasBusinessEmail: "yes" | "no";
  businessEmail?: string;
  partnerType: "Vendor" | "Customer" | "Both";
  businessName: string;
  ownershipType: "Company" | "HUF" | "Individual" | "LLP" | "Partnership" | "Other";
  website?: string;
  vendorIndustryType?: string;
  customerIndustryType?: string;
  hasDealershipCertificate: "yes" | "no";
  dealershipCertificate?: File;
  placeOfBusiness: "Within India (Domestic)" | "Outside India (Import/Export)";
}

export interface BankDetailsFormData {
  bankAccountName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  documentType: string;
  document?: File;
  skipped?: boolean;
  partnerType?: string;
}

export interface GSTDetailsFormData {
  gstType: string;
  gstNumber?: string;
  gstCertificate?: File;
  panNumber: string;
  panDocument?: File;
  hasMsmeUdyog: "yes" | "no";
  msmeUdyogNumber?: string;
  msmeUdyogCertificate?: File;
}

export interface ContactPersonFormData {
  title: string;
  firstName: string;
  lastName: string;
  designation: string;
  countryCode: string;
  phoneNumber: string;
  hasEmail: "yes" | "no";
  email?: string;
}

export interface AddressFormData {
  addressType: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
}

export interface TurnoverFormData {
  turnoverExceedingTenCrore: "yes" | "no";
  hasFiledITR: "yes" | "no";
  acknowledgementNo2021?: string;
  filingDate2021?: Date;
  acknowledgementNo2022?: string;
  filingDate2022?: Date;
  acknowledgementNo2023?: string;
  filingDate2023?: Date;
}

export interface SubmitterFormData {
  submitterName: string;
  submitterDesignation: string;
  submitterEmail: string;
  declaration: boolean;
}
