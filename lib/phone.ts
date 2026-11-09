// Telefon raqamini bir xil ko'rinishga keltiradi: "+998 90 123-45-67" → "+998901234567".
// Bir o'quvchining urinishlari shu raqam bo'yicha birlashtiriladi.
export function normalizePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15 ? `+${digits}` : null;
}
