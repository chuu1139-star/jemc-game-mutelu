import { i as __toESM } from "../_runtime.mjs";
import { F as redirect, R as require_react, _ as useRouter, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content-DbX3o9qG.js
var WATS = [
	{
		name: "วัดร่องขุ่น",
		province: "เชียงราย",
		highlight: "วัดขาวร่วมสมัยผลงานอาจารย์เฉลิมชัย โฆษิตพิพัฒน์ ประดับกระจกและสะพานข้ามบึงมือที่สื่อถึงการพ้นทุกข์",
		photo: "/media/wats/rong-khun.jpg",
		alt: "สะพานขาวและอุโบสถวัดร่องขุ่น จังหวัดเชียงราย",
		sourceUrl: "https://aborntraveller.com/wat-rong-khun-chiang-rais-white-wonderland/",
		sourceLabel: "A Born Traveller",
		photoKind: "photo"
	},
	{
		name: "วัดมังกรกมลาวาส (วัดมังกร)",
		province: "กรุงเทพมหานคร",
		highlight: "วัดจีนโบราณใจกลางเยาวราช ขึ้นชื่อเรื่องหลังคามังกร โคมแดง และพิธีไหว้เจ้าตามธรรมเนียมจีน-ไทย",
		photo: "/media/wats/mangkon.jpg",
		alt: "ภายในวัดมังกรกมลาวาส ย่านเยาวราช กรุงเทพมหานคร",
		sourceUrl: "https://yourthaiguide.com/wat-mangkon-kamalawat-tourist-faq/",
		sourceLabel: "Your Thai Guide",
		photoKind: "photo"
	},
	{
		name: "วัดพระธาตุดอยสุเทพ",
		province: "เชียงใหม่",
		highlight: "พระธาตุเจดีย์ทองบนดอยสุเทพ สัญลักษณ์ล้านนา ขึ้นบันไดนาค 306 ขั้นแล้วชมวิวเมืองเชียงใหม่",
		photo: "/media/wats/doi-suthep.jpg",
		alt: "พระธาตุเจดีย์ทองวัดพระธาตุดอยสุเทพ จังหวัดเชียงใหม่",
		sourceUrl: "https://www.tripsavvy.com/chiang-mai-wat-phra-that-doi-suthep-guide-4152049",
		sourceLabel: "TripSavvy",
		photoKind: "photo"
	},
	{
		name: "วัดอรุณราชวราราม",
		province: "กรุงเทพมหานคร",
		highlight: "พระปรางค์ประดับกระเบื้องและลายจีนริมแม่น้ำเจ้าพระยา จุดชมพระอาทิตย์ขึ้นที่โด่งดังของกรุงเทพฯ",
		photo: "/media/wats/arun.jpg",
		alt: "พระปรางค์วัดอรุณราชวรารามริมแม่น้ำเจ้าพระยา",
		sourceUrl: "https://www.wat-arun.com/",
		sourceLabel: "Wat Arun",
		photoKind: "photo"
	},
	{
		name: "วัดพระศรีรัตนศาสดาราม (วัดพระแก้ว)",
		province: "กรุงเทพมหานคร",
		highlight: "วัดในพระบรมมหาราชวัง ประดิษฐานพระแก้วมรกต พระอุโบสถและจิตรกรรมฝาผนังเรื่องรามเกียรติ์",
		photo: "/media/wats/phra-kaew.jpg",
		alt: "พระอุโบสถวัดพระศรีรัตนศาสดาราม ในพระบรมมหาราชวัง",
		sourceUrl: "https://smarthistory.org/wat-phra-kaew-temple-of-the-emerald-buddha/",
		sourceLabel: "Smarthistory",
		photoKind: "photo"
	},
	{
		name: "วัดพระเชตุพนวิมลมังคลาราม (วัดโพธิ์)",
		province: "กรุงเทพมหานคร",
		highlight: "บ้านพระพุทธไสยาสน์องค์ใหญ่และแหล่งกำเนิดนวดแผนไทย ศิลาจารึกความรู้โบราณรอบวัด",
		photo: "/media/wats/pho.jpg",
		alt: "เจดีย์และซุ้มประตูวัดพระเชตุพนวิมลมังคลาราม วัดโพธิ์",
		sourceUrl: "https://www.viator.com/Bangkok-attractions/Temple-of-the-Reclining-Buddha-Wat-Pho/d343-a2611",
		sourceLabel: "Viator",
		photoKind: "photo"
	},
	{
		name: "วัดสระเกศ (วัดภูเขาทอง)",
		province: "กรุงเทพมหานคร",
		highlight: "พระบรมบรรพตหรือภูเขาทอง เจดีย์ทองบนยอดเขาเทียมใจกลางกรุง มองเห็นวิวเมืองโดยรอบ",
		photo: "/media/wats/saket.jpg",
		alt: "ภูเขาทองวัดสระเกศยามค่ำ ใจกลางกรุงเทพมหานคร",
		sourceUrl: "https://www.umetravel.com/bangkok-temple/wat-saket.html",
		sourceLabel: "UME Travel",
		photoKind: "photo"
	},
	{
		name: "วัดพระธาตุดอยตุง",
		province: "เชียงราย",
		highlight: "พระธาตุเจดีย์คู่บนดอยตุง จุดศรัทธาและชมวิวพรมแดนเหนือ เชื่อมตำนานพระบรมสารีริกธาตุ",
		photo: "/media/wats/doi-tung.jpg",
		alt: "พระธาตุเจดีย์คู่วัดพระธาตุดอยตุง จังหวัดเชียงราย",
		sourceUrl: "https://www.doitung.org/",
		sourceLabel: "Doi Tung",
		photoKind: "illustration"
	},
	{
		name: "วัดพระปฐมเจดีย์",
		province: "นครปฐม",
		highlight: "พระเจดีย์องค์ใหญ่ที่สุดในประเทศไทย สัญลักษณ์พระพุทธศาสนาสุวรรณภูมิมาแต่โบราณ",
		photo: "/media/wats/pathom.jpg",
		alt: "พระปฐมเจดีย์องค์ใหญ่ จังหวัดนครปฐม",
		sourceUrl: "https://www.sawadiscovery.com/guide-thailande/attraction/wat-phra-pathom-chedi",
		sourceLabel: "Sawasdiscovery",
		photoKind: "photo"
	},
	{
		name: "วัดใหญ่ชัยมงคล",
		province: "พระนครศรีอยุธยา",
		highlight: "พระเจดีย์ใหญ่สมเด็จพระนเรศวร แถวพระพุทธรูปและซากปรักหักพังอยุธยาที่เป็นมรดกโลก",
		photo: "/media/wats/yai-chai.jpg",
		alt: "พระเจดีย์และพระพุทธรูปวัดใหญ่ชัยมงคล จังหวัดพระนครศรีอยุธยา",
		sourceUrl: "https://www.getyourguide.com/wat-yai-chai-mongkhon-l36251/",
		sourceLabel: "GetYourGuide",
		photoKind: "photo"
	},
	{
		name: "วัดถ้ำเสือ",
		province: "กระบี่",
		highlight: "วัดบนยอดเขาหินปูน ขึ้นบันไดนาคกว่า 1,200 ขั้น สู่จุดชมวิวป่าและทะเลกระบี่",
		photo: "/media/wats/tham-suea.jpg",
		alt: "ศาลาบนยอดเขาวัดถ้ำเสือ จังหวัดกระบี่",
		sourceUrl: "https://www.tiqets.com/en/wat-tham-suea-tiger-cave-temple-tickets-l208977/",
		sourceLabel: "Tiqets",
		photoKind: "photo"
	},
	{
		name: "วัดคำชะโนด",
		province: "อุดรธานี",
		highlight: "ป่าคำชะโนดและศาลปู่ศรีสุทโธ ตำนานพญานาค ทางเดินไม้ท่ามกลางต้นตาลและต้นคำชะโนด",
		photo: "/media/wats/kham-chanot.jpg",
		alt: "ศาลในป่าคำชะโนด จังหวัดอุดรธานี",
		sourceUrl: "https://www.tourismthailand.org/",
		sourceLabel: "Tourism Authority of Thailand",
		photoKind: "illustration"
	},
	{
		name: "วัดปากน้ำ ภาษีเจริญ",
		province: "กรุงเทพมหานคร",
		highlight: "พระมหาเจดีย์มหารัชมงคลองค์ทองและพระพุทธรูปใหญ่ริมคลอง ศูนย์วิปัสสนากรรมฐานที่มีชื่อเสียง",
		photo: "/media/wats/paknam.jpg",
		alt: "พระมหาเจดีย์ทองวัดปากน้ำ ภาษีเจริญ กรุงเทพมหานคร",
		sourceUrl: "https://en.wikipedia.org/wiki/Wat_Paknam_Bhasicharoen",
		sourceLabel: "Wikipedia",
		photoKind: "illustration"
	},
	{
		name: "วัดสุทัศนเทพวราราม",
		province: "กรุงเทพมหานคร",
		highlight: "วัดหลวงคู่เสาชิงช้า พระศรีศากยมุนีองค์ใหญ่และจิตรกรรมฝาผนังที่งดงามใจกลางเกาะรัตนโกสินทร์",
		photo: "/media/wats/suthat.jpg",
		alt: "วัดสุทัศนเทพวรารามและเสาชิงช้า กรุงเทพมหานคร",
		sourceUrl: "https://www.renown-travel.com/temples/wat-suthat.html",
		sourceLabel: "Renown Travel",
		photoKind: "photo"
	}
];
var CREATORS = [
	{
		name: "ชุติกาญจน์ คำศรี",
		quote: "รักคณิตไม่คิดนอกใจ",
		instagram: "chutwou",
		photo: "/media/creator1.jpg",
		alt: "ภาพโปรไฟล์ของชุติกาญจน์ คำศรี"
	},
	{
		name: "ณัฐนันท์ พีรทรัพย์",
		quote: "พูดไม่ค่อยเก่ง แต่กินหมดจาน",
		instagram: "mxnatt.p",
		photo: "/media/creator2.jpg",
		alt: "ภาพโปรไฟล์ของณัฐนันท์ พีรทรัพย์"
	},
	{
		name: "จินตารัตน์ ชินเติมบุญผาสุข",
		quote: "เปลี่ยนพิกัดต้องใช้เวกเตอร์แต่คิดถึงเธอจังเห้อต้องใช้อะไร",
		instagram: "j8bnlynuej17",
		photo: "/media/creator3.jpg",
		alt: "ภาพโปรไฟล์ของจินตารัตน์ ชินเติมบุญผาสุข"
	}
];
var FEATURES = [
	{
		id: "edutainment",
		icon: "graduation-cap",
		title: "Edutainment",
		text: "เรียนรู้คณิตศาสตร์ผ่านภารกิจที่สนุก จับต้องได้ และชวนเล่นต่อ",
		hover: "gold"
	},
	{
		id: "vector",
		icon: "route",
		title: "Strategic Vector Card Gameplay",
		text: "ใช้การ์ดเวกเตอร์เพื่อวางแผนการเดิน เลือกเส้นทาง และอ่านเกมคู่แข่ง",
		hover: "neon"
	},
	{
		id: "bkk",
		icon: "building-2",
		title: "แผนที่ในฉากเกม",
		text: "พิกัดวัด 14 แห่งทั่วไทยถูกจัดลงกระดาน Cartesian ให้เดินทางด้วยเวกเตอร์อย่างเป็นระบบ",
		hover: "gold"
	},
	{
		id: "web",
		icon: "mouse-pointer-click",
		title: "เล่นง่ายบนเว็บ",
		text: "เปิดเล่นได้ทันทีบนมือถือและคอมพิวเตอร์ ไม่ต้องติดตั้งโปรแกรม",
		hover: "neon"
	}
];
var RULES = [
	{
		n: "01",
		icon: "crosshair",
		tone: "gold",
		title: "เริ่มจุดศูนย์กลาง (0,0)",
		text: "ทุกคนเริ่มที่จุดกำเนิดของกระดาน Cartesian แล้ววางแผนเส้นทางสู่พิกัดวัด"
	},
	{
		n: "02",
		icon: "calculator",
		tone: "neon",
		title: "คำนวณเวกเตอร์ด้วยการ์ด",
		text: "จั่วการ์ดเวกเตอร์ อ่านค่า x และ y แล้วคำนวณพิกัดใหม่ก่อนเดินหมาก"
	},
	{
		n: "03",
		icon: "map-pin-check",
		tone: "gold",
		title: "ร่วมกันเช็คอิน 9 วัด",
		text: "บนกระดานมีวัด 14 แห่ง เป้าหมายร่วมคือเช็คอินให้ครบ 9 วัด ผู้ที่เช็คอินได้มากที่สุดเป็นผู้ชนะ"
	},
	{
		n: "04",
		icon: "shield-alert",
		tone: "neon",
		title: "ระวังอุปสรรค & ใช้การ์ดพิเศษ",
		text: "หลบกรวยส้มจราจร สภาพน้ำท่วม และใช้การ์ดพิเศษเพื่อพลิกเกมหรือป่วนคู่แข่ง"
	}
];
var CREDITS = [
	{
		icon: "code-2",
		tone: "gold",
		title: "Developer",
		text: "ออกแบบประสบการณ์บนเว็บและกลไกที่รองรับการเล่นอย่างลื่นไหล"
	},
	{
		icon: "pen-line",
		tone: "neon",
		title: "Content Creator",
		text: "สื่อสารเรื่องพิกัด เวกเตอร์ และเรื่องราวของประเทศไทยให้เข้าถึงง่าย"
	},
	{
		icon: "lightbulb",
		tone: "gold",
		title: "Learning Experience Designer",
		text: "วางประสบการณ์ที่ให้ผู้เล่นได้คิด ทดลอง และเรียนรู้ผ่านการตัดสินใจ"
	}
];
function gameBoardHref(opts) {
	const params = new URLSearchParams();
	if (opts?.setup) params.set("setup", "1");
	if (opts?.start) params.set("start", "1");
	if (opts?.mode) params.set("mode", opts.mode);
	if (opts?.board) params.set("board", opts.board);
	if (opts?.difficulty) params.set("difficulty", opts.difficulty);
	const qs = params.toString();
	return qs ? `/game.html?${qs}` : "/game.html";
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BJkyXjvM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-D1_AS_Qb.css";
var APP_NAME = "Mutelu ศึกพิกัดสายมู | JeMC";
var Route$3 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "บอร์ดเกมคณิตศาสตร์เชิงผจญภัยบน Cartesian Grid ที่เปลี่ยนการคำนวณเวกเตอร์ให้กลายเป็นเส้นทางตามล่าพิกัดสายบุญทั่วไทย โดยทีม JeMC โรงเรียนศึกษานารี"
			},
			{
				name: "theme-color",
				content: "#151126"
			},
			{
				name: "author",
				content: "JeMC (เจมซี)"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "th",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "thai-pattern min-h-dvh",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$1 = () => import("./routes-CWjq-Xqq.mjs");
var Route$2 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
function boardFromLocation(searchStr) {
	const src = new URLSearchParams(searchStr.startsWith("?") ? searchStr.slice(1) : searchStr);
	const mode = src.get("mode");
	const board = src.get("board")?.replaceAll("\"", "");
	const difficulty = src.get("difficulty")?.replaceAll("\"", "");
	const start = src.get("start") === "1" || src.get("start") === "true";
	return gameBoardHref({
		setup: (src.get("setup") === "1" || src.get("setup") === "true" || !start) && !start,
		start,
		mode: mode === "ai" || mode === "pass" ? mode : "pass",
		board: board === "5" || board === "8" ? board : "5",
		difficulty: difficulty === "easy" || difficulty === "medium" || difficulty === "hard" ? difficulty : void 0
	});
}
var $$splitComponentImporter = () => import("./play-BhbkGXpa.mjs");
var Route$1 = createFileRoute("/play")({
	beforeLoad: ({ location }) => {
		throw redirect({ href: boardFromLocation(location.searchStr || "") });
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "Mutelu ศึกพิกัดสายมู — กระดานเกม" }, {
		name: "description",
		content: "เล่น Mutelu ศึกพิกัดสายมู บนกระดาน Cartesian Grid เช็กอินวัด วางกับดัก และใช้การ์ดเวกเตอร์"
	}] })
});
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	PlayRoute: Route$1.update({
		id: "/play",
		path: "/play",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { FEATURES as a, gameBoardHref as c, CREDITS as i, boardFromLocation as n, RULES as o, CREATORS as r, WATS as s, router_exports as t };
