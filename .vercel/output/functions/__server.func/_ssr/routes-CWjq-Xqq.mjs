import { i as __toESM } from "../_runtime.mjs";
import { R as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ChevronDown, C as Github, D as Compass, E as Crosshair, M as Building2, N as BookOpen, O as CodeXml, S as GraduationCap, T as ExternalLink, _ as MapPinCheck, a as TrainFront, b as Landmark, c as Settings2, d as Play, f as PenLine, g as MapPin, h as Map, j as Calculator, k as CircleCheck, l as ScrollText, m as Menu, n as WandSparkles, o as Sparkles, p as MousePointerClick, r as Volume2, s as ShieldAlert, t as X, u as Route, v as ListTree, w as Facebook, x as Instagram, y as Lightbulb } from "../_libs/lucide-react.mjs";
import { a as FEATURES, c as gameBoardHref, i as CREDITS, o as RULES, r as CREATORS, s as WATS } from "./router-BJkyXjvM.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CWjq-Xqq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "bkk9-audio";
var DEFAULT_STATE = {
	enabled: true,
	bgmVolume: 100,
	sfxVolume: 100
};
var BGM_GAIN = 1.15;
var SFX_GAIN = 1.35;
var MAX_SAFE = 1;
function clamp(n) {
	return Math.min(1, Math.max(0, n || 0));
}
function loadState() {
	try {
		const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
		if (!saved) return { ...DEFAULT_STATE };
		return {
			enabled: saved.enabled !== false,
			bgmVolume: Number.isFinite(saved.bgmVolume) ? Number(saved.bgmVolume) : 100,
			sfxVolume: Number.isFinite(saved.sfxVolume) ? Number(saved.sfxVolume) : 100
		};
	} catch {
		return { ...DEFAULT_STATE };
	}
}
var MuteluAudio = class {
	state = { ...DEFAULT_STATE };
	ctx = null;
	master = null;
	bgm = null;
	sfx = null;
	scheduler = null;
	nextNote = 0;
	noteIndex = 0;
	started = false;
	listeners = /* @__PURE__ */ new Set();
	constructor() {
		if (typeof window !== "undefined") this.state = loadState();
	}
	subscribe(fn) {
		this.listeners.add(fn);
		return () => {
			this.listeners.delete(fn);
		};
	}
	emit() {
		this.listeners.forEach((fn) => fn());
	}
	persist() {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
		} catch {}
	}
	ramp(gain, value) {
		if (!gain || !this.ctx) return;
		gain.gain.cancelScheduledValues(this.ctx.currentTime);
		gain.gain.setTargetAtTime(clamp(value), this.ctx.currentTime, .035);
	}
	applyGains() {
		this.ramp(this.master, this.state.enabled ? 1 : 0);
		this.ramp(this.bgm, Math.min(MAX_SAFE, this.state.bgmVolume / 100 * BGM_GAIN));
		this.ramp(this.sfx, Math.min(MAX_SAFE, this.state.sfxVolume / 100 * SFX_GAIN));
	}
	makeTone(frequency, time, duration, type, level) {
		if (!this.ctx || !this.bgm) return;
		const osc = this.ctx.createOscillator();
		const gain = this.ctx.createGain();
		const filter = this.ctx.createBiquadFilter();
		osc.type = type;
		osc.frequency.setValueAtTime(frequency, time);
		osc.detune.value = -3 + this.noteIndex % 7;
		filter.type = "lowpass";
		filter.frequency.value = 1450;
		gain.gain.setValueAtTime(1e-4, time);
		gain.gain.linearRampToValueAtTime(level, time + .12);
		gain.gain.setTargetAtTime(1e-4, time + duration - .28, .22);
		osc.connect(filter).connect(gain).connect(this.bgm);
		osc.start(time);
		osc.stop(time + duration + .1);
	}
	schedule() {
		if (!this.ctx || !this.started || document.hidden) return;
		const progression = [
			[
				130.81,
				164.81,
				196,
				246.94
			],
			[
				98,
				123.47,
				146.83,
				196
			],
			[
				110,
				146.83,
				164.81,
				220
			],
			[
				146.83,
				174.61,
				196,
				261.63
			]
		];
		while (this.nextNote < this.ctx.currentTime + 1.6) {
			const chord = progression[this.noteIndex % progression.length];
			chord.forEach((n, i) => this.makeTone(n, this.nextNote + i * .02, 2.35, i % 2 ? "sine" : "triangle", .09));
			this.makeTone(chord[0] / 2, this.nextNote, 2.5, "sine", .07);
			if (this.noteIndex % 2 === 0) this.makeTone(chord[2] * 2, this.nextNote + .9, 1.4, "sine", .045);
			this.noteIndex += 1;
			this.nextNote += 1.7;
		}
	}
	start() {
		if (typeof window === "undefined") return false;
		const Ctor = window.AudioContext || window.webkitAudioContext;
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
		} catch {}
		const boot = () => {
			this.started = true;
			this.applyGains();
			if (this.scheduler == null) {
				this.nextNote = this.ctx ? this.ctx.currentTime + .05 : 0;
				this.scheduler = window.setInterval(() => this.schedule(), 180);
				this.schedule();
			}
		};
		if (this.ctx.state === "suspended") this.ctx.resume().then(boot);
		else boot();
		return true;
	}
	firePop() {
		if (!this.ctx || !this.state.enabled || !this.sfx) return;
		const now = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const gain = this.ctx.createGain();
		const filter = this.ctx.createBiquadFilter();
		osc.type = "triangle";
		osc.frequency.setValueAtTime(1760, now);
		osc.frequency.exponentialRampToValueAtTime(720, now + .1);
		filter.type = "lowpass";
		filter.frequency.setValueAtTime(4200, now);
		gain.gain.setValueAtTime(1e-4, now);
		gain.gain.linearRampToValueAtTime(.42, now + .006);
		gain.gain.exponentialRampToValueAtTime(1e-4, now + .16);
		osc.connect(filter).connect(gain).connect(this.sfx);
		osc.start(now);
		osc.stop(now + .18);
		const click = this.ctx.createOscillator();
		const clickGain = this.ctx.createGain();
		click.type = "sine";
		click.frequency.value = 1320;
		clickGain.gain.setValueAtTime(.22, now);
		clickGain.gain.exponentialRampToValueAtTime(1e-4, now + .05);
		click.connect(clickGain).connect(this.sfx);
		click.start(now);
		click.stop(now + .06);
	}
	pop() {
		if (!this.ctx || !this.state.enabled) return;
		if (this.ctx.state === "suspended") {
			this.ctx.resume().then(() => this.firePop());
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
			gain.gain.setValueAtTime(1e-4, now);
			gain.gain.linearRampToValueAtTime(.09, now + .01);
			gain.gain.exponentialRampToValueAtTime(1e-4, now + .07);
			osc.connect(gain).connect(this.sfx);
			osc.start(now);
			osc.stop(now + .08);
		};
		if (this.ctx.state === "suspended") {
			this.ctx.resume().then(fire);
			return;
		}
		fire();
	}
	setEnabled(enabled) {
		this.state.enabled = enabled;
		this.applyGains();
		this.persist();
		this.emit();
	}
	setVolume(key, value) {
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
			this.ctx?.resume();
			if (this.scheduler == null) this.scheduler = window.setInterval(() => this.schedule(), 180);
		}
	}
};
var muteluAudio = new MuteluAudio();
function AudioSettingsModal({ open, onClose }) {
	const titleId = (0, import_react.useId)();
	const [state, setState] = (0, import_react.useState)(muteluAudio.state);
	(0, import_react.useEffect)(() => muteluAudio.subscribe(() => setState({ ...muteluAudio.state })), []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		muteluAudio.start();
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[70] flex items-center justify-center bg-black/78 p-4 backdrop-blur-[10px]",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": titleId,
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[90dvh] w-full max-w-[480px] overflow-y-auto rounded-3xl border border-gold/65 p-6 shadow-[0_0_35px_rgba(255,189,58,0.18),0_24px_70px_rgba(0,0,0,0.5)]",
			style: { background: "linear-gradient(145deg, #172b4d, #101b35)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: titleId,
						className: "text-xl font-semibold text-white",
						children: "การตั้งค่าระบบเสียง (Sound Settings)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 min-w-11 rounded-xl p-2 text-muted transition hover:bg-white/10",
						"aria-label": "ปิดการตั้งค่าระบบเสียง",
						onClick: onClose,
						children: "✕"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-neon-soft",
					"aria-live": "polite",
					children: state.enabled ? "เสียงเปิดอยู่" : "เสียงปิดอยู่"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "switch",
					"aria-checked": state.enabled,
					className: "mt-5 flex min-h-11 w-full items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left text-white transition hover:bg-white/10",
					onClick: () => {
						muteluAudio.pop();
						muteluAudio.setEnabled(!state.enabled);
					},
					children: state.enabled ? "เปิดเสียงทั้งหมด" : "ปิดเสียงทั้งหมด"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeSlider, {
					label: "ระดับเสียงเพลง BGM",
					value: state.bgmVolume,
					onChange: (v) => muteluAudio.setVolume("bgmVolume", v)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeSlider, {
					label: "ระดับเสียง Pop SFX",
					value: state.sfxVolume,
					onChange: (v) => muteluAudio.setVolume("sfxVolume", v)
				})
			]
		})
	});
}
function VolumeSlider({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mt-5 block text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-gold",
				children: [value, "%"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min: 0,
			max: 100,
			step: 1,
			value,
			"aria-label": label,
			"aria-valuenow": value,
			className: "mt-2 min-h-11 w-full accent-gold",
			onPointerDown: () => {
				muteluAudio.start();
				muteluAudio.pop();
			},
			onChange: (e) => onChange(Number(e.target.value))
		})]
	});
}
function Fireflies() {
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const host = canvas?.parentElement;
		if (!canvas || !host) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
		const fireflies = [];
		let width = 0;
		let height = 0;
		let frameId = 0;
		let lastTime = 0;
		let running = false;
		let seed = 918273;
		const random = () => {
			seed = (seed * 1664525 + 1013904223) % 4294967296;
			return seed / 4294967296;
		};
		const resize = () => {
			const rect = host.getBoundingClientRect();
			width = Math.max(0, rect.width);
			height = Math.max(0, rect.height);
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		const seedFireflies = () => {
			fireflies.length = 0;
			for (let i = 0; i < 32; i++) fireflies.push({
				x: random(),
				y: random(),
				radius: 1 + random() * 3,
				drift: 7e-4 + random() * .0012,
				sway: 5 + random() * 13,
				phase: random() * Math.PI * 2,
				pulse: 1.1 + random() * 1.8,
				hue: random() < .5 ? "255,215,0" : "173,255,47"
			});
		};
		const draw = (time) => {
			if (!running || document.hidden || reduceMotion.matches || width <= 0) return;
			const dt = Math.min((time - lastTime) / 1e3 || 0, .05);
			lastTime = time;
			ctx.clearRect(0, 0, width, height);
			fireflies.forEach((f) => {
				f.y -= f.drift * dt * 60;
				if (f.y < -.03) f.y = 1.03;
				const x = f.x * width + Math.sin(time / 1e3 * .32 + f.phase) * f.sway;
				const y = f.y * height;
				const alpha = .24 + .3 * ((Math.sin(time / 1e3 * f.pulse + f.phase) + 1) / 2);
				const glow = ctx.createRadialGradient(x, y, 0, x, y, f.radius * 7);
				glow.addColorStop(0, `rgba(${f.hue},${alpha})`);
				glow.addColorStop(.28, `rgba(${f.hue},${alpha * .45})`);
				glow.addColorStop(1, `rgba(${f.hue},0)`);
				ctx.fillStyle = glow;
				ctx.beginPath();
				ctx.arc(x, y, f.radius * 7, 0, Math.PI * 2);
				ctx.fill();
				ctx.fillStyle = `rgba(255,255,220,${Math.min(.9, alpha + .25)})`;
				ctx.beginPath();
				ctx.arc(x, y, f.radius, 0, Math.PI * 2);
				ctx.fill();
			});
			frameId = requestAnimationFrame(draw);
		};
		const stop = () => {
			running = false;
			cancelAnimationFrame(frameId);
			frameId = 0;
		};
		const start = () => {
			if (running || document.hidden || reduceMotion.matches || width <= 0) return;
			running = true;
			lastTime = performance.now();
			frameId = requestAnimationFrame(draw);
		};
		resize();
		seedFireflies();
		const observer = new ResizeObserver(resize);
		observer.observe(host);
		const onVis = () => document.hidden ? stop() : start();
		const onMotion = () => reduceMotion.matches ? stop() : start();
		document.addEventListener("visibilitychange", onVis);
		reduceMotion.addEventListener("change", onMotion);
		if (!reduceMotion.matches) start();
		return () => {
			stop();
			observer.disconnect();
			document.removeEventListener("visibilitychange", onVis);
			reduceMotion.removeEventListener("change", onMotion);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		"aria-hidden": "true",
		className: "pointer-events-none absolute inset-0 z-0 block h-full w-full"
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var NAV = [
	{
		href: "#about",
		label: "เกี่ยวกับเกม"
	},
	{
		href: "#rules",
		label: "วิธีเล่น"
	},
	{
		href: "#creators",
		label: "ผู้พัฒนา"
	}
];
function ping() {
	muteluAudio.start();
	muteluAudio.pop();
}
function hoverTick() {
	muteluAudio.start();
	muteluAudio.hover();
}
var DEFAULT_BOARD = gameBoardHref({
	setup: true,
	mode: "pass",
	board: "5"
});
function openBoard(href) {
	return (event) => {
		ping();
		event.preventDefault();
		window.location.assign(href);
	};
}
function LandingPage() {
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [audioOpen, setAudioOpen] = (0, import_react.useState)(false);
	const [watsOpen, setWatsOpen] = (0, import_react.useState)(false);
	const [rulesOpen, setRulesOpen] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)("#top");
	const [progress, setProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const activate = () => muteluAudio.start();
		document.addEventListener("pointerdown", activate, { once: true });
		document.addEventListener("keydown", activate, { once: true });
		const onVis = () => muteluAudio.handleVisibility();
		document.addEventListener("visibilitychange", onVis);
		return () => {
			document.removeEventListener("pointerdown", activate);
			document.removeEventListener("keydown", activate);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const ids = [
			"top",
			"about",
			"rules",
			"modes",
			"creators",
			"credits"
		];
		const onScroll = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
			let current = "#top";
			for (const id of ids) {
				const el = document.getElementById(id);
				if (el && el.getBoundingClientRect().top <= 120) current = `#${id}`;
			}
			setActive(current);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.classList.toggle("overflow-hidden", watsOpen || rulesOpen || audioOpen);
	}, [
		watsOpen,
		rulesOpen,
		audioOpen
	]);
	const closeMenu = () => setMenuOpen(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "#top",
			className: "skip-link",
			children: "ข้ามไปยังเนื้อหา"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gold",
			style: { transform: `scaleX(${progress})` },
			"aria-hidden": "true"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-50 border-b border-white/10 bg-[rgba(15,23,42,0.85)] backdrop-blur-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8",
				"aria-label": "เมนูหลัก",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						id: "menu-toggle",
						type: "button",
						className: "order-first min-h-11 min-w-11 rounded-xl border border-white/15 p-2 text-white md:hidden",
						"aria-label": menuOpen ? "ปิดเมนู" : "เปิดเมนู",
						"aria-expanded": menuOpen,
						onClick: () => {
							ping();
							setMenuOpen((v) => !v);
						},
						children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#top",
						className: "flex items-center gap-3 rounded-lg",
						onMouseEnter: hoverTick,
						onClick: ping,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-[#21164a] shadow-lg shadow-gold/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "block text-lg font-bold tracking-wide text-white",
								children: "JeMC (เจมซี)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-gold",
								children: "Mutelu ศึกพิกัดสายมู"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden items-center gap-6 text-sm text-muted md:flex",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: item.href,
							onMouseEnter: hoverTick,
							onClick: ping,
							className: cn("transition hover:text-gold", active === item.href && "text-gold"),
							children: item.label
						}, item.href))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: DEFAULT_BOARD,
						onMouseEnter: hoverTick,
						onClick: openBoard(DEFAULT_BOARD),
						className: "hidden min-h-11 items-center rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-[#21164a] shadow-[0_0_24px_rgba(255,189,58,0.18)] transition hover:-translate-y-0.5 hover:bg-gold-soft md:inline-flex",
						children: "เริ่มเล่นเกม"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 min-w-11 rounded-xl border border-gold/35 p-2 text-gold-soft transition hover:bg-white/10",
						"aria-label": "เปิดการตั้งค่าระบบเสียง",
						title: "การตั้งค่าระบบเสียง",
						onClick: () => {
							ping();
							setAudioOpen(true);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "mx-auto h-5 w-5" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "mobile-menu",
				hidden: !menuOpen,
				className: "border-t border-white/10 px-5 pb-5 pt-3 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						onClick: () => {
							ping();
							closeMenu();
						},
						className: "min-h-11 rounded-lg px-3 py-2 text-muted hover:bg-white/10",
						children: item.label
					}, item.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: DEFAULT_BOARD,
						onClick: openBoard(DEFAULT_BOARD),
						className: "mt-2 min-h-11 rounded-xl bg-gold px-4 py-2.5 text-center font-semibold text-[#21164a]",
						children: "เริ่มเล่นเกม"
					})]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			id: "top",
			className: "flex w-full flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rules, { onOpen: () => setRulesOpen(true) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, { onOpenWats: () => setWatsOpen(true) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modes, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Creators, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Credits, {})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
			className: "border-t border-white/10 bg-ink-deep",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 font-bold text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "h-5 w-5 text-gold" }), "JeMC (เจมซี)"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm leading-6 text-muted/65",
					children: "2026 @JeMC (เจมซี) เด็กนักเรียนโครงการห้องเรียนพิเศษ (SMTE) โรงเรียนศึกษานารี"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://instagram.com/chutwou",
							target: "_blank",
							rel: "noopener noreferrer",
							"aria-label": "Instagram ของทีม JeMC",
							onMouseEnter: hoverTick,
							onClick: ping,
							className: "rounded-lg border border-white/10 p-2 text-muted transition hover:border-gold hover:text-gold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#creators",
							"aria-label": "โปรไฟล์ผู้พัฒนา",
							onMouseEnter: hoverTick,
							onClick: ping,
							className: "rounded-lg border border-white/10 p-2 text-muted transition hover:border-gold hover:text-gold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#creators",
							"aria-label": "ทีมผู้สร้าง JeMC",
							onMouseEnter: hoverTick,
							onClick: ping,
							className: "rounded-lg border border-white/10 p-2 text-muted transition hover:border-gold hover:text-gold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "h-4 w-4" })
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open: watsOpen,
			onClose: () => setWatsOpen(false),
			title: "14 พิกัดวัดในเกม",
			subtitle: "แตะชื่อวัดเพื่อดูรูป จังหวัด และจุดเด่น",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatDirectory, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "border-t border-white/10 px-5 py-4 text-sm text-gold-soft",
				children: [
					"บนกระดานมีวัด 14 แห่งทั่วไทย — เป้าหมายร่วมคือเช็คอินให้ครบ ",
					9,
					" วัด ผู้ที่เช็คอินได้มากที่สุดเป็นผู้ชนะ"
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: rulesOpen,
			onClose: () => setRulesOpen(false),
			title: "กติกาแบบละเอียด",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 p-6 text-muted/85",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-gold",
						children: "Turn Flow:"
					}), " จั่วการ์ด → อ่านเวกเตอร์ → คำนวณพิกัดใหม่ → เคลื่อนหมาก → ตรวจจุดหมายและอุปสรรค"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-neon",
						children: "แกน x/y:"
					}), " ค่า x คือการเคลื่อนแนวนอน และค่า y คือการเคลื่อนแนวตั้ง โดยบวกหรือลบตามทิศของเวกเตอร์"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-gold",
						children: "พิกัดวัด:"
					}), " มีวัดศักดิ์สิทธิ์ 14 จุดทั่วไทยบนกระดาน Cartesian Grid เริ่มต้นทุกคนที่จุดศูนย์กลาง (0,0)"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-neon",
							children: "เงื่อนไขการชนะ:"
						}),
						" เมื่อผู้เล่นเช็คอินรวมกันครบ",
						" ",
						9,
						" วัด ผู้เช็คอินได้มากที่สุดเป็นผู้ชนะ"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-gold",
						children: "อุปสรรค:"
					}), " หลบกรวยส้มจราจร สภาพน้ำท่วม และใช้การ์ดพิเศษเพื่อพลิกเกมหรือป่วนคู่แข่ง"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl border border-gold/20 bg-gold/10 p-4 text-sm leading-6 text-gold-soft",
						children: "กติกานี้เป็นพรีวิวเพื่อการเรียนรู้และสามารถปรับเปลี่ยนให้เหมาะกับกิจกรรมในชั้นเรียนหรือเวอร์ชันเกมได้"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioSettingsModal, {
			open: audioOpen,
			onClose: () => setAudioOpen(false)
		})
	] });
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate order-1 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-pattern absolute inset-0 opacity-60" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "thai-diamond absolute -right-16 top-12 h-64 w-64 rotate-12 opacity-30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm text-gold-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), "Mutelu : ศึกพิกัดสายมู"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "max-w-3xl text-4xl font-bold leading-[1.25] tracking-tight text-white sm:text-5xl lg:text-6xl",
						children: "มูเตลูพิชิต 9 วัด ทั่วไทย ด้วยพลังแห่งเวกเตอร์"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-2xl text-lg leading-8 text-muted/85",
						children: "บอร์ดเกมคณิตศาสตร์เชิงผจญภัยบน Cartesian Grid ที่เปลี่ยนการคำนวณเวกเตอร์ให้กลายเป็นเส้นทางตามล่าพิกัดสายบุญทั่วไทย"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: DEFAULT_BOARD,
							onMouseEnter: hoverTick,
							onClick: openBoard(DEFAULT_BOARD),
							className: "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 font-semibold text-[#21164a] shadow-xl shadow-gold/15 transition hover:-translate-y-1 hover:bg-gold-soft active:scale-[0.96]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5 fill-current" }), "เริ่มเล่นเกม (Play Now)"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#rules",
							onMouseEnter: hoverTick,
							onClick: ping,
							className: "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 font-medium text-white transition hover:border-neon/70 hover:bg-white/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5" }), "คู่มือการเล่น (How to Play)"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex items-center gap-5 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-pulse rounded-full bg-neon" }), "Vector-powered journey"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-5 w-px bg-white/20" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Thai learning game" })
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: "140ms",
					className: "relative mx-auto w-full max-w-xl lg:justify-self-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardPreview, {})
				})]
			})
		]
	});
}
function BoardPreview() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto w-full max-w-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-5 rounded-[2rem] bg-purple-bright/20 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-panel relative overflow-hidden rounded-[2rem] p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "h-4 w-4 text-neon" }), " BKK Vector Board"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-gold px-3 py-1 text-xs font-semibold text-[#21164a]",
						children: "TURN 01"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-square overflow-hidden rounded-2xl border border-white/15 bg-[#17142e] grid-pattern",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-1/2 h-px bg-gold/60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 left-1/2 w-px bg-gold/60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute right-3 top-[52%] text-xs text-gold-soft",
							children: "x+"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-[52%] top-3 text-xs text-gold-soft",
							children: "y+"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-[47%] top-[53%] flex h-7 w-7 items-center justify-center rounded-full border-2 border-neon bg-ink text-xs font-bold text-neon",
							children: "0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute left-[69%] top-[25%] flex flex-col items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-8 w-8 items-center justify-center rounded-full bg-gold text-[#21164a] shadow-lg shadow-gold/30",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-[#21164a]/90 px-1.5 py-0.5 text-[10px] text-gold-soft",
								children: "วัด 09"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute left-[27%] top-[67%] flex flex-col items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-7 w-7 items-center justify-center rounded-full bg-neon text-ink",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-[#21164a]/90 px-1.5 py-0.5 text-[10px] text-neon-soft",
								children: "วัด 04"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[61%] top-[57%] h-3 w-3 rounded-full bg-danger ring-4 ring-danger/20" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							className: "absolute inset-0 h-full w-full",
							viewBox: "0 0 400 400",
							"aria-hidden": "true",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M200 200 C238 178, 244 132, 285 105",
								fill: "none",
								stroke: "#45f2c5",
								strokeWidth: "4",
								strokeDasharray: "7 7"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
								points: "288,100 275,103 283,113",
								fill: "#45f2c5"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-4 left-4 rounded-xl border border-white/15 bg-[#2b2157]/95 px-3 py-2 shadow-xl motion-safe:animate-float",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainFront, { className: "h-4 w-4 text-gold" }), " Vector Card"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-base font-bold text-white",
								children: ["BTS ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-neon",
									children: "(+3, +2)"
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-3 gap-3 text-center text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-white/5 p-2 text-muted",
							children: [
								"พิกัด",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-white",
									children: "(3, 2)"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-white/5 p-2 text-muted",
							children: [
								"แต้มบุญ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-gold",
									children: "120"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-white/5 p-2 text-muted",
							children: [
								"เป้าหมาย",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-neon",
									children: "9 วัด"
								})
							]
						})
					]
				})
			]
		})]
	});
}
function About({ onOpenWats }) {
	const icons = {
		"graduation-cap": GraduationCap,
		route: Route,
		"building-2": Building2,
		"mouse-pointer-click": MousePointerClick
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "relative order-3 scroll-mt-20 border-y border-white/10 bg-[#110e20]/70 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto w-full max-w-7xl px-5 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-[1.12fr_.88fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "glass-panel rounded-3xl p-7 sm:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold uppercase tracking-[.18em] text-neon",
							children: "ABOUT THE GAME"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl",
							children: "คณิตศาสตร์บนกระดานที่พาคุณเดินทางบูชาวัดทั่วประเทศไทย"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-2xl text-lg leading-8 text-muted/80",
							children: "Mutelu ศึกพิกัดสายมู คือการพาผู้เล่นไปผจญภัยบนกระดานพิกัดฉาก Cartesian Grid ให้ผู้เล่นศึกษาแนวคิดการเดินด้วยเวกเตอร์ วางแผนเช็คอินวัดสายมู 14 แห่งทั่วประเทศไทยเพื่อแข่งขันเก็บแต้มบุญอย่างสนุกและมีความหมาย"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gold-line my-8 h-px w-full" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-sm font-medium text-gold-soft",
									children: "14 พิกัดวัด"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full border border-neon/25 bg-neon/10 px-4 py-2 text-sm font-medium text-neon-soft",
									children: "4 ขั้นตอน"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-muted",
									children: "1 กระดานเวกเตอร์"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								ping();
								onOpenWats();
							},
							onMouseEnter: hoverTick,
							className: "mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-gold/40 px-5 py-3 font-medium text-gold-soft transition hover:bg-gold hover:text-[#21164a] active:scale-[0.96]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTree, { className: "h-5 w-5" }), "ดูรายชื่อวัด 14 พิกัด"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-1",
					children: FEATURES.map((f) => {
						const Icon = icons[f.icon];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: cn("rounded-2xl border border-white/10 bg-white/[.045] p-5 transition hover:-translate-y-1", f.hover === "gold" ? "hover:border-gold/35" : "hover:border-neon/35"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("mb-4 h-7 w-7", f.hover === "gold" ? "text-gold" : "text-neon") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-semibold text-white",
									children: f.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-6 text-muted/75",
									children: f.text
								})
							]
						}, f.id);
					})
				})]
			})
		})
	});
}
function Rules({ onOpen }) {
	const icons = {
		crosshair: Crosshair,
		calculator: Calculator,
		"map-pin-check": MapPinCheck,
		"shield-alert": ShieldAlert
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "rules",
		className: "order-2 scroll-mt-20 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-7xl px-5 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold uppercase tracking-[.18em] text-gold",
							children: "HOW TO PLAY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl font-bold text-white sm:text-4xl",
							children: "วิธีเล่นใน 4 ขั้นตอน"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-lg leading-8 text-muted/75",
							children: "ใช้เวกเตอร์เป็นเข็มทิศ คิดอย่างเป็นระบบ แล้วออกเดินทางเก็บแต้มบุญไปพร้อมกัน"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-5 md:grid-cols-2",
					children: RULES.map((rule) => {
						const Icon = icons[rule.icon];
						const gold = rule.tone === "gold";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-3xl border border-white/10 bg-[#241b45]/70 p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-bold text-[#21164a]", gold ? "bg-gold" : "bg-neon"),
										children: rule.n
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("ml-auto h-6 w-6", gold ? "text-gold" : "text-neon") })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-6 text-xl font-semibold text-white",
									children: rule.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 leading-7 text-muted/75",
									children: rule.text
								})
							]
						}, rule.n);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						ping();
						onOpen();
					},
					onMouseEnter: hoverTick,
					className: "mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-medium text-white transition hover:bg-white/15 active:scale-[0.96]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "h-5 w-5 text-gold" }), "กติกาแบบละเอียด"]
				})
			]
		})
	});
}
function Modes() {
	const [mode, setMode] = (0, import_react.useState)("pass");
	const [board, setBoard] = (0, import_react.useState)("compact");
	const [difficulty, setDifficulty] = (0, import_react.useState)("Beginner");
	const summary = [
		mode === "pass" ? "Pass & Play" : "Single Player vs AI",
		board === "standard" ? "Standard Board" : "Compact Board",
		difficulty
	].join(" · ");
	const playHref = gameBoardHref({
		setup: true,
		mode,
		board: board === "standard" ? "8" : "5",
		difficulty: difficulty === "Beginner" ? "easy" : difficulty === "Explorer" ? "medium" : "hard"
	});
	const boardHref = gameBoardHref({
		setup: true,
		mode,
		board: board === "standard" ? "8" : "5",
		difficulty: difficulty === "Beginner" ? "easy" : difficulty === "Explorer" ? "medium" : "hard"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "modes",
		className: "order-4 scroll-mt-20 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-7xl px-5 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-9 flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold uppercase tracking-[.18em] text-neon",
					children: "GAME MODES & SETTINGS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-3xl font-bold text-white sm:text-4xl",
					children: "เตรียมกระดานของคุณ"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold-soft",
					children: "Preview"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-panel grid gap-8 rounded-3xl p-6 lg:grid-cols-[1fr_.82fr] lg:p-9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "leading-7 text-muted/75",
						children: "เลือกค่าเริ่มต้นสำหรับรอบถัดไปได้เลย นี่คือ UI พรีวิวที่เตรียมไว้สำหรับระบบเกม"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "mt-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "mb-3 font-semibold text-white",
							children: "จำนวนผู้เล่น"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							role: "radiogroup",
							"aria-label": "เลือกโหมดผู้เล่น",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								pressed: mode === "pass",
								title: "Pass & Play",
								hint: "เล่นผลัดกันบนเครื่องเดียว",
								onClick: () => setMode("pass")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								pressed: mode === "ai",
								title: "Single Player vs AI",
								hint: "วางแผนแข่งกับ AI",
								onClick: () => setMode("ai")
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 grid gap-6 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "mb-3 font-semibold text-white",
							children: "ขนาดกระดาน"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							role: "radiogroup",
							"aria-label": "เลือกขนาดกระดาน",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								compact: true,
								pressed: board === "standard",
								title: "Standard",
								onClick: () => setBoard("standard")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								compact: true,
								pressed: board === "compact",
								title: "Compact",
								onClick: () => setBoard("compact")
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "mb-3 font-semibold text-white",
							children: "ระดับความยาก"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-2",
							role: "radiogroup",
							"aria-label": "เลือกระดับความยาก",
							children: [
								"Beginner",
								"Explorer",
								"Mystic"
							].map((level) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
								compact: true,
								pressed: difficulty === level,
								title: level,
								onClick: () => setDifficulty(level)
							}, level))
						})] })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-2xl border border-neon/20 bg-[#0e172a]/70 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-neon",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Quick Setup Summary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 rounded-xl border border-white/10 bg-white/5 p-4 leading-7 text-muted",
							"aria-live": "polite",
							children: summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-6 text-muted/75",
							children: "การตั้งค่านี้ใช้เป็นตัวอย่างก่อนเข้าสู่หน้าเกมจริง สามารถเลือกใหม่ได้ทุกเมื่อ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: playHref,
							onMouseEnter: hoverTick,
							onClick: openBoard(playHref),
							className: "mt-7 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3.5 font-semibold text-[#21164a] transition hover:bg-gold-soft active:scale-[0.96]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-5 w-5" }), "เริ่มเซ็ตอัป"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: boardHref,
							onMouseEnter: hoverTick,
							onClick: openBoard(boardHref),
							className: "mt-4 block text-center text-sm text-neon-soft underline decoration-neon/50 underline-offset-4 hover:text-white",
							children: "ไปยังกระดานเกม"
						})
					]
				})]
			})]
		})
	});
}
function Choice({ pressed, title, hint, onClick, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"aria-pressed": pressed,
		onClick: () => {
			ping();
			onClick();
		},
		onMouseEnter: hoverTick,
		className: cn("min-h-11 rounded-xl border text-left transition", compact ? "flex-1 px-3 py-3 text-sm font-medium" : "p-4", pressed ? "border-gold bg-gold text-[#21164a] shadow-[0_0_0_3px_rgba(255,189,58,0.16)]" : "border-white/15 bg-white/5 text-muted hover:border-gold/50"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: cn("h-5 w-5 shrink-0 transition", pressed ? "scale-100 opacity-100" : "scale-75 opacity-0") })]
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block text-sm opacity-75",
			children: hint
		}) : null]
	});
}
function Creators() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "creators",
		className: "relative isolate order-5 scroll-mt-20 overflow-hidden border-t border-white/10 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fireflies, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-[1] mx-auto w-full max-w-7xl px-5 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "mx-auto max-w-3xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold uppercase tracking-[.18em] text-gold",
						children: "CREATORS PROFILE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl",
						children: "ทีมผู้พัฒนา (Creators Profile)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg leading-8 text-muted/75",
						children: "JeMC (เจมซี) ทีมผู้สร้าง Mutelu ศึกพิกัดสายมู"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3",
				children: CREATORS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "glass-panel rounded-3xl border border-gold/20 p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-gold/55 focus-within:-translate-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.photo,
							alt: c.alt,
							width: 128,
							height: 128,
							loading: "lazy",
							className: "mx-auto h-32 w-32 rounded-full border-4 border-gold/60 object-cover shadow-lg shadow-gold/10"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 text-xl font-semibold text-white",
							children: c.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 min-h-[3.5rem] text-sm leading-6 text-gold-soft",
							children: c.quote
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `https://instagram.com/${c.instagram}`,
							target: "_blank",
							rel: "noopener noreferrer",
							onMouseEnter: hoverTick,
							onClick: ping,
							className: "mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-sm text-neon-soft transition hover:bg-white/10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-5 w-5" }),
								"@",
								c.instagram
							]
						})
					]
				}, c.instagram))
			})]
		})]
	});
}
function Credits() {
	const icons = {
		"code-2": CodeXml,
		"pen-line": PenLine,
		lightbulb: Lightbulb
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "credits",
		className: "order-6 scroll-mt-20 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-7xl px-5 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold uppercase tracking-[.18em] text-gold",
						children: "DEVELOPER & CREDITS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-3xl font-bold text-white sm:text-4xl",
						children: "พัฒนาด้วยใจ เพื่อการเรียนรู้ที่อยากชวนให้เล่น"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg leading-8 text-muted/75",
						children: "โครงการ Edutainment ที่เชื่อมคณิตศาสตร์ เวกเตอร์ และบริบทกรุงเทพฯ เข้ากับเกม เพื่อเปิดพื้นที่ให้การเรียนรู้สนุกขึ้น"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-5 md:grid-cols-3",
				children: CREDITS.map((c) => {
					const Icon = icons[c.icon];
					const gold = c.tone === "gold";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-white/10 bg-white/[.045] p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("flex h-12 w-12 items-center justify-center rounded-xl", gold ? "bg-gold/15 text-gold" : "bg-neon/15 text-neon"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 text-xl font-semibold text-white",
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 leading-7 text-muted/70",
								children: c.text
							})
						]
					}, c.title);
				})
			})]
		})
	});
}
function Reveal({ children, className, delay }) {
	const ref = (0, import_react.useRef)(null);
	const [show, setShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setShow(true);
		}, { threshold: .12 });
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn("transition-[opacity,transform,filter] duration-500 ease-out", show ? "translate-y-0 opacity-100 blur-0" : "translate-y-4 opacity-0 blur-[4px]", className),
		style: delay ? { transitionDelay: delay } : void 0,
		children
	});
}
function WatDirectory() {
	const [openName, setOpenName] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid max-h-[60vh] grid-cols-1 gap-2 overflow-y-auto p-5",
		children: WATS.map((wat, i) => {
			const expanded = openName === wat.name;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: cn("overflow-hidden rounded-xl bg-white/5 transition", expanded && "border border-gold/25 bg-white/[.07]"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-expanded": expanded,
					className: "flex min-h-11 w-full items-center justify-between gap-3 p-3 text-left text-muted",
					onClick: () => {
						ping();
						setOpenName(expanded ? null : wat.name);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-medium text-white/90",
						children: [
							String(i + 1).padStart(2, "0"),
							" · ",
							wat.name
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
						className: cn("h-4 w-4 shrink-0 text-gold-soft transition-transform duration-200", expanded && "rotate-180"),
						"aria-hidden": "true"
					})]
				}), expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 border-t border-white/10 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: wat.photo,
							alt: wat.alt,
							width: 1200,
							height: 800,
							className: "h-44 w-full rounded-lg object-cover sm:h-52"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1.5 text-sm font-medium text-gold-soft",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									className: "h-4 w-4",
									"aria-hidden": "true"
								}),
								"จังหวัด",
								wat.province
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-6 text-muted/90",
							children: wat.highlight
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-start gap-1.5 text-xs leading-5 text-muted/55",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
								className: "mt-0.5 h-3 w-3 shrink-0",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [wat.photoKind === "illustration" ? "ภาพประกอบ · อ้างอิง " : "แหล่งที่มาภาพ ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: wat.sourceUrl,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "underline decoration-white/25 underline-offset-2 transition hover:text-gold-soft hover:decoration-gold/60",
								children: wat.sourceLabel
							})] })]
						})
					]
				}) : null]
			}, wat.name);
		})
	});
}
function Dialog({ open, onClose, title, subtitle, children }) {
	const titleId = (0, import_react.useId)();
	const closeRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		closeRef.current?.focus();
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(8,5,18,0.78)] p-4 backdrop-blur-[7px]",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": titleId,
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-2xl rounded-3xl border border-white/15 bg-[#20183d] shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-white/10 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: titleId,
					className: "text-xl font-semibold text-white",
					children: title
				}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: subtitle
				}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					ref: closeRef,
					type: "button",
					className: "min-h-11 min-w-11 rounded-lg p-2 text-muted hover:bg-white/10",
					"aria-label": "ปิดหน้าต่าง",
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), children]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPage, {});
}
//#endregion
export { Home as component };
