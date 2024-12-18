import { useRouter } from 'next/navigation';
import { useFormStore } from '@/store/formStore';

const FORM_STEPS = [
  '/',
  '/general',
  '/bank-details',
  '/gst-details',
  '/contact-person',
  '/address',
  '/turnover',
  '/submitter',
];

export const useFormNavigation = () => {
  const router = useRouter();
  const { currentStep, setCurrentStep, formData } = useFormStore();

  const navigateToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < FORM_STEPS.length) {
      setCurrentStep(stepIndex);
      router.push(FORM_STEPS[stepIndex]);
    }
  };

  const goToNext = () => {
    navigateToStep(currentStep + 1);
  };

  const goToPrevious = () => {
    navigateToStep(currentStep - 1);
  };

  return {
    currentStep,
    goToNext,
    goToPrevious,
    navigateToStep,
  };
};