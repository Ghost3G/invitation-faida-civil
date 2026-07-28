"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { RsvpSubmission } from "@/types/rsvp";

const STORAGE_KEY = "invitation-faida-rsvp";

interface RsvpContextValue {
  submission: RsvpSubmission | null;
  setSubmission: (data: RsvpSubmission) => void;
  clearSubmission: () => void;
}

const RsvpContext = createContext<RsvpContextValue | null>(null);

export function RsvpProvider({ children }: { children: ReactNode }) {
  const [submission, setSubmissionState] = useState<RsvpSubmission | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSubmissionState(JSON.parse(raw) as RsvpSubmission);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  const setSubmission = useCallback((data: RsvpSubmission) => {
    setSubmissionState(data);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, []);

  const clearSubmission = useCallback(() => {
    setSubmissionState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(
    () => ({ submission, setSubmission, clearSubmission }),
    [submission, setSubmission, clearSubmission],
  );

  if (!hydrated) {
    return (
      <RsvpContext.Provider value={value}>{children}</RsvpContext.Provider>
    );
  }

  return (
    <RsvpContext.Provider value={value}>{children}</RsvpContext.Provider>
  );
}

export function useRsvp() {
  const context = useContext(RsvpContext);
  if (!context) {
    throw new Error("useRsvp must be used within RsvpProvider");
  }
  return context;
}
