import { invitationConfig } from "@/config/invitation.config";
import type { DrinkOption } from "@/types/invitation";

/** Liste plate de toutes les boissons (pour lookup / API) */
export function getAllDrinks(): DrinkOption[] {
  return invitationConfig.rsvp.drinkCategories.flatMap((category) => category.items);
}

export function getDrinkLabel(id: string): string {
  return getAllDrinks().find((drink) => drink.id === id)?.label ?? id;
}
