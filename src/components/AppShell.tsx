"use client";

import { MobilePreviewFrame } from "@/components/dev/MobilePreviewFrame";
import { DevPreviewToggle } from "@/components/dev/DevPreviewToggle";
import { InvitationExperience } from "@/components/InvitationExperience";
import { MobilePreviewProvider } from "@/context/MobilePreviewContext";

const isDev = process.env.NODE_ENV === "development";

export function AppShell() {
  return (
    <MobilePreviewProvider enabled={isDev}>
      <MobilePreviewFrame>
        <InvitationExperience />
      </MobilePreviewFrame>
      {isDev && <DevPreviewToggle />}
    </MobilePreviewProvider>
  );
}
