import { Card, NotConfigured, PageTitle } from "@/components/admin/ui";
import { getAccessCodes } from "@/lib/access";
import { formatDate, requireAdmin } from "@/lib/admin";
import { LEVEL_IDS, LEVELS } from "@/lib/levels";
import { isSupabaseConfigured } from "@/lib/supabase";
import CodesForm from "./CodesForm";

export default async function CodesPage() {
  await requireAdmin();

  const configured = isSupabaseConfigured();
  const codes = configured ? await getAccessCodes() : null;

  return (
    <>
      <PageTitle
        title="Kirish kodlari"
        subtitle="O‘quvchi saytga kirganda shu kodlardan birini teradi va tegishli darajaga o‘tadi."
      />
      {!configured && <NotConfigured />}

      {codes && (
        <Card className="max-w-xl">
          <CodesForm
            levels={LEVEL_IDS.map((id) => ({
              id,
              label: LEVELS[id].label,
              code: codes[id].code,
              updatedAt: codes[id].updatedAt ? formatDate(codes[id].updatedAt) : null,
            }))}
          />
        </Card>
      )}

      <p className="mt-4 max-w-xl text-sm text-slate-500">
        Kodni o‘zgartirsangiz, eski kod darhol ishlamay qoladi. Hozir test ishlayotgan o‘quvchilar
        testni oxirigacha yakunlay oladi.
      </p>
    </>
  );
}
