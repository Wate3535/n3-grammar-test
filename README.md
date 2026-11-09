# Yapon tili mock testlari

JFT-Basic A2 va JLPT N3, N4, N5 mock testlari. O‘quvchi saytga kirganda 4 xonali kod teradi va kodga qarab o‘z darajasidagi testlarga yo‘naltiriladi. Natijalar Supabase’ga saqlanadi va admin panelda ko‘rinadi.

| Daraja | Testlar | Vaqt | Ball (o‘tish) |
| --- | --- | --- | --- |
| JFT-Basic A2 | 模擬テスト 2, 3, 7, 8 (48 savol) | 60 daq | 10–250 (200) |
| JLPT N3 | 模擬テスト 1 (40 savol) | 65 daq | 0–180 (95) |
| JLPT N4 | 模擬テスト 1 (40 savol) | 55 daq | 0–180 (90) |
| JLPT N5 | 模擬テスト 1 (40 savol) | 50 daq | 0–180 (80) |

Ball to‘g‘ri javoblar soniga qarab chiziqli hisoblanadi, ya’ni taxminiy. Testlar o‘quv uchun tuzilgan, rasmiy imtihon savollari emas.

## Supabase’ni ulash (bir marta)

1. [supabase.com](https://supabase.com) da yangi loyiha oching.
2. **SQL Editor → New query** ga [supabase/schema.sql](supabase/schema.sql) ni to‘liq qo‘yib, **Run** bosing. Jadvallar va boshlang‘ich kodlar yaratiladi.
3. **Project Settings → API** dan `Project URL` va `service_role` kalitini oling.
4. [.env.example](.env.example) ni `.env.local` ga nusxalab to‘ldiring.
5. Shu 4 ta o‘zgaruvchini **Vercel → Settings → Environment Variables** ga qo‘shing va qayta deploy qiling.

Boshlang‘ich kodlar: JFT `7391`, N3 `4826`, N4 `2564`, N5 `9157`. Ularni admin paneldagi **Kodlar** bo‘limida o‘zgartiring.

## Admin panel

`/admin`. Parol `ADMIN_PASSWORD` o‘zgaruvchisidan olinadi.

- **Umumiy:** o‘quvchilar soni, urinishlar, darajalar bo‘yicha o‘rtacha natija va oxirgi natijalar.
- **O‘quvchilar:** ism yoki telefon bo‘yicha qidirish. Har bir o‘quvchining urinishlari, bo‘limlar bo‘yicha natijasi va zaif savol turlari.
- **Xatolar tahlili:** har bir test bo‘yicha savollarning xato foizi va eng ko‘p tanlangan noto‘g‘ri variant.
- **Kodlar:** har bir darajaning 4 xonali kodi.

## Xavfsizlik

- Supabase faqat serverda, `service_role` kaliti bilan ishlatiladi. Jadvallarda RLS yoqilgan va policy yo‘q, shuning uchun brauzerdan to‘g‘ridan-to‘g‘ri kirib bo‘lmaydi.
- Kod to‘g‘ri bo‘lsa, imzolangan cookie (`SESSION_SECRET`) beriladi. O‘quvchi faqat o‘z darajasidagi testlarni oladi, boshqa darajalarning savollari brauzerga yuborilmaydi.
- Ball serverda qayta hisoblanadi, brauzerdan kelgan ballga ishonilmaydi.

## Yangi test qo‘shish

1. Savollar faylini yarating, masalan `questions-n4-2.ts` (namuna: [questions-n4-1.ts](questions-n4-1.ts)).
2. Uni [lib/tests.ts](lib/tests.ts) dagi `TESTS` ro‘yxatiga qo‘shing.
3. Audio: `python scripts/generate-audio.py n4-2` (kerak: `pip install edge-tts imageio-ffmpeg`).
4. PDF: `npx tsx scripts/make-pdf.ts n4-2`.

## Lokal ishga tushirish

```bash
npm install
npm run dev
```

Supabase ulanmagan bo‘lsa, lokal rejimda (`npm run dev`) yuqoridagi boshlang‘ich kodlar ishlaydi, lekin natijalar saqlanmaydi.
