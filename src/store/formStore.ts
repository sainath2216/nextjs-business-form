import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the shape of your form data
interface FormState {
  general?: any;
  bank?: any;
  gst?: any;
  contactPerson?: any;
  address?: any;
  turnover?: any;
  submitter?: any;
  captchaCode?: string;
}

// Define the store interface
interface FormStore {
  formData: FormState;
  currentStep: number;
  updateFormData: (section: keyof FormState, data: any) => void;
  setCurrentStep: (step: number) => void;
}

// Create the store
export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      formData: {},
      currentStep: 0,
      updateFormData: (section, data) =>
        set((state) => ({
          formData: { ...state.formData, [section]: data },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
    }),
    {
      name: 'form-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);