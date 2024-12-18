import { FormState } from '@/types/form';

export const getNextStep = (currentStep: string, formData: FormState) => {
  const steps = {
    '/': '/general',
    '/general': formData.general?.partnerType === 'Customer' ? '/gst-details' : '/bank-details',
    '/bank-details': '/gst-details',
    '/gst-details': '/contact-person',
    '/contact-person': '/address',
    '/address': '/turnover',
    '/turnover': '/submitter',
  };

  return steps[currentStep as keyof typeof steps] || '/';
};

export const getPreviousStep = (currentStep: string, formData: FormState) => {
  const steps = {
    '/general': '/',
    '/bank-details': '/general',
    '/gst-details': formData.general?.partnerType === 'Customer' ? '/general' : '/bank-details',
    '/contact-person': '/gst-details',
    '/address': '/contact-person',
    '/turnover': '/address',
    '/submitter': '/turnover',
  };

  return steps[currentStep as keyof typeof steps] || '/';
}; 