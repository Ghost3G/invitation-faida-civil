"use client";

import { useCallback, useEffect, useState } from "react";
import { getDrinkLabel } from "@/lib/utils/drinks";

interface StoredRsvp {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  attendance: "yes" | "no" | "maybe";
  guestCount: number;
  drinks: string[];
  message?: string;
  token?: string;
  submittedAt?: string;
}

const ATTENDANCE_LABEL = {
  yes: "Oui",
  maybe: "Peut-être",
  no: "Non",
} as const;

export default function AdminRsvpPage() {
  const [secret, setSecret] = useState("");
  const [items, setItems] = useState<StoredRsvp[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (key: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/rsvp?secret=${encodeURIComponent(key)}`);
      const body = await res.json();
      if (!res.ok || !body.success) {
        setError(body.message ?? "Accès refusé");
        setItems([]);
        return;
      }
      setItems(body.data as StoredRsvp[]);
      sessionStorage.setItem("rsvp-admin-secret", key);
    } catch {
      setError("Impossible de charger les RSVP");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("rsvp-admin-secret");
    if (saved) {
      setSecret(saved);
      void load(saved);
    }
  }, [load]);

  const yes = items.filter((i) => i.attendance === "yes").length;
  const maybe = items.filter((i) => i.attendance === "maybe").length;
  const no = items.filter((i) => i.attendance === "no").length;

  return (
    <main className="min-h-dvh bg-[#7a6f66] px-4 py-8 text-[#faf6f1]">
      <div className="mx-auto max-w-3xl space-y-6">
        <header>
          <p className="text-xs tracking-[0.3em] text-white/60 uppercase">
            Administration
          </p>
          <h1 className="mt-2 font-serif text-3xl">Réponses RSVP</h1>
          <p className="mt-1 text-sm text-white/70">
            Lumière & Faïda — mariage civil
          </p>
        </header>

        <form
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            void load(secret);
          }}
        >
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Mot de passe admin"
            className="min-h-12 flex-1 rounded-full border border-white/15 bg-white/10 px-5 text-sm outline-none placeholder:text-white/40 focus:border-[#d4a5ab]"
          />
          <button
            type="submit"
            className="min-h-12 rounded-full bg-[#d4a5ab] px-6 text-sm font-semibold text-[#4a433c]"
          >
            {loading ? "Chargement…" : "Voir les réponses"}
          </button>
        </form>

        {error && (
          <p className="rounded-2xl border border-rose-300/30 bg-rose-500/20 px-4 py-3 text-sm">
            {error}
          </p>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-2xl font-semibold text-[#a3b59e]">{yes}</p>
              <p className="text-[10px] tracking-widest uppercase text-white/60">Oui</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-2xl font-semibold text-[#e8c5c9]">{maybe}</p>
              <p className="text-[10px] tracking-widest uppercase text-white/60">Peut-être</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3">
              <p className="text-2xl font-semibold text-white/70">{no}</p>
              <p className="text-[10px] tracking-widest uppercase text-white/60">Non</p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {items.map((item, index) => (
            <article
              key={`${item.token ?? index}-${item.submittedAt}`}
              className="rounded-2xl border border-white/10 bg-white/8 p-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-serif text-lg">
                  {item.firstName} {item.lastName}
                </h2>
                <span className="text-xs text-[#d4a5ab]">
                  {ATTENDANCE_LABEL[item.attendance]}
                  {item.attendance === "yes" ? ` · ${item.guestCount} pers.` : ""}
                </span>
              </div>
              <p className="mt-1 text-xs text-white/60">{item.phone}</p>
              {item.email && (
                <p className="text-xs text-white/60">{item.email}</p>
              )}
              {item.drinks?.length > 0 && (
                <p className="mt-2 text-xs text-white/80">
                  Boissons : {item.drinks.map(getDrinkLabel).join(", ")}
                </p>
              )}
              {item.message && (
                <p className="mt-2 text-sm italic text-white/75">&ldquo;{item.message}&rdquo;</p>
              )}
              {item.submittedAt && (
                <p className="mt-2 text-[10px] text-white/45">
                  {new Date(item.submittedAt).toLocaleString("fr-FR")}
                </p>
              )}
            </article>
          ))}
          {!loading && !error && items.length === 0 && secret && (
            <p className="text-center text-sm text-white/60">Aucune réponse pour le moment.</p>
          )}
        </div>
      </div>
    </main>
  );
}
