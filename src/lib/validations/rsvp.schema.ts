import { z } from "zod";

export const rsvpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z
      .string()
      .min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Adresse email invalide").optional().or(z.literal("")),
    phone: z
      .string()
      .min(9, "Numéro de téléphone invalide"),
    attendance: z.enum(["yes", "no", "maybe"], {
      message: "Merci de préciser votre présence",
    }),
    guestCount: z
      .number()
      .min(0, "Nombre d'invités invalide")
      .max(10, "Nombre d'invités trop élevé"),
    drinks: z.array(z.string()).default([]),
    message: z.string().max(500, "Message trop long").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.attendance === "yes" && data.drinks.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["drinks"],
        message: "Choisissez au moins une boisson",
      });
    }
  });

export type RsvpSchemaData = z.infer<typeof rsvpSchema>;
