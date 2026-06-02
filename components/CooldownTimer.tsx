"use client";

import { useEffect, useState } from "react";

interface CooldownTimerProps {
  remainingMs: number;
  onComplete?: () => void;
}

const CooldownTimer = ({ remainingMs, onComplete }: CooldownTimerProps) => {
  const [remaining, setRemaining] = useState(remainingMs);

  useEffect(() => {
    if (remaining <= 0) {
      onComplete?.();
      return;
    }
    const id = setInterval(() => setRemaining((c) => Math.max(0, c - 1000)), 1000);
    return () => clearInterval(id);
  }, [remaining, onComplete]);

  if (remaining <= 0) return null;

  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <h2 className="text-3xl font-bold">Next quiz available in</h2>
      <div className="flex gap-6 text-5xl font-mono font-bold">
        <div className="flex flex-col items-center">
          <span>{String(hours).padStart(2, "0")}</span>
          <span className="text-sm font-normal text-muted-foreground">Hours</span>
        </div>
        <span className="text-primary">:</span>
        <div className="flex flex-col items-center">
          <span>{String(minutes).padStart(2, "0")}</span>
          <span className="text-sm font-normal text-muted-foreground">Minutes</span>
        </div>
        <span className="text-primary">:</span>
        <div className="flex flex-col items-center">
          <span>{String(seconds).padStart(2, "0")}</span>
          <span className="text-sm font-normal text-muted-foreground">Seconds</span>
        </div>
      </div>
      <p className="text-muted-foreground mt-4">
        Complete more sessions to unlock a new quiz
      </p>
    </div>
  );
};

export default CooldownTimer;
