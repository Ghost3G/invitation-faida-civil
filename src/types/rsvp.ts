export type AttendanceStatus = "yes" | "no" | "maybe";

export interface RsvpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  attendance: AttendanceStatus;
  guestCount: number;
  drinks?: string[];
  message?: string;
}

export interface RsvpSubmission extends RsvpFormData {
  submittedAt: string;
  token?: string;
  qrPayload?: string;
}
