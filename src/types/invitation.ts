export interface PersonInfo {
  firstName: string;
  lastName: string;
  fullName: string;
}

export interface CoupleInfo {
  groom: PersonInfo;
  bride: PersonInfo;
  /** Affichage court : « Lumière & Faïda » */
  displayNames: string;
  /** Affichage complet : « Lumière Ingonda & Faïda Koko » */
  fullNames: string;
  /** Photo principale (ouverture) */
  photo: string;
  /** Photo page accueil / cérémonie (plein écran) */
  ceremonyPhoto: string;
  /** Photo compte à rebours */
  countdownPhoto: string;
}

export interface EventCoordinates {
  lat: number;
  lng: number;
}

export interface EventInfo {
  title: string;
  description: string;
  date: string;
  venue: string;
  address: string;
  city: string;
  mapsQuery: string;
  coordinates: EventCoordinates;
  arrivalNote?: string;
  parkingNote?: string;
  dressNote?: string;
}

export interface EnvelopeConfig {
  recipientLabel: string;
  sealColor: string;
  paperColor: string;
  letterMessage?: string;
}

export interface ProgramItem {
  time: string;
  label: string;
  icon?: string;
}

export interface DrinkOption {
  id: string;
  label: string;
}

export interface DrinkCategory {
  id: string;
  label: string;
  items: DrinkOption[];
}

export interface RsvpConfig {
  deadline: string;
  maxGuests: number;
  contactEmail: string;
  contactWhatsApp: string;
  drinkCategories: DrinkCategory[];
}

export interface AudioConfig {
  src: string;
  label: string;
  volume: number;
}

export interface ThemeConfig {
  name: string;
  primary: string;
  accent: string;
  cream: string;
  powder: string;
}

export interface DressCodeLook {
  id: string;
  label: string;
  description: string;
  image: string;
}

export interface DressCodeConfig {
  title: string;
  subtitle: string;
  looks: DressCodeLook[];
}

export interface InvitationConfig {
  couple: CoupleInfo;
  event: EventInfo;
  envelope: EnvelopeConfig;
  program: ProgramItem[];
  gallery: string[];
  rsvp: RsvpConfig;
  audio: AudioConfig;
  theme: ThemeConfig;
  dressCode: DressCodeConfig;
}
