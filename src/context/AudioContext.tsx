"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Howl } from "howler";
import { invitationConfig } from "@/config/invitation.config";

interface AudioContextValue {
  isPlaying: boolean;
  isMuted: boolean;
  hasInteracted: boolean;
  isAvailable: boolean;
  isLoading: boolean;
  toggleMute: () => void;
  play: () => void;
  pause: () => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const soundRef = useRef<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifie seulement que le fichier existe (HEAD) — ne télécharge PAS l'audio
  useEffect(() => {
    let cancelled = false;

    const checkAvailability = async () => {
      try {
        const response = await fetch(invitationConfig.audio.src, {
          method: "HEAD",
        });
        if (cancelled) return;
        setIsAvailable(response.ok);
      } catch {
        if (!cancelled) setIsAvailable(false);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void checkAvailability();
    return () => {
      cancelled = true;
      soundRef.current?.unload();
      soundRef.current = null;
    };
  }, []);

  const ensureSound = useCallback(() => {
    if (soundRef.current) return soundRef.current;
    if (!isAvailable) return null;

    const sound = new Howl({
      src: [invitationConfig.audio.src],
      loop: true,
      volume: invitationConfig.audio.volume,
      html5: true,
      preload: true,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
    });
    soundRef.current = sound;
    return sound;
  }, [isAvailable]);

  const play = useCallback(() => {
    const sound = ensureSound();
    if (!sound) return;
    setHasInteracted(true);
    sound.mute(false);
    setIsMuted(false);
    sound.play();
  }, [ensureSound]);

  const pause = useCallback(() => {
    soundRef.current?.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const sound = ensureSound();
    if (!sound) return;

    setHasInteracted(true);
    const nextMuted = !isMuted;
    sound.mute(nextMuted);
    setIsMuted(nextMuted);

    if (!nextMuted && !sound.playing()) {
      sound.play();
    }
  }, [ensureSound, isMuted]);

  const value = useMemo(
    () => ({
      isPlaying,
      isMuted,
      hasInteracted,
      isAvailable,
      isLoading,
      toggleMute,
      play,
      pause,
    }),
    [
      isPlaying,
      isMuted,
      hasInteracted,
      isAvailable,
      isLoading,
      toggleMute,
      play,
      pause,
    ],
  );

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export function useAudioContext() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
}
