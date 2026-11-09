// Telegram nikini bir xil ko'rinishga keltiradi:
//   "Ali_Valiyev", "@ali_valiyev", "t.me/ali_valiyev", "https://t.me/Ali_Valiyev" → "@ali_valiyev"
// Telegram niklari katta-kichik harfni farqlamaydi, shuning uchun kichik harfga o'tkaziladi.
// Qoidalar (Telegram): 5–32 belgi, lotin harflari, raqamlar va "_", harf bilan boshlanadi.
// Bir o'quvchining barcha urinishlari shu nik bo'yicha birlashtiriladi.
export function normalizeTelegram(raw: string) {
  const username = raw
    .trim()
    .replace(/^(https?:\/\/)?(www\.)?(t\.me|telegram\.me)\//i, "")
    .replace(/^@/, "")
    .replace(/\/+$/, "");

  return /^[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(username) ? `@${username.toLowerCase()}` : null;
}

export function telegramLink(username: string) {
  return `https://t.me/${username.replace(/^@/, "")}`;
}
