// src/lib/utils.ts
import { FormState } from '@/types/form';
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const formStateManager = {
  save: (state: Partial<FormState>) => {
    const existing = localStorage.getItem('formState');
    const currentState = existing ? JSON.parse(existing) : {};
    
    localStorage.setItem('formState', JSON.stringify({
      ...currentState,
      ...state,
      lastUpdated: new Date().toISOString()
    }));
  },

  get: (): FormState | null => {
    const state = localStorage.getItem('formState');
    if (!state) return null;
    
    const parsedState = JSON.parse(state);
    const lastUpdated = new Date(parsedState.lastUpdated);
    const now = new Date();
    
    // Clear if older than 24 hours
    if (now.getTime() - lastUpdated.getTime() > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('formState');
      return null;
    }
    
    return parsedState;
  },

  clear: () => {
    localStorage.removeItem('formState');
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}