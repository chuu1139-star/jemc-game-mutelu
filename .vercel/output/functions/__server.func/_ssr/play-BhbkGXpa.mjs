import { i as __toESM } from "../_runtime.mjs";
import { R as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as boardFromLocation } from "./router-BJkyXjvM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/play-BhbkGXpa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PlayPage() {
	const href = boardFromLocation(typeof window === "undefined" ? "" : window.location.search);
	(0, import_react.useEffect)(() => {
		window.location.replace(href);
	}, [href]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col items-center justify-center bg-[#0b132b] px-6 text-center text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm tracking-[0.18em] text-[#ffc107]",
				children: "MUTELU"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-2xl font-bold",
				children: "กำลังเข้าหน้าตั้งค่ากระดาน"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-md text-sm text-blue-100/80",
				children: "เปิดหน้าตั้งค่าบอร์ดเกม — ถ้าไม่ย้ายอัตโนมัติ ให้กดลิงก์ด้านล่าง"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href,
				className: "mt-6 inline-flex min-h-11 items-center rounded-xl bg-[#ffc107] px-5 py-3 font-semibold text-[#172033]",
				children: "เปิดหน้าตั้งค่า"
			})
		]
	});
}
//#endregion
export { PlayPage as component };
