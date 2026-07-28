import { randomUUID } from "crypto";
import { mkdir, appendFile, readFile, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getDrinkLabel } from "@/lib/utils/drinks";
import { invitationConfig } from "@/config/invitation.config";
import type { RsvpFormData } from "@/types/rsvp";

const ATTENDANCE_TO_RSVP = {
  yes: "confirmed",
  no: "declined",
  maybe: "maybe",
} as const;

const RSVP_DIR = path.join(process.cwd(), "data");
const RSVP_FILE = path.join(RSVP_DIR, "rsvps.json");

function mapToRegisterBody(data: RsvpFormData) {
  const rsvpStatus = ATTENDANCE_TO_RSVP[data.attendance];
  const guestCount = data.attendance === "yes" ? Math.max(1, data.guestCount) : 0;
  const drinks = data.drinks ?? [];
  const drinkLabels = drinks.map(getDrinkLabel).join(", ");

  const notesParts = [
    data.message?.trim(),
    drinkLabels ? `Boissons : ${drinkLabels}` : null,
  ].filter(Boolean);

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone ?? "",
    email: data.email || undefined,
    rsvpStatus,
    plusOnes: data.attendance === "yes" ? Math.max(0, guestCount - 1) : 0,
    notes: notesParts.length ? notesParts.join(" · ") : undefined,
  };
}

function buildLocalQrPayload(data: RsvpFormData, token: string) {
  return JSON.stringify({
    event: invitationConfig.event.title,
    couple: invitationConfig.couple.displayNames,
    guest: `${data.firstName} ${data.lastName}`,
    phone: data.phone ?? "",
    attendance: data.attendance,
    guests: data.guestCount,
    drinks: (data.drinks ?? []).map(getDrinkLabel),
    token,
  });
}

async function saveLocalRsvp(
  data: RsvpFormData,
  token: string,
  syncedTo3g: boolean,
) {
  await mkdir(RSVP_DIR, { recursive: true });

  let existing: unknown[] = [];
  try {
    const raw = await readFile(RSVP_FILE, "utf8");
    existing = JSON.parse(raw) as unknown[];
    if (!Array.isArray(existing)) existing = [];
  } catch {
    existing = [];
  }

  existing.push({
    ...data,
    token,
    syncedTo3g,
    submittedAt: new Date().toISOString(),
  });

  await writeFile(RSVP_FILE, JSON.stringify(existing, null, 2), "utf8");

  // Journal append-only (backup simple)
  await appendFile(
    path.join(RSVP_DIR, "rsvps.ndjson"),
    `${JSON.stringify({
      ...data,
      token,
      syncedTo3g,
      submittedAt: new Date().toISOString(),
    })}\n`,
    "utf8",
  );
}

async function trySync3Gevents(body: ReturnType<typeof mapToRegisterBody>) {
  const apiUrl = process.env.THREEG_API_URL;
  if (!apiUrl) {
    return { synced: false as const, data: null };
  }

  const tenantSlug =
    process.env.THREEG_TENANT_SLUG ?? "mariage-lumiere-faida";
  const eventSlug =
    process.env.THREEG_EVENT_SLUG ?? "mariage-civil";

  const baseUrl = apiUrl.replace(/\/$/, "");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(
      `${baseUrl}/public/${tenantSlug}/events/${eventSlug}/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );

    const result = (await response.json()) as {
      data?: { token?: string; qrPayload?: string };
      message?: string;
    };

    if (!response.ok) {
      console.warn("[RSVP → 3Gevents]", result.message ?? response.status);
      return { synced: false as const, data: null };
    }

    return { synced: true as const, data: result.data ?? null };
  } catch (error) {
    console.warn("[RSVP → 3Gevents] sync ignorée:", error);
    return { synced: false as const, data: null };
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret") ?? "";
  const expected = process.env.RSVP_ADMIN_SECRET ?? "faida-lumiere-2026";

  if (secret !== expected) {
    return NextResponse.json(
      { success: false, message: "Non autorisé" },
      { status: 401 },
    );
  }

  try {
    const raw = await readFile(RSVP_FILE, "utf8");
    const list = JSON.parse(raw) as unknown[];
    return NextResponse.json({
      success: true,
      count: Array.isArray(list) ? list.length : 0,
      data: Array.isArray(list) ? list : [],
    });
  } catch {
    return NextResponse.json({ success: true, count: 0, data: [] });
  }
}

export async function POST(request: Request) {
  try {
    const data: RsvpFormData = await request.json();
    const body = mapToRegisterBody(data);
    const localToken = randomUUID();

    const remote = await trySync3Gevents(body);

    const token = remote.data?.token ?? localToken;
    const qrPayload =
      remote.data?.qrPayload ?? buildLocalQrPayload(data, token);

    await saveLocalRsvp(data, token, remote.synced);

    return NextResponse.json({
      success: true,
      data: {
        token,
        qrPayload,
        syncedTo3g: remote.synced,
      },
    });
  } catch (error) {
    console.error("[RSVP]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Impossible d'enregistrer votre réponse. Réessayez.",
      },
      { status: 500 },
    );
  }
}
