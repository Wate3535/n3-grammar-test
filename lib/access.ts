import "server-only";

import { getSupabase } from "@/lib/supabase";
import { isLevelId, LEVEL_IDS, type LevelId } from "@/lib/levels";

// Supabase ulanmagan bo'lsa (faqat lokal ishlab chiqishda) shu kodlar ishlaydi.
// Production'da kodlar faqat Supabase'dagi access_codes jadvalidan olinadi.
export const DEV_CODES: Record<LevelId, string> = {
  jft: "7391",
  n3: "4826",
  n4: "2564",
  n5: "9157",
};

export type AccessCodes = Record<LevelId, { code: string; updatedAt: string | null }>;

export async function getAccessCodes(): Promise<AccessCodes | null> {
  const supabase = getSupabase();

  if (!supabase) {
    if (process.env.NODE_ENV === "production") return null;
    return Object.fromEntries(
      LEVEL_IDS.map((level) => [level, { code: DEV_CODES[level], updatedAt: null }])
    ) as AccessCodes;
  }

  const { data, error } = await supabase.from("access_codes").select("level, code, updated_at");
  if (error || !data) return null;

  const codes = {} as AccessCodes;
  for (const level of LEVEL_IDS) {
    const row = data.find((item) => item.level === level);
    codes[level] = { code: row?.code ?? "", updatedAt: row?.updated_at ?? null };
  }
  return codes;
}

// "unavailable" — kodlar jadvalini o'qib bo'lmadi (Supabase ulanmagan yoki xato).
export async function findLevelByCode(code: string): Promise<LevelId | null | "unavailable"> {
  const codes = await getAccessCodes();
  if (!codes) return "unavailable";

  const level = LEVEL_IDS.find((id) => codes[id].code === code);
  return level && isLevelId(level) ? level : null;
}
