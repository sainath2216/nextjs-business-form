// src/lib/constants.ts
export const formSteps = [
  {
    id: 1,
    name: "Instructions",
    href: "/",
    status: "complete" as const,
  },
  {
    id: 2,
    name: "General",
    href: "/general",
    status: "current" as const,
  },
  {
    id: 3,
    name: "Bank Details",
    href: "/bank-details",
    status: "upcoming" as const,
  },
  {
    id: 4,
    name: "GST Details",
    href: "/gst-details",
    status: "upcoming" as const,
  },
  {
    id: 5,
    name: "Contact Person",
    href: "/contact-person",
    status: "upcoming" as const,
  },
  {
    id: 6,
    name: "Address",
    href: "/address",
    status: "upcoming" as const,
  },
  {
    id: 7,
    name: "Turnover",
    href: "/turnover",
    status: "upcoming" as const,
  },
  {
    id: 8,
    name: "Submitter",
    href: "/submitter",
    status: "upcoming" as const,
  },
];