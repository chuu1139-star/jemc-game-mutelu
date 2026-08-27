import { useEffect, useId, useState } from "react";
import { muteluAudio, type AudioState } from "@/lib/audio";

export function AudioSettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const [state, setState] = useState<AudioState>(muteluAudio.state);

  useEffect(() => muteluAudio.subscribe(() => setState({ ...muteluAudio.state })), []);

  useEffect(() => {
    if (!open) return;
    muteluAudio.start();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/78 p-4 backdrop-blur-[10px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[90dvh] w-full max-w-[480px] overflow-y-auto rounded-3xl border border-gold/65 p-6 shadow-[0_0_35px_rgba(255,189,58,0.18),0_24px_70px_rgba(0,0,0,0.5)]" style={{ background: "linear-gradient(145deg, #172b4d, #101b35)" }}>
        <div className="flex items-center justify-between">
          <h2 id={titleId} className="text-xl font-semibold text-white">
            การตั้งค่าระบบเสียง (Sound Settings)
          </h2>
          <button
            type="button"
            className="min-h-11 min-w-11 rounded-xl p-2 text-muted transition hover:bg-white/10"
            aria-label="ปิดการตั้งค่าระบบเสียง"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <p className="mt-4 text-sm text-neon-soft" aria-live="polite">
          {state.enabled ? "เสียงเปิดอยู่" : "เสียงปิดอยู่"}
        </p>
        <button
          type="button"
          role="switch"
          aria-checked={state.enabled}
          className="mt-5 flex min-h-11 w-full items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left text-white transition hover:bg-white/10"
          onClick={() => {
            muteluAudio.pop();
            muteluAudio.setEnabled(!state.enabled);
          }}
        >
          {state.enabled ? "เปิดเสียงทั้งหมด" : "ปิดเสียงทั้งหมด"}
        </button>
        <VolumeSlider
          label="ระดับเสียงเพลง BGM"
          value={state.bgmVolume}
          onChange={(v) => muteluAudio.setVolume("bgmVolume", v)}
        />
        <VolumeSlider
          label="ระดับเสียง Pop SFX"
          value={state.sfxVolume}
          onChange={(v) => muteluAudio.setVolume("sfxVolume", v)}
        />
      </div>
    </div>
  );
}

function VolumeSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="mt-5 block text-muted">
      <span className="flex justify-between">
        <span>{label}</span>
        <span className="text-gold">{value}%</span>
      </span>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        aria-label={label}
        aria-valuenow={value}
        className="mt-2 min-h-11 w-full accent-gold"
        onPointerDown={() => {
          muteluAudio.start();
          muteluAudio.pop();
        }}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
