const STORAGE_KEY = "bkk9-audio";

export type AudioState = {
  enabled: boolean;
  bgmVolume: number;
  sfxVolume: number;
};

const DEFAULT_STATE: AudioState = {
  enabled: true,
  bgmVolume: 100,
  sfxVolume: 100,
};

const BGM_GAIN = 1.15;
const SFX_GAIN = 1.35;
const MAX_SAFE = 1;

function clamp(n: number) {
  return Math.min(1, Math.max(0, n || 0));
}

function loadState(): AudioState {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as
      | Partial<AudioState>
      | null;
    if (!saved) return { ...DEFAULT_STATE };
    return {
      enabled: saved.enabled !== false,
      bgmVolume: Number.isFinite(saved.bgmVolume) ? Number(saved.bgmVolume) : 100,
      sfxVolume: Number.isFinite(saved.sfxVolume) ? Number(saved.sfxVolume) : 100,
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

class MuteluAudio {
  state: AudioState = { ...DEFAULT_STATE };
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private bgm: GainNode | null = null;
  private sfx: GainNode | null = null;
  private scheduler: number | null = null;
  private nextNote = 0;
  private noteIndex = 0;
  private started = false;
  private listeners = new Set<() => void>();

  constructor() {
    if (typeof window !== "undefined") this.state = loadState();
  }

  subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private emit() {
    this.listeners.forEach((fn) => fn());
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      /* ignore quota */
    }
  }

  private ramp(gain: GainNode | null, value: number) {
    if (!gain || !this.ctx) return;
    gain.gain.cancelScheduledValues(this.ctx.currentTime);
    gain.gain.setTargetAtTime(clamp(value), this.ctx.currentTime, 0.035);
  }

  private applyGains() {
    this.ramp(this.master, this.state.enabled ? 1 : 0);
    this.ramp(
      this.bgm,
      Math.min(MAX_SAFE, (this.state.bgmVolume / 100) * BGM_GAIN),
    );
    this.ramp(
      this.sfx,
      Math.min(MAX_SAFE, (this.state.sfxVolume / 100) * SFX_GAIN),
    );
  }

  private makeTone(
    frequency: number,
    time: number,
    duration: number,
    type: OscillatorType,
    level: number,
  ) {
    if (!this.ctx || !this.bgm) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, time);
    osc.detune.value = -3 + (this.noteIndex % 7);
    filter.type = "lowpass";
    filter.frequency.value = 1450;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(level, time + 0.12);
    gain.gain.setTargetAtTime(0.0001, time + duration - 0.28, 0.22);
    osc.connect(filter).connect(gain).connect(this.bgm);
    osc.start(time);
    osc.stop(time + duration + 0.1);
  }

  private schedule() {
    if (!this.ctx || !this.started || document.hidden) return;
    const progression = [
      [130.81, 164.81, 196, 246.94],
      [98, 123.47, 146.83, 196],
      [110, 146.83, 164.81, 220],
      [146.83, 174.61, 196, 261.63],
    ];
    while (this.nextNote < this.ctx.currentTime + 1.6) {
      const chord = progression[this.noteIndex % progression.length];
      chord.forEach((n, i) =>
        this.makeTone(
          n,
          this.nextNote + i * 0.02,
          2.35,
          i % 2 ? "sine" : "triangle",
          0.09,
        ),
      );
      this.makeTone(chord[0] / 2, this.nextNote, 2.5, "sine", 0.07);
      if (this.noteIndex % 2 === 0) {
        this.makeTone(chord[2] * 2, this.nextNote + 0.9, 1.4, "sine", 0.045);
      }
      this.noteIndex += 1;
      this.nextNote += 1.7;
    }
  }

  start() {
    if (typeof window === "undefined") return false;
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return false;
    if (!this.ctx) {
      try {
        this.ctx = new Ctor({ latencyHint: "interactive" });
      } catch {
        this.ctx = new Ctor();
      }
      this.master = this.ctx.createGain();
      this.bgm = this.ctx.createGain();
      this.sfx = this.ctx.createGain();
      this.bgm.connect(this.master);
      this.sfx.connect(this.master);
      this.master.connect(this.ctx.destination);
    }
    try {
      const src = this.ctx.createBufferSource();
      src.buffer = this.ctx.createBuffer(1, 1, this.ctx.sampleRate || 22050);
      src.connect(this.ctx.destination);
      src.start(0);
    } catch {
      /* unlock is best-effort */
    }
    const boot = () => {
      this.started = true;
      this.applyGains();
      if (this.scheduler == null) {
        this.nextNote = this.ctx ? this.ctx.currentTime + 0.05 : 0;
        this.scheduler = window.setInterval(() => this.schedule(), 180);
        this.schedule();
      }
    };
    if (this.ctx.state === "suspended") {
      void this.ctx.resume().then(boot);
    } else {
      boot();
    }
    return true;
  }

  private firePop() {
    if (!this.ctx || !this.state.enabled || !this.sfx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1760, now);
    osc.frequency.exponentialRampToValueAtTime(720, now + 0.1);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(4200, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.42, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    osc.connect(filter).connect(gain).connect(this.sfx);
    osc.start(now);
    osc.stop(now + 0.18);
    const click = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    click.type = "sine";
    click.frequency.value = 1320;
    clickGain.gain.setValueAtTime(0.22, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    click.connect(clickGain).connect(this.sfx);
    click.start(now);
    click.stop(now + 0.06);
  }

  pop() {
    if (!this.ctx || !this.state.enabled) return;
    if (this.ctx.state === "suspended") {
      void this.ctx.resume().then(() => this.firePop());
      return;
    }
    this.firePop();
  }

  hover() {
    if (!this.ctx || !this.state.enabled) return;
    const fire = () => {
      if (!this.ctx || !this.sfx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1680, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
      osc.connect(gain).connect(this.sfx);
      osc.start(now);
      osc.stop(now + 0.08);
    };
    if (this.ctx.state === "suspended") {
      void this.ctx.resume().then(fire);
      return;
    }
    fire();
  }

  setEnabled(enabled: boolean) {
    this.state.enabled = enabled;
    this.applyGains();
    this.persist();
    this.emit();
  }

  setVolume(key: "bgmVolume" | "sfxVolume", value: number) {
    this.state[key] = value;
    this.applyGains();
    this.persist();
    this.emit();
  }

  handleVisibility() {
    if (!this.started) return;
    if (document.hidden) {
      if (this.scheduler != null) {
        clearInterval(this.scheduler);
        this.scheduler = null;
      }
    } else {
      void this.ctx?.resume();
      if (this.scheduler == null) {
        this.scheduler = window.setInterval(() => this.schedule(), 180);
      }
    }
  }
}

export const muteluAudio = new MuteluAudio();
