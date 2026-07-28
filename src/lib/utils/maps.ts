import { invitationConfig } from "@/config/invitation.config";

export function getGoogleMapsUrl(): string {
  const query = encodeURIComponent(invitationConfig.event.mapsQuery);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function getGoogleMapsDirectionsUrl(): string {
  const { lat, lng } = invitationConfig.event.coordinates;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}
