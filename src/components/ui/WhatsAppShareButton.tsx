"use client";

import { FaWhatsapp } from "react-icons/fa";
import { invitationConfig } from "@/config/invitation.config";
import { mobileConfig } from "@/config/mobile.config";
import { cn } from "@/lib/utils/cn";

interface WhatsAppShareButtonProps {
  className?: string;
  /** Message personnalisé (sinon texte de partage par défaut) */
  text?: string;
  label?: string;
}

function buildShareUrl(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function getDefaultShareText(url?: string) {
  const { event, couple } = invitationConfig;
  const link = url ?? (typeof window !== "undefined" ? window.location.origin : "");
  return [
    mobileConfig.whatsapp.shareText,
    "",
    `📅 ${new Date(event.date).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    `📍 ${event.venue}`,
    `${event.address}, ${event.city}`,
    link ? `\n${link}` : "",
    `\n— ${couple.displayNames}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function WhatsAppShareButton({
  className,
  text,
  label = "Partager sur WhatsApp",
}: WhatsAppShareButtonProps) {
  const message = text ?? getDefaultShareText();

  return (
    <a
      href={buildShareUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366]/90 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/25 transition active:scale-[0.97]",
        className,
      )}
    >
      <FaWhatsapp className="h-5 w-5" />
      {label}
    </a>
  );
}

export function WhatsAppContactButton({ className }: { className?: string }) {
  const phone = invitationConfig.rsvp.contactWhatsApp.replace(/\D/g, "");
  const message = encodeURIComponent(
    `Bonjour, je vous contacte au sujet du mariage civil de ${invitationConfig.couple.displayNames}.`,
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-cream transition active:scale-[0.97]",
        className,
      )}
    >
      <FaWhatsapp className="h-5 w-5 text-[#25D366]" />
      Contacter les mariés
    </a>
  );
}
