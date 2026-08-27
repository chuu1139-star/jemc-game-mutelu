import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from "react";
import {
  BookOpen,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Code2,
  Compass,
  Crosshair,
  ExternalLink,
  Facebook,
  Github,
  GraduationCap,
  Instagram,
  Landmark,
  Lightbulb,
  ListTree,
  Map,
  MapPin,
  MapPinCheck,
  Menu,
  MousePointerClick,
  PenLine,
  Play,
  Route,
  ScrollText,
  Settings2,
  ShieldAlert,
  Sparkles,
  TrainFront,
  Volume2,
  WandSparkles,
  X,
} from "lucide-react";
import { AudioSettingsModal } from "@/components/audio-settings";
import { Fireflies } from "@/components/fireflies";
import { muteluAudio } from "@/lib/audio";
import { CREDITS, CREATORS, FEATURES, RULES, WATS, WIN_TARGET, gameBoardHref } from "@/lib/content";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "#about", label: "เกี่ยวกับเกม" },
  { href: "#rules", label: "วิธีเล่น" },
  { href: "#creators", label: "ผู้พัฒนา" },
] as const;

function ping() {
  muteluAudio.start();
  muteluAudio.pop();
}

function hoverTick() {
  muteluAudio.start();
  muteluAudio.hover();
}

const DEFAULT_BOARD = gameBoardHref({ setup: true, mode: "pass", board: "5" });

function openBoard(href: string) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    ping();
    event.preventDefault();
    window.location.assign(href);
  };
}

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [watsOpen, setWatsOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [active, setActive] = useState<string>("#top");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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

  useEffect(() => {
    const ids = ["top", "about", "rules", "modes", "creators", "credits"];
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

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", watsOpen || rulesOpen || audioOpen);
  }, [watsOpen, rulesOpen, audioOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a href="#top" className="skip-link">
        ข้ามไปยังเนื้อหา
      </a>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gold"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(15,23,42,0.85)] backdrop-blur-xl">
        <nav
          className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8"
          aria-label="เมนูหลัก"
        >
          <button
            id="menu-toggle"
            type="button"
            className="order-first min-h-11 min-w-11 rounded-xl border border-white/15 p-2 text-white md:hidden"
            aria-label={menuOpen ? "ปิดเมนู" : "เปิดเมนู"}
            aria-expanded={menuOpen}
            onClick={() => {
              ping();
              setMenuOpen((v) => !v);
            }}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <a
            href="#top"
            className="flex items-center gap-3 rounded-lg"
            onMouseEnter={hoverTick}
            onClick={ping}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-[#21164a] shadow-lg shadow-gold/20">
              <Compass className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <strong className="block text-lg font-bold tracking-wide text-white">
                JeMC (เจมซี)
              </strong>
              <span className="block text-xs text-gold">Mutelu ศึกพิกัดสายมู</span>
            </span>
          </a>
          <div className="hidden items-center gap-6 text-sm text-muted md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onMouseEnter={hoverTick}
                onClick={ping}
                className={cn("transition hover:text-gold", active === item.href && "text-gold")}
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href={DEFAULT_BOARD}
            onMouseEnter={hoverTick}
            onClick={openBoard(DEFAULT_BOARD)}
            className="hidden min-h-11 items-center rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-[#21164a] shadow-[0_0_24px_rgba(255,189,58,0.18)] transition hover:-translate-y-0.5 hover:bg-gold-soft md:inline-flex"
          >
            เริ่มเล่นเกม
          </a>
          <button
            type="button"
            className="min-h-11 min-w-11 rounded-xl border border-gold/35 p-2 text-gold-soft transition hover:bg-white/10"
            aria-label="เปิดการตั้งค่าระบบเสียง"
            title="การตั้งค่าระบบเสียง"
            onClick={() => {
              ping();
              setAudioOpen(true);
            }}
          >
            <Volume2 className="mx-auto h-5 w-5" />
          </button>
        </nav>
        <div id="mobile-menu" hidden={!menuOpen} className="border-t border-white/10 px-5 pb-5 pt-3 md:hidden">
          <div className="flex flex-col gap-2">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  ping();
                  closeMenu();
                }}
                className="min-h-11 rounded-lg px-3 py-2 text-muted hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
            <a
              href={DEFAULT_BOARD}
              onClick={openBoard(DEFAULT_BOARD)}
              className="mt-2 min-h-11 rounded-xl bg-gold px-4 py-2.5 text-center font-semibold text-[#21164a]"
            >
              เริ่มเล่นเกม
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="flex w-full flex-col">
        <Hero />
        <Rules onOpen={() => setRulesOpen(true)} />
        <About onOpenWats={() => setWatsOpen(true)} />
        <Modes />
        <Creators />
        <Credits />
      </main>

      <footer className="border-t border-white/10 bg-ink-deep">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-white">
              <Compass className="h-5 w-5 text-gold" />
              JeMC (เจมซี)
            </div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted/65">
              2026 @JeMC (เจมซี) เด็กนักเรียนโครงการห้องเรียนพิเศษ (SMTE) โรงเรียนศึกษานารี
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/chutwou"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram ของทีม JeMC"
              onMouseEnter={hoverTick}
              onClick={ping}
              className="rounded-lg border border-white/10 p-2 text-muted transition hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#creators"
              aria-label="โปรไฟล์ผู้พัฒนา"
              onMouseEnter={hoverTick}
              onClick={ping}
              className="rounded-lg border border-white/10 p-2 text-muted transition hover:border-gold hover:text-gold"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="#creators"
              aria-label="ทีมผู้สร้าง JeMC"
              onMouseEnter={hoverTick}
              onClick={ping}
              className="rounded-lg border border-white/10 p-2 text-muted transition hover:border-gold hover:text-gold"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>

      <Dialog
        open={watsOpen}
        onClose={() => setWatsOpen(false)}
        title="14 พิกัดวัดในเกม"
        subtitle="แตะชื่อวัดเพื่อดูรูป จังหวัด และจุดเด่น"
      >
        <WatDirectory />
        <p className="border-t border-white/10 px-5 py-4 text-sm text-gold-soft">
          บนกระดานมีวัด 14 แห่งทั่วไทย — เป้าหมายร่วมคือเช็คอินให้ครบ {WIN_TARGET} วัด
          ผู้ที่เช็คอินได้มากที่สุดเป็นผู้ชนะ
        </p>
      </Dialog>

      <Dialog open={rulesOpen} onClose={() => setRulesOpen(false)} title="กติกาแบบละเอียด">
        <div className="space-y-4 p-6 text-muted/85">
          <p>
            <strong className="text-gold">Turn Flow:</strong> จั่วการ์ด → อ่านเวกเตอร์ → คำนวณพิกัดใหม่
            → เคลื่อนหมาก → ตรวจจุดหมายและอุปสรรค
          </p>
          <p>
            <strong className="text-neon">แกน x/y:</strong> ค่า x คือการเคลื่อนแนวนอน และค่า y
            คือการเคลื่อนแนวตั้ง โดยบวกหรือลบตามทิศของเวกเตอร์
          </p>
          <p>
            <strong className="text-gold">พิกัดวัด:</strong> มีวัดศักดิ์สิทธิ์ 14 จุดทั่วไทยบนกระดาน
            Cartesian Grid เริ่มต้นทุกคนที่จุดศูนย์กลาง (0,0)
          </p>
          <p>
            <strong className="text-neon">เงื่อนไขการชนะ:</strong> เมื่อผู้เล่นเช็คอินรวมกันครบ{" "}
            {WIN_TARGET} วัด ผู้เช็คอินได้มากที่สุดเป็นผู้ชนะ
          </p>
          <p>
            <strong className="text-gold">อุปสรรค:</strong> หลบกรวยส้มจราจร สภาพน้ำท่วม
            และใช้การ์ดพิเศษเพื่อพลิกเกมหรือป่วนคู่แข่ง
          </p>
          <p className="rounded-xl border border-gold/20 bg-gold/10 p-4 text-sm leading-6 text-gold-soft">
            กติกานี้เป็นพรีวิวเพื่อการเรียนรู้และสามารถปรับเปลี่ยนให้เหมาะกับกิจกรรมในชั้นเรียนหรือเวอร์ชันเกมได้
          </p>
        </div>
      </Dialog>

      <AudioSettingsModal open={audioOpen} onClose={() => setAudioOpen(false)} />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate order-1 overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-60" />
      <div className="thai-diamond absolute -right-16 top-12 h-64 w-64 rotate-12 opacity-30" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <Reveal>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm text-gold-soft">
            <MapPin className="h-4 w-4" />
            Mutelu : ศึกพิกัดสายมู
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.25] tracking-tight text-white sm:text-5xl lg:text-6xl">
            มูเตลูพิชิต 9 วัด ทั่วไทย ด้วยพลังแห่งเวกเตอร์
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted/85">
            บอร์ดเกมคณิตศาสตร์เชิงผจญภัยบน Cartesian Grid
            ที่เปลี่ยนการคำนวณเวกเตอร์ให้กลายเป็นเส้นทางตามล่าพิกัดสายบุญทั่วไทย
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={DEFAULT_BOARD}
              onMouseEnter={hoverTick}
              onClick={openBoard(DEFAULT_BOARD)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 font-semibold text-[#21164a] shadow-xl shadow-gold/15 transition hover:-translate-y-1 hover:bg-gold-soft active:scale-[0.96]"
            >
              <Play className="h-5 w-5 fill-current" />
              เริ่มเล่นเกม (Play Now)
            </a>
            <a
              href="#rules"
              onMouseEnter={hoverTick}
              onClick={ping}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 font-medium text-white transition hover:border-neon/70 hover:bg-white/10"
            >
              <BookOpen className="h-5 w-5" />
              คู่มือการเล่น (How to Play)
            </a>
          </div>
          <div className="mt-10 flex items-center gap-5 text-sm text-muted">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-neon" />
              Vector-powered journey
            </span>
            <span className="h-5 w-px bg-white/20" />
            <span>Thai learning game</span>
          </div>
        </Reveal>
        <Reveal delay="140ms" className="relative mx-auto w-full max-w-xl lg:justify-self-end">
          <BoardPreview />
        </Reveal>
      </div>
    </section>
  );
}

function BoardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-5 rounded-[2rem] bg-purple-bright/20 blur-3xl" />
      <div className="glass-panel relative overflow-hidden rounded-[2rem] p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Map className="h-4 w-4 text-neon" /> BKK Vector Board
          </div>
          <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-[#21164a]">
            TURN 01
          </span>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/15 bg-[#17142e] grid-pattern">
          <div className="absolute inset-x-0 top-1/2 h-px bg-gold/60" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-gold/60" />
          <span className="absolute right-3 top-[52%] text-xs text-gold-soft">x+</span>
          <span className="absolute left-[52%] top-3 text-xs text-gold-soft">y+</span>
          <span className="absolute left-[47%] top-[53%] flex h-7 w-7 items-center justify-center rounded-full border-2 border-neon bg-ink text-xs font-bold text-neon">
            0
          </span>
          <div className="absolute left-[69%] top-[25%] flex flex-col items-center gap-1">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-[#21164a] shadow-lg shadow-gold/30">
              <Landmark className="h-4 w-4" />
            </span>
            <span className="rounded bg-[#21164a]/90 px-1.5 py-0.5 text-[10px] text-gold-soft">
              วัด 09
            </span>
          </div>
          <div className="absolute left-[27%] top-[67%] flex flex-col items-center gap-1">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neon text-ink">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="rounded bg-[#21164a]/90 px-1.5 py-0.5 text-[10px] text-neon-soft">
              วัด 04
            </span>
          </div>
          <div className="absolute left-[61%] top-[57%] h-3 w-3 rounded-full bg-danger ring-4 ring-danger/20" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" aria-hidden="true">
            <path
              d="M200 200 C238 178, 244 132, 285 105"
              fill="none"
              stroke="#45f2c5"
              strokeWidth="4"
              strokeDasharray="7 7"
            />
            <polygon points="288,100 275,103 283,113" fill="#45f2c5" />
          </svg>
          <div className="absolute bottom-4 left-4 rounded-xl border border-white/15 bg-[#2b2157]/95 px-3 py-2 shadow-xl motion-safe:animate-float">
            <div className="flex items-center gap-2 text-xs text-muted">
              <TrainFront className="h-4 w-4 text-gold" /> Vector Card
            </div>
            <div className="mt-1 text-base font-bold text-white">
              BTS <span className="text-neon">(+3, +2)</span>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
          <div className="rounded-xl bg-white/5 p-2 text-muted">
            พิกัด
            <br />
            <strong className="text-white">(3, 2)</strong>
          </div>
          <div className="rounded-xl bg-white/5 p-2 text-muted">
            แต้มบุญ
            <br />
            <strong className="text-gold">120</strong>
          </div>
          <div className="rounded-xl bg-white/5 p-2 text-muted">
            เป้าหมาย
            <br />
            <strong className="text-neon">9 วัด</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function About({ onOpenWats }: { onOpenWats: () => void }) {
  const icons = {
    "graduation-cap": GraduationCap,
    route: Route,
    "building-2": Building2,
    "mouse-pointer-click": MousePointerClick,
  };
  return (
    <section id="about" className="relative order-3 scroll-mt-20 border-y border-white/10 bg-[#110e20]/70 py-16">
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.12fr_.88fr]">
          <Reveal className="glass-panel rounded-3xl p-7 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-neon">ABOUT THE GAME</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
              คณิตศาสตร์บนกระดานที่พาคุณเดินทางบูชาวัดทั่วประเทศไทย
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted/80">
              Mutelu ศึกพิกัดสายมู คือการพาผู้เล่นไปผจญภัยบนกระดานพิกัดฉาก Cartesian Grid
              ให้ผู้เล่นศึกษาแนวคิดการเดินด้วยเวกเตอร์ วางแผนเช็คอินวัดสายมู 14 แห่งทั่วประเทศไทยเพื่อแข่งขันเก็บแต้มบุญอย่างสนุกและมีความหมาย
            </p>
            <div className="gold-line my-8 h-px w-full" />
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-sm font-medium text-gold-soft">
                14 พิกัดวัด
              </span>
              <span className="rounded-full border border-neon/25 bg-neon/10 px-4 py-2 text-sm font-medium text-neon-soft">
                4 ขั้นตอน
              </span>
              <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-muted">
                1 กระดานเวกเตอร์
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                ping();
                onOpenWats();
              }}
              onMouseEnter={hoverTick}
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-gold/40 px-5 py-3 font-medium text-gold-soft transition hover:bg-gold hover:text-[#21164a] active:scale-[0.96]"
            >
              <ListTree className="h-5 w-5" />
              ดูรายชื่อวัด 14 พิกัด
            </button>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {FEATURES.map((f) => {
              const Icon = icons[f.icon];
              return (
                <article
                  key={f.id}
                  className={cn(
                    "rounded-2xl border border-white/10 bg-white/[.045] p-5 transition hover:-translate-y-1",
                    f.hover === "gold" ? "hover:border-gold/35" : "hover:border-neon/35",
                  )}
                >
                  <Icon className={cn("mb-4 h-7 w-7", f.hover === "gold" ? "text-gold" : "text-neon")} />
                  <h3 className="text-xl font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted/75">{f.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Rules({ onOpen }: { onOpen: () => void }) {
  const icons = {
    crosshair: Crosshair,
    calculator: Calculator,
    "map-pin-check": MapPinCheck,
    "shield-alert": ShieldAlert,
  };
  return (
    <section id="rules" className="order-2 scroll-mt-20 py-16">
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-gold">HOW TO PLAY</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">วิธีเล่นใน 4 ขั้นตอน</h2>
          <p className="mt-4 text-lg leading-8 text-muted/75">
            ใช้เวกเตอร์เป็นเข็มทิศ คิดอย่างเป็นระบบ แล้วออกเดินทางเก็บแต้มบุญไปพร้อมกัน
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {RULES.map((rule) => {
            const Icon = icons[rule.icon];
            const gold = rule.tone === "gold";
            return (
              <article key={rule.n} className="rounded-3xl border border-white/10 bg-[#241b45]/70 p-6">
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-bold text-[#21164a]",
                      gold ? "bg-gold" : "bg-neon",
                    )}
                  >
                    {rule.n}
                  </span>
                  <Icon className={cn("ml-auto h-6 w-6", gold ? "text-gold" : "text-neon")} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{rule.title}</h3>
                <p className="mt-2 leading-7 text-muted/75">{rule.text}</p>
              </article>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => {
            ping();
            onOpen();
          }}
          onMouseEnter={hoverTick}
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-medium text-white transition hover:bg-white/15 active:scale-[0.96]"
        >
          <ScrollText className="h-5 w-5 text-gold" />
          กติกาแบบละเอียด
        </button>
      </div>
    </section>
  );
}

function Modes() {
  const [mode, setMode] = useState<"pass" | "ai">("pass");
  const [board, setBoard] = useState<"compact" | "standard">("compact");
  const [difficulty, setDifficulty] = useState("Beginner");
  const summary = [
    mode === "pass" ? "Pass & Play" : "Single Player vs AI",
    board === "standard" ? "Standard Board" : "Compact Board",
    difficulty,
  ].join(" · ");
  const playHref = gameBoardHref({
    setup: true,
    mode,
    board: board === "standard" ? "8" : "5",
    difficulty: difficulty === "Beginner" ? "easy" : difficulty === "Explorer" ? "medium" : "hard",
  });
  const boardHref = playHref;
  return (
    <section id="modes" className="order-4 scroll-mt-20 py-16">
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-neon">GAME MODES & SETTINGS</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">เตรียมกระดานของคุณ</h2>
          </Reveal>
          <span className="rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold-soft">
            Preview
          </span>
        </div>
        <div className="glass-panel grid gap-8 rounded-3xl p-6 lg:grid-cols-[1fr_.82fr] lg:p-9">
          <div>
            <p className="leading-7 text-muted/75">
              เลือกค่าเริ่มต้นสำหรับรอบถัดไปได้เลย นี่คือ UI พรีวิวที่เตรียมไว้สำหรับระบบเกม
            </p>
            <fieldset className="mt-7">
              <legend className="mb-3 font-semibold text-white">จำนวนผู้เล่น</legend>
              <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="เลือกโหมดผู้เล่น">
                <Choice
                  pressed={mode === "pass"}
                  title="Pass & Play"
                  hint="เล่นผลัดกันบนเครื่องเดียว"
                  onClick={() => setMode("pass")}
                />
                <Choice
                  pressed={mode === "ai"}
                  title="Single Player vs AI"
                  hint="วางแผนแข่งกับ AI"
                  onClick={() => setMode("ai")}
                />
              </div>
            </fieldset>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <fieldset>
                <legend className="mb-3 font-semibold text-white">ขนาดกระดาน</legend>
                <div className="flex gap-2" role="radiogroup" aria-label="เลือกขนาดกระดาน">
                  <Choice compact pressed={board === "standard"} title="Standard" onClick={() => setBoard("standard")} />
                  <Choice compact pressed={board === "compact"} title="Compact" onClick={() => setBoard("compact")} />
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-3 font-semibold text-white">ระดับความยาก</legend>
                <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="เลือกระดับความยาก">
                  {["Beginner", "Explorer", "Mystic"].map((level) => (
                    <Choice
                      key={level}
                      compact
                      pressed={difficulty === level}
                      title={level}
                      onClick={() => setDifficulty(level)}
                    />
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
          <aside className="rounded-2xl border border-neon/20 bg-[#0e172a]/70 p-6">
            <div className="flex items-center gap-2 text-neon">
              <Settings2 className="h-5 w-5" />
              <span className="font-semibold">Quick Setup Summary</span>
            </div>
            <p className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 leading-7 text-muted" aria-live="polite">
              {summary}
            </p>
            <p className="mt-4 text-sm leading-6 text-muted/75">
              การตั้งค่านี้ใช้เป็นตัวอย่างก่อนเข้าสู่หน้าเกมจริง สามารถเลือกใหม่ได้ทุกเมื่อ
            </p>
            <a
              href={playHref}
              onMouseEnter={hoverTick}
              onClick={openBoard(playHref)}
              className="mt-7 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3.5 font-semibold text-[#21164a] transition hover:bg-gold-soft active:scale-[0.96]"
            >
              <WandSparkles className="h-5 w-5" />
              เริ่มเซ็ตอัป
            </a>
            <a
              href={boardHref}
              onMouseEnter={hoverTick}
              onClick={openBoard(boardHref)}
              className="mt-4 block text-center text-sm text-neon-soft underline decoration-neon/50 underline-offset-4 hover:text-white"
            >
              ไปยังกระดานเกม
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Choice({
  pressed,
  title,
  hint,
  onClick,
  compact,
}: {
  pressed: boolean;
  title: string;
  hint?: string;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => {
        ping();
        onClick();
      }}
      onMouseEnter={hoverTick}
      className={cn(
        "min-h-11 rounded-xl border text-left transition",
        compact ? "flex-1 px-3 py-3 text-sm font-medium" : "p-4",
        pressed
          ? "border-gold bg-gold text-[#21164a] shadow-[0_0_0_3px_rgba(255,189,58,0.16)]"
          : "border-white/15 bg-white/5 text-muted hover:border-gold/50",
      )}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="font-semibold">{title}</span>
        <CheckCircle2
          className={cn("h-5 w-5 shrink-0 transition", pressed ? "scale-100 opacity-100" : "scale-75 opacity-0")}
        />
      </span>
      {hint ? <span className="mt-1 block text-sm opacity-75">{hint}</span> : null}
    </button>
  );
}

function Creators() {
  return (
    <section id="creators" className="relative isolate order-5 scroll-mt-20 overflow-hidden border-t border-white/10 py-16">
      <Fireflies />
      <div className="relative z-[1] mx-auto w-full max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-gold">CREATORS PROFILE</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
            ทีมผู้พัฒนา (Creators Profile)
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted/75">JeMC (เจมซี) ทีมผู้สร้าง Mutelu ศึกพิกัดสายมู</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CREATORS.map((c) => (
            <article
              key={c.instagram}
              className="glass-panel rounded-3xl border border-gold/20 p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-gold/55 focus-within:-translate-y-1"
            >
              <img
                src={c.photo}
                alt={c.alt}
                width={128}
                height={128}
                loading="lazy"
                className="mx-auto h-32 w-32 rounded-full border-4 border-gold/60 object-cover shadow-lg shadow-gold/10"
              />
              <h3 className="mt-5 text-xl font-semibold text-white">{c.name}</h3>
              <p className="mt-3 min-h-[3.5rem] text-sm leading-6 text-gold-soft">{c.quote}</p>
              <a
                href={`https://instagram.com/${c.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={hoverTick}
                onClick={ping}
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-sm text-neon-soft transition hover:bg-white/10"
              >
                <Instagram className="h-5 w-5" />@{c.instagram}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Credits() {
  const icons = {
    "code-2": Code2,
    "pen-line": PenLine,
    lightbulb: Lightbulb,
  };
  return (
    <section id="credits" className="order-6 scroll-mt-20 py-16">
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-gold">DEVELOPER & CREDITS</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            พัฒนาด้วยใจ เพื่อการเรียนรู้ที่อยากชวนให้เล่น
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted/75">
            โครงการ Edutainment ที่เชื่อมคณิตศาสตร์ เวกเตอร์ และบริบทกรุงเทพฯ เข้ากับเกม เพื่อเปิดพื้นที่ให้การเรียนรู้สนุกขึ้น
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {CREDITS.map((c) => {
            const Icon = icons[c.icon];
            const gold = c.tone === "gold";
            return (
              <article key={c.title} className="rounded-2xl border border-white/10 bg-white/[.045] p-6">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    gold ? "bg-gold/15 text-gold" : "bg-neon/15 text-neon",
                  )}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-white">{c.title}</h3>
                <p className="mt-2 leading-7 text-muted/70">{c.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Reveal({
  children,
  className,
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform,filter] duration-500 ease-out",
        show ? "translate-y-0 opacity-100 blur-0" : "translate-y-4 opacity-0 blur-[4px]",
        className,
      )}
      style={delay ? { transitionDelay: delay } : undefined}
    >
      {children}
    </div>
  );
}

function WatDirectory() {
  const [openName, setOpenName] = useState<string | null>(null);
  return (
    <div className="grid max-h-[60vh] grid-cols-1 gap-2 overflow-y-auto p-5">
      {WATS.map((wat, i) => {
        const expanded = openName === wat.name;
        return (
          <article
            key={wat.name}
            className={cn(
              "overflow-hidden rounded-xl bg-white/5 transition",
              expanded && "border border-gold/25 bg-white/[.07]",
            )}
          >
            <button
              type="button"
              aria-expanded={expanded}
              className="flex min-h-11 w-full items-center justify-between gap-3 p-3 text-left text-muted"
              onClick={() => {
                ping();
                setOpenName(expanded ? null : wat.name);
              }}
            >
              <span className="font-medium text-white/90">
                {String(i + 1).padStart(2, "0")} · {wat.name}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-gold-soft transition-transform duration-200",
                  expanded && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            {expanded ? (
              <div className="space-y-3 border-t border-white/10 p-3">
                <img
                  src={wat.photo}
                  alt={wat.alt}
                  width={1200}
                  height={800}
                  className="h-44 w-full rounded-lg object-cover sm:h-52"
                />
                <p className="flex items-center gap-1.5 text-sm font-medium text-gold-soft">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  จังหวัด{wat.province}
                </p>
                <p className="text-sm leading-6 text-muted/90">{wat.highlight}</p>
                <p className="flex items-start gap-1.5 text-xs leading-5 text-muted/55">
                  <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                  <span>
                    {wat.photoKind === "illustration" ? "ภาพประกอบ · อ้างอิง " : "แหล่งที่มาภาพ "}
                    <a
                      href={wat.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-white/25 underline-offset-2 transition hover:text-gold-soft hover:decoration-gold/60"
                    >
                      {wat.sourceLabel}
                    </a>
                  </span>
                </p>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

function Dialog({
  open,
  onClose,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(8,5,18,0.78)] p-4 backdrop-blur-[7px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl rounded-3xl border border-white/15 bg-[#20183d] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <h2 id={titleId} className="text-xl font-semibold text-white">
              {title}
            </h2>
            {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            className="min-h-11 min-w-11 rounded-lg p-2 text-muted hover:bg-white/10"
            aria-label="ปิดหน้าต่าง"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
