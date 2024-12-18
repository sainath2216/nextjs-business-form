'use client';

import { useFormNavigation } from '@/hooks/useFormNavigation';

export function NavigationGuard() {
  useFormNavigation();
  return null;
}