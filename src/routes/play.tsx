import { useEffect } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { gameBoardHref } from "@/lib/content";

function boardFromLocation(searchStr: string) {
  const src = new URLSearchParams(searchStr.startsWith("?") ? searchStr.slice(1) : searchStr);
  const mode = src.get("mode");
  const board = src.get("board")?.replaceAll('"', "");
  const difficulty = src.get("difficulty")?.replaceAll('"', "");
  const start = src.get("start") === "1" || src.get("start") === "true";
  const setup =
    src.get("setup") === "1" || src.get("setup") === "true" || !start;
  return gameBoardHref({
    setup: setup && !start,
    start,
    mode: mode === "ai" || mode === "pass" ? mode : "pass",
    board: board === "5" || board === "8" ? board : "5",
    difficulty:
      difficulty === "easy" || difficulty === "medium" || difficulty === "hard"
        ? difficulty
        : undefined,
  });
}

export const Route = createFileRoute("/play")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: boardFromLocation(location.searchStr || "") });
  },
  component: PlayPage,
  head: () => ({
    meta: [
      { title: "Mutelu ศึกพิกัดสายมู — กระดานเกม" },
      {
        name: "description",
        content:
          "เล่น Mutelu ศึกพิกัดสายมู บนกระดาน Cartesian Grid เช็กอินวัด วางกับดัก และใช้การ์ดเวกเตอร์",
      },
    ],
  }),
});

function PlayPage() {
  const href = boardFromLocation(
    typeof window === "undefined" ? "" : window.location.search,
  );

  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#0b132b] px-6 text-center text-white">
      <p className="text-sm tracking-[0.18em] text-[#ffc107]">MUTELU</p>
      <h1 className="mt-3 text-2xl font-bold">กำลังเข้าหน้าตั้งค่ากระดาน</h1>
      <p className="mt-2 max-w-md text-sm text-blue-100/80">
        เปิดหน้าตั้งค่าบอร์ดเกม — ถ้าไม่ย้ายอัตโนมัติ ให้กดลิงก์ด้านล่าง
      </p>
      <a
        href={href}
        className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[#ffc107] px-5 py-3 font-semibold text-[#172033]"
      >
        เปิดหน้าตั้งค่า
      </a>
    </div>
  );
}
