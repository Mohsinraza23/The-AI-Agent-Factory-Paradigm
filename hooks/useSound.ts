"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function createAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try { return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)(); }
  catch { return null; }
}

function playTone(ctx: AudioContext, freq: number, duration: number, type: OscillatorType = "sine", gain = 0.18) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.connect(g); g.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("soundEnabled");
    if (stored === "true") setEnabled(true);
  }, []);

  function toggle() {
    setEnabled(prev => {
      const next = !prev;
      localStorage.setItem("soundEnabled", String(next));
      if (!ctxRef.current) ctxRef.current = createAudioCtx();
      return next;
    });
  }

  const correct = useCallback(() => {
    if (!enabled) return;
    if (!ctxRef.current) ctxRef.current = createAudioCtx();
    const ctx = ctxRef.current; if (!ctx) return;
    playTone(ctx, 523, 0.12); // C5
    setTimeout(() => playTone(ctx, 659, 0.15), 80); // E5
    setTimeout(() => playTone(ctx, 784, 0.2), 160); // G5
  }, [enabled]);

  const wrong = useCallback(() => {
    if (!enabled) return;
    if (!ctxRef.current) ctxRef.current = createAudioCtx();
    const ctx = ctxRef.current; if (!ctx) return;
    playTone(ctx, 220, 0.25, "sawtooth", 0.12);
    setTimeout(() => playTone(ctx, 180, 0.3, "sawtooth", 0.08), 120);
  }, [enabled]);

  const complete = useCallback(() => {
    if (!enabled) return;
    if (!ctxRef.current) ctxRef.current = createAudioCtx();
    const ctx = ctxRef.current; if (!ctx) return;
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playTone(ctx, f, 0.2), i * 100));
  }, [enabled]);

  const tick = useCallback(() => {
    if (!enabled) return;
    if (!ctxRef.current) ctxRef.current = createAudioCtx();
    const ctx = ctxRef.current; if (!ctx) return;
    playTone(ctx, 880, 0.06, "sine", 0.06);
  }, [enabled]);

  return { enabled, toggle, correct, wrong, complete, tick };
}
