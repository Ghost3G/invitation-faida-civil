"use client";

import { BackButton } from "@/components/ui/BackButton";
import { useSwipeBack } from "@/hooks/useSwipeBack";

export function SceneNavigation() {
  useSwipeBack();
  return <BackButton />;
}
