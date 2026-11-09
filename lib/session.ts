import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { isLevelId, type LevelId } from "@/lib/levels";

// Imzolangan cookie: base64url(JSON).base64url(HMAC-SHA256).
// O'quvchi cookie'si — qaysi darajaga kirganini, admin cookie'si — admin
// ekanini bildiradi. Imzo SESSION_SECRET bilan, uni bilmasdan soxtalab bo'lmaydi.

export const STUDENT_COOKIE = "jft_access";
export const ADMIN_COOKIE = "jft_admin";

const STUDENT_MAX_AGE = 60 * 60 * 6; // 6 soat
const ADMIN_MAX_AGE = 60 * 60 * 12; // 12 soat

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (secret && secret.length >= 16) return secret;

  if (process.env.NODE_ENV !== "production") {
    return "dev-only-session-secret-change-me";
  }

  throw new Error("SESSION_SECRET (kamida 16 belgi) sozlanmagan.");
}

function sign(data: string) {
  return createHmac("sha256", getSecret()).update(data).digest("base64url");
}

function encode(payload: object) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data)}`;
}

function decode(token: string | undefined): Record<string, unknown> | null {
  if (!token) return null;

  const [data, signature] = token.split(".");
  if (!data || !signature) return null;

  const expected = Buffer.from(sign(data));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf-8"));
    if (typeof payload?.exp !== "number" || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

const cookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge,
});

// ---------------- O'quvchi ----------------

export async function setStudentAccess(level: LevelId) {
  const store = await cookies();
  store.set(
    STUDENT_COOKIE,
    encode({ level, exp: Date.now() + STUDENT_MAX_AGE * 1000 }),
    cookieOptions(STUDENT_MAX_AGE)
  );
}

export async function getStudentLevel(): Promise<LevelId | null> {
  const store = await cookies();
  const payload = decode(store.get(STUDENT_COOKIE)?.value);
  return isLevelId(payload?.level) ? payload.level : null;
}

export async function clearStudentAccess() {
  const store = await cookies();
  store.delete(STUDENT_COOKIE);
}

// ---------------- Admin ----------------

export function checkAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const a = Buffer.from(sign(password));
  const b = Buffer.from(sign(expected));
  return timingSafeEqual(a, b);
}

export async function setAdminSession() {
  const store = await cookies();
  store.set(
    ADMIN_COOKIE,
    encode({ role: "admin", exp: Date.now() + ADMIN_MAX_AGE * 1000 }),
    cookieOptions(ADMIN_MAX_AGE)
  );
}

export async function isAdmin() {
  const store = await cookies();
  return decode(store.get(ADMIN_COOKIE)?.value)?.role === "admin";
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}
