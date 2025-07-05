import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getScoreColor = (score: string): string => {
  switch (score) {
    case 'A':
      return 'bg-gradient-to-r from-green-500 to-green-600 shadow-green-500/25';
    case 'B':
      return 'bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-yellow-500/25';
    case 'C':
      return 'bg-gradient-to-r from-red-500 to-red-600 shadow-red-500/25';
    default:
      return 'bg-gradient-to-r from-gray-500 to-gray-600 shadow-gray-500/25';
  }
};

/**
 * Simple date formatter used across the app. By default it prints using short month names
 * and includes the time. You can override or extend the Intl options via the third
 * parameter when you need a different representation (e.g. long month name).
 */
export const formatDate = (
  dateInput: string | number | Date,
  locale: string = 'id-ID',
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const date = typeof dateInput === 'string' || typeof dateInput === 'number' ? new Date(dateInput) : dateInput;

  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  });
};
