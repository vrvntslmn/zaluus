export const contactConfig = {
  email: import.meta.env.VITE_CONTACT_EMAIL?.trim() ?? '',
  phone: import.meta.env.VITE_CONTACT_PHONE?.trim() ?? '',
  facebook: import.meta.env.VITE_CONTACT_FACEBOOK?.trim() ?? '',
  instagram: import.meta.env.VITE_CONTACT_INSTAGRAM?.trim() ?? '',
} as const;
