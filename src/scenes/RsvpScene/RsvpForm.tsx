"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import { Button } from "@/components/ui/Button";
import { invitationConfig } from "@/config/invitation.config";
import { rsvpSchema, type RsvpSchemaData } from "@/lib/validations/rsvp.schema";
import { cn } from "@/lib/utils/cn";

interface RsvpFormProps {
  onSubmit: (data: RsvpSchemaData) => void;
  isSubmitting?: boolean;
}

const inputClass =
  "min-h-12 w-full rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-base text-cream placeholder:text-text-muted/70 focus:border-rose-glow/50 focus:outline-none focus:ring-1 focus:ring-rose-glow/30";

const attendanceOptions = [
  {
    value: "yes" as const,
    label: "Oui, je serai présent(e)",
    hint: "Avec joie",
  },
  {
    value: "maybe" as const,
    label: "Peut-être",
    hint: "Je confirme bientôt",
  },
  {
    value: "no" as const,
    label: "Non, je ne pourrai pas",
    hint: "Avec regret",
  },
];

export function RsvpForm({ onSubmit, isSubmitting }: RsvpFormProps) {
  const [openCategory, setOpenCategory] = useState<string | null>("soft");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RsvpSchemaData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      attendance: undefined,
      guestCount: 1,
      drinks: [],
      message: "",
    },
  });

  const attendance = watch("attendance");
  const drinks = watch("drinks") ?? [];

  const toggleDrink = (id: string) => {
    const next = drinks.includes(id)
      ? drinks.filter((d) => d !== id)
      : [...drinks, id];
    setValue("drinks", next, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <input
            {...register("firstName")}
            placeholder="Prénom *"
            className={inputClass}
            autoComplete="given-name"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-rose-glow">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <input
            {...register("lastName")}
            placeholder="Nom *"
            className={inputClass}
            autoComplete="family-name"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-rose-glow">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <input
          {...register("phone")}
          placeholder="Téléphone WhatsApp *"
          type="tel"
          className={inputClass}
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-rose-glow">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder="Email (optionnel)"
          type="email"
          className={inputClass}
          autoComplete="email"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-rose-glow">{errors.email.message}</p>
        )}
      </div>

      <div>
        <p className="mb-2 font-display text-[11px] tracking-[0.22em] text-nude uppercase">
          Votre présence *
        </p>
        <div className="space-y-2">
          {attendanceOptions.map((option) => {
            const selected = attendance === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  setValue("attendance", option.value, { shouldValidate: true })
                }
                className={cn(
                  "flex min-h-12 w-full flex-col items-start justify-center rounded-2xl px-4 py-3 text-left transition active:scale-[0.99]",
                  selected
                    ? "border border-rose-glow/50 bg-rose-glow/25 text-cream"
                    : "border border-white/10 bg-white/5 text-text-muted",
                )}
              >
                <span className="text-sm">{option.label}</span>
                <span
                  className={cn(
                    "text-[10px]",
                    selected ? "text-nude" : "text-text-muted/70",
                  )}
                >
                  {option.hint}
                </span>
              </button>
            );
          })}
        </div>
        {errors.attendance && (
          <p className="mt-1 text-xs text-rose-glow">
            {errors.attendance.message}
          </p>
        )}
      </div>

      {attendance === "yes" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-4 overflow-hidden"
        >
          <div>
            <label className="mb-2 block font-display text-[11px] tracking-[0.22em] text-nude uppercase">
              Nombre d&apos;invités (max {invitationConfig.rsvp.maxGuests})
            </label>
            <input
              {...register("guestCount", { valueAsNumber: true })}
              type="number"
              min={1}
              max={invitationConfig.rsvp.maxGuests}
              className={inputClass}
            />
            {errors.guestCount && (
              <p className="mt-1 text-xs text-rose-glow">
                {errors.guestCount.message}
              </p>
            )}
          </div>

          <div>
            <p className="mb-1 font-display text-[11px] tracking-[0.22em] text-nude uppercase">
              Que souhaitez-vous boire ? *
            </p>
            <p className="mb-3 text-[11px] text-text-muted">
              Plusieurs choix possibles
            </p>

            <div className="space-y-2">
              {invitationConfig.rsvp.drinkCategories.map((category) => {
                const isOpen = openCategory === category.id;
                const selectedInCategory = category.items.filter((item) =>
                  drinks.includes(item.id),
                ).length;

                return (
                  <div
                    key={category.id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenCategory(isOpen ? null : category.id)
                      }
                      className="flex min-h-12 w-full items-center justify-between gap-2 px-4 py-3 text-left"
                    >
                      <span className="font-display text-sm text-cream">
                        {category.label}
                        {selectedInCategory > 0 && (
                          <span className="ml-2 text-xs text-rose-glow">
                            ({selectedInCategory})
                          </span>
                        )}
                      </span>
                      <HiChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-rose-glow transition-transform",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-2 border-t border-white/10 px-3 pt-2 pb-3">
                            {category.items.map((drink) => {
                              const selected = drinks.includes(drink.id);
                              return (
                                <button
                                  key={drink.id}
                                  type="button"
                                  onClick={() => toggleDrink(drink.id)}
                                  className={cn(
                                    "min-h-10 rounded-full px-3.5 py-2 text-xs transition active:scale-95",
                                    selected
                                      ? "bg-rose-glow/40 text-cream ring-1 ring-rose-glow/55"
                                      : "bg-white/5 text-text-muted ring-1 ring-white/10",
                                  )}
                                >
                                  {drink.label}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {drinks.length > 0 && (
              <p className="mt-3 text-center text-[11px] text-nude">
                {drinks.length} boisson{drinks.length > 1 ? "s" : ""}{" "}
                sélectionnée{drinks.length > 1 ? "s" : ""}
              </p>
            )}
            {errors.drinks && (
              <p className="mt-2 text-xs text-rose-glow">
                {errors.drinks.message}
              </p>
            )}
          </div>
        </motion.div>
      )}

      <textarea
        {...register("message")}
        placeholder="Un petit mot pour les mariés (optionnel)"
        rows={3}
        className={cn("resize-none rounded-[1.5rem]", inputClass)}
      />

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Envoi…" : "Envoyer ma réponse"}
      </Button>
    </form>
  );
}
