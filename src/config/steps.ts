export const steps = [
    { id: 1, name: 'Instructions', href: '/', status: 'complete' },
    { id: 2, name: 'General', href: '/general', status: 'complete' },
    { id: 3, name: 'Bank Details', href: '/bank-details', status: 'complete' },
    { id: 4, name: 'GST, PAN & MSME', href: '/gst-details', status: 'complete' },
    { id: 5, name: 'Contact Person', href: '/contact-person', status: 'complete' },
    { id: 6, name: 'Address Details', href: '/address', status: 'complete' },
    { id: 7, name: 'Turnover', href: '/turnover', status: 'complete' },
    { id: 8, name: 'Submitter', href: '/submitter', status: 'current' },
  ] as const;
  
  export type StepStatus = 'complete' | 'current' | 'upcoming';