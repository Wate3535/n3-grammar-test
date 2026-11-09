-- =========================================================
-- Yapon tili mock testlari — Supabase sxemasi
-- Supabase → SQL Editor → New query → shu faylni to'liq qo'yib, Run bosing.
-- Qayta ishga tushirsa ham xavfsiz (if not exists).
-- =========================================================

create extension if not exists pgcrypto;

-- 1. Kirish kodlari: har bir daraja uchun bitta 4 xonali kod.
create table if not exists public.access_codes (
  level text primary key check (level in ('jft', 'n3', 'n4', 'n5')),
  code text not null check (code ~ '^[0-9]{4}$'),
  updated_at timestamptz not null default now(),
  constraint access_codes_code_key unique (code) deferrable initially deferred
);

-- Boshlang'ich kodlar — admin paneldan o'zgartiring.
insert into public.access_codes (level, code) values
  ('jft', '7391'),
  ('n3',  '4826'),
  ('n4',  '2564'),
  ('n5',  '9157')
on conflict (level) do nothing;

-- 2. O'quvchilar (Telegram nik bo'yicha bitta yozuv).
--    "phone" ustunida Telegram nik saqlanadi, masalan "@ali_valiyev".
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null unique,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

-- 3. Har bir test urinishi.
create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students (id) on delete cascade,
  student_name text not null,
  level text not null check (level in ('jft', 'n3', 'n4', 'n5')),
  test_slug text not null,
  test_name text not null,
  correct integer not null,
  total integer not null,
  scaled_score integer not null,
  max_score integer not null,
  passed boolean not null,
  section_scores jsonb not null default '{}'::jsonb,
  answers jsonb not null default '{}'::jsonb,
  warnings integer not null default 0,
  duration_sec integer not null default 0,
  finish_reason text not null default 'manual',
  created_at timestamptz not null default now()
);

create index if not exists attempts_student_idx on public.attempts (student_id, created_at desc);
create index if not exists attempts_test_idx on public.attempts (test_slug, created_at desc);
create index if not exists attempts_created_idx on public.attempts (created_at desc);

-- 4. Xavfsizlik: RLS yoqilgan, policy yo'q.
-- Brauzer (anon kalit) hech narsani o'qiy/yoza olmaydi; sayt serveri
-- service_role kaliti bilan ishlaydi.
alter table public.access_codes enable row level security;
alter table public.students enable row level security;
alter table public.attempts enable row level security;
