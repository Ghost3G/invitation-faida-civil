"use client";

import { useEffect, useState } from "react";
import { getCountdown, type CountdownValues } from "@/lib/utils/date";

export function useCountdown(targetDate: string): CountdownValues {
  const [countdown, setCountdown] = useState<CountdownValues>(() =>
    getCountdown(targetDate),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
}
