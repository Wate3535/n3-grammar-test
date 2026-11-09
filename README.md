# Yapon tili mock testlari

JFT-Basic A2 va JLPT N3, N4, N5 mock testlari. O‘quvchi saytga kirganda 4 xonali kod teradi va kodga qarab o‘z darajasidagi testlarga yo‘naltiriladi. Natijalar Supabase’ga saqlanadi va admin panelda ko‘rinadi.

| Daraja | Testlar | Vaqt | Ball (o‘tish) |
| --- | --- | --- | --- |
| JFT-Basic A2 | 模擬テスト 2, 3, 7, 8 (48 savol) | 60 daq | 10–250 (200) |
| JLPT N5 | 模擬テスト 1 (67 savol) | 20 + 40 + ~30 daq | 0–180 (80; 基準点 38 / 19) |
| JLPT N4 | 模擬テスト 1 (85 savol) | 25 + 55 + ~35 daq | 0–180 (90; 基準点 38 / 19) |
| JLPT N3 | 模擬テスト 1 (102 savol) | 30 + 70 + ~40 daq | 0–180 (95; 基準点 19 / 19 / 19) |

JLPT testlari rasmiy formatda tuzilgan: har bir 問題 dagi savollar soni va turlari real imtihondagidek. Imtihon ham shu tartibda o‘tadi:

- 3 ta qism ketma-ket topshiriladi, har birining o‘z vaqti bor. Tugagan qismga qaytib bo‘lmaydi.
- 聴解 to‘xtovsiz yangraydi: avval har bir 問題 ko‘rsatmasi, keyin savollar. Har bir savol 1 marta eshittiriladi, undan keyin javob uchun pauza beriladi.
- 概要理解, 発話表現 va 即時応答 da javob variantlari ekranda yozilmaydi, audioda o‘qiladi.
- Baholash bo‘limlar bo‘yicha (得点区分). Umumiy ball 合格点 dan yuqori bo‘lsa ham, birorta bo‘lim 基準点 dan past bo‘lsa 不合格.

Ball to‘g‘ri javoblar ulushiga qarab hisoblanadi, shuning uchun taxminiy. Testlar o‘quv uchun tuzilgan, rasmiy imtihon savollari emas.

## Supabase’ni ulash (bir marta)

1. [supabase.com](https://supabase.com) da yangi loyiha oching.
2. **SQL Editor → New query** ga [supabase/schema.sql](supabase/schema.sql) ni to‘liq qo‘yib, **Run** bosing. Jadvallar va boshlang‘ich kodlar yaratiladi.
3. **Project Settings → API Keys** dan `Project URL` va **Secret key** (`sb_secret_...`) ni oling. U `SUPABASE_SERVICE_ROLE_KEY` ga yoziladi.
4. [.env.example](.env.example) ni `.env.local` ga nusxalab to‘ldiring.
5. Shu 4 ta o‘zgaruvchini **Vercel → Settings → Environment Variables** ga qo‘shing va qayta deploy qiling.

Boshlang‘ich kodlar: JFT `7391`, N3 `4826`, N4 `2564`, N5 `9157`. Ularni admin paneldagi **Kodlar** bo‘limida o‘zgartiring.

## Admin panel

`/admin`. Parol `ADMIN_PASSWORD` o‘zgaruvchisidan olinadi.

- **Umumiy:** o‘quvchilar soni, urinishlar, darajalar bo‘yicha o‘rtacha natija va oxirgi natijalar.
- **O‘quvchilar:** ism yoki Telegram nik bo‘yicha qidirish. Har bir o‘quvchining urinishlari, bo‘limlar bo‘yicha natijasi va zaif savol turlari.
- **Xatolar tahlili:** har bir test bo‘yicha savollarning xato foizi va eng ko‘p tanlangan noto‘g‘ri variant.
- **Kodlar:** har bir darajaning 4 xonali kodi.

## Xavfsizlik

- Supabase faqat serverda, `service_role` kaliti bilan ishlatiladi. Jadvallarda RLS yoqilgan va policy yo‘q, shuning uchun brauzerdan to‘g‘ridan-to‘g‘ri kirib bo‘lmaydi.
- Kod to‘g‘ri bo‘lsa, imzolangan cookie (`SESSION_SECRET`) beriladi. O‘quvchi faqat o‘z darajasidagi testlarni oladi, boshqa darajalarning savollari brauzerga yuborilmaydi.
- Ball serverda qayta hisoblanadi, brauzerdan kelgan ballga ishonilmaydi.

## Yangi test qo‘shish

1. Savollar faylini yarating, masalan `questions-n4-2.ts` (namuna: [questions-n4-1.ts](questions-n4-1.ts)). JLPT uchun har bir 問題 dagi savollar soni rasmiy jadvalga mos bo‘lsin: [lib/jlpt.ts](lib/jlpt.ts).
2. Uni [lib/tests.ts](lib/tests.ts) dagi `TESTS` ro‘yxatiga qo‘shing.
3. Audio (kerak: `pip install edge-tts imageio-ffmpeg`):
   - JFT: `python scripts/generate-audio.py test-9`
   - JLPT: `python scripts/generate-jlpt-audio.py n4-2` (faqat yetishmagan fayllarni yaratadi; hammasini qayta yaratish uchun `--force`)
4. PDF: `npx tsx scripts/make-pdf.ts n4-2`.

## Lokal ishga tushirish

```bash
npm install
npm run dev
```

Supabase ulanmagan bo‘lsa, lokal rejimda (`npm run dev`) yuqoridagi boshlang‘ich kodlar ishlaydi, lekin natijalar saqlanmaydi.
