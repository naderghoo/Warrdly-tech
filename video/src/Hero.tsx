import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FONT, loadFonts } from "./fonts";

loadFonts();

export const W = 1280;
export const H = 960;
export const LOOP = 300; // 10 s at 30 fps — every motion below repeats an exact divisor of this, so the video loops seamlessly

const C = {
  bg0: "#140A18",
  bg1: "#2A1631",
  plum: "#6B2D5C",
  plumL: "#B0679A",
  plumXL: "#C98BB8",
  gold: "#F2A93B",
  goldL: "#F7D08F",
  text: "#F7F1F6",
  muted: "#BCA9B9",
  line: "rgba(255,255,255,0.10)",
};

type Copy = {
  window: string;
  live: string;
  inputs: string[];
  hub: string;
  hubSub: string;
  outputs: string[];
  tiles: string[];
};

export const COPY: Record<"ar" | "en", Copy> = {
  ar: {
    window: "وردلي × Odoo",
    live: "مباشر",
    inputs: ["أمازون", "نون", "سلة", "ترينديول", "المندوبون"],
    hub: "Odoo",
    hubSub: "نظام واحد",
    outputs: ["فواتير متوافقة", "مخزون لحظي موحّد", "تقارير الربحية", "متابعة التحصيل"],
    tiles: ["المبيعات", "المخزون", "التحصيل"],
  },
  en: {
    window: "Warrdly × Odoo",
    live: "Live",
    inputs: ["Amazon", "noon", "Salla", "Trendyol", "Sales reps"],
    hub: "Odoo",
    hubSub: "One system",
    outputs: ["ZATCA invoices", "Unified stock", "Profit reports", "Collections"],
    tiles: ["Sales", "Inventory", "Collections"],
  },
};

const TAU = Math.PI * 2;
const frac = (x: number) => x - Math.floor(x);
const wave = (f: number, period: number, phase = 0) => 0.5 + 0.5 * Math.sin(TAU * (f / period + phase));

type P = [number, number];
function bezier(p0: P, p1: P, p2: P, p3: P, t: number): P {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
}
const pathD = (a: P, b: P, c: P, d: P) => `M${a[0]},${a[1]} C${b[0]},${b[1]} ${c[0]},${c[1]} ${d[0]},${d[1]}`;
// Smooth ease so particles accelerate out of a chip and settle into the hub
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const HUB: P = [640, 440];
const HUB_R = 118;
const IN_Y = [220, 330, 440, 550, 660];
const OUT_Y = [260, 380, 500, 620];

export const Hero: React.FC<{ locale: "ar" | "en" }> = ({ locale }) => {
  const f = useCurrentFrame();
  const t = COPY[locale];
  const rtl = locale === "ar";
  // Arabic: channels flow in from the right; English mirrors it
  const mx = (x: number) => (rtl ? x : W - x);

  const inX = 1060; // chip centre
  const inW = 270;
  const outX = 225;
  const outW = 330;

  const inLines = IN_Y.map((y) => {
    const edge = inX - inW / 2;
    return [[mx(edge), y], [mx(edge - 80), y], [mx(800), HUB[1]], [mx(HUB[0] + HUB_R + 2), HUB[1]]] as [P, P, P, P];
  });
  const outLines = OUT_Y.map((y) => {
    const edge = outX + outW / 2;
    return [[mx(HUB[0] - HUB_R - 2), HUB[1]], [mx(470), HUB[1]], [mx(edge + 70), y], [mx(edge), y]] as [P, P, P, P];
  });

  const light = [640 + 260 * Math.sin((TAU * f) / LOOP), 360 + 120 * Math.cos((TAU * f) / LOOP)];

  return (
    <AbsoluteFill
      style={{
        fontFamily: `${FONT}, sans-serif`,
        direction: rtl ? "rtl" : "ltr",
        color: C.text,
        background: `radial-gradient(1100px 700px at ${light[0]}px ${light[1]}px, #3A1F42 0%, ${C.bg1} 38%, ${C.bg0} 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Fine dot grid */}
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, opacity: 0.09 }}>
        <defs>
          <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.6" fill="#fff" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#dots)" />
      </svg>

      {/* Gold horizon glow behind the hub */}
      <div
        style={{
          position: "absolute",
          left: HUB[0] - 340,
          top: HUB[1] - 340,
          width: 680,
          height: 680,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(242,169,59,${0.16 + 0.06 * wave(f, 100)}) 0%, rgba(176,103,154,0.10) 40%, transparent 70%)`,
        }}
      />

      {/* Window bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 84,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 44px",
          borderBottom: `1px solid ${C.line}`,
          background: "rgba(255,255,255,0.025)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", gap: 10, direction: "ltr" }}>
            {["#ff6159", "#ffbd2e", "#28c941"].map((c) => (
              <span key={c} style={{ width: 16, height: 16, borderRadius: 8, background: c, opacity: 0.55 }} />
            ))}
          </div>
          <span style={{ fontSize: 28, fontWeight: 600, color: C.muted, letterSpacing: rtl ? 0 : 0.3 }}>{t.window}</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 20px",
            borderRadius: 999,
            background: "rgba(242,169,59,0.10)",
            border: "1px solid rgba(242,169,59,0.35)",
            color: C.goldL,
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              background: C.gold,
              boxShadow: `0 0 ${8 + 10 * wave(f, 50)}px ${C.gold}`,
              opacity: 0.6 + 0.4 * wave(f, 50),
            }}
          />
          {t.live}
        </div>
      </div>

      {/* Connection lines + particles */}
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="lineIn" x1={rtl ? "1" : "0"} x2={rtl ? "0" : "1"} y1="0" y2="0">
            <stop offset="0%" stopColor={C.plumXL} stopOpacity="0.15" />
            <stop offset="100%" stopColor={C.gold} stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="lineOut" x1={rtl ? "1" : "0"} x2={rtl ? "0" : "1"} y1="0" y2="0">
            <stop offset="0%" stopColor={C.gold} stopOpacity="0.55" />
            <stop offset="100%" stopColor={C.plumXL} stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        {inLines.map((l, i) => (
          <path key={`i${i}`} d={pathD(...l)} fill="none" stroke="url(#lineIn)" strokeWidth={2.5} />
        ))}
        {outLines.map((l, i) => (
          <path key={`o${i}`} d={pathD(...l)} fill="none" stroke="url(#lineOut)" strokeWidth={2.5} />
        ))}
        {inLines.flatMap((l, i) =>
          [0, 0.5].map((k) => {
            const p = bezier(...l, ease(frac(f / 150 + i * 0.17 + k)));
            return (
              <g key={`pi${i}${k}`}>
                <circle cx={p[0]} cy={p[1]} r={13} fill={C.gold} opacity={0.5} filter="url(#glow)" />
                <circle cx={p[0]} cy={p[1]} r={5.5} fill={C.goldL} />
              </g>
            );
          }),
        )}
        {outLines.flatMap((l, i) =>
          [0.25, 0.75].map((k) => {
            const p = bezier(...l, ease(frac(f / 150 + i * 0.13 + k)));
            return (
              <g key={`po${i}${k}`}>
                <circle cx={p[0]} cy={p[1]} r={12} fill={C.plumXL} opacity={0.55} filter="url(#glow)" />
                <circle cx={p[0]} cy={p[1]} r={5} fill="#fff" />
              </g>
            );
          }),
        )}
      </svg>

      {/* Input channels */}
      {t.inputs.map((label, i) => {
        const g = wave(f, 150, i * 0.17 + 0.25);
        return (
          <div
            key={label}
            style={{
              position: "absolute",
              left: mx(inX) - inW / 2,
              top: IN_Y[i] - 36,
              width: inW,
              height: 72,
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "0 24px",
              borderRadius: 18,
              background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
              border: `1px solid rgba(247,208,143,${0.14 + 0.3 * g})`,
              boxShadow: `0 10px 30px rgba(0,0,0,0.35), 0 0 ${24 * g}px rgba(242,169,59,${0.18 * g})`,
              fontSize: 33,
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                flex: "none",
                background: i % 2 ? C.plumXL : C.gold,
                boxShadow: `0 0 12px ${i % 2 ? C.plumXL : C.gold}`,
              }}
            />
            {label}
          </div>
        );
      })}

      {/* Hub */}
      <div style={{ position: "absolute", left: HUB[0] - HUB_R, top: HUB[1] - HUB_R, width: HUB_R * 2, height: HUB_R * 2 }}>
        {[0, 0.5].map((k) => {
          const p = frac(f / 100 + k);
          return (
            <div
              key={k}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: `2px solid ${C.gold}`,
                transform: `scale(${1 + 0.45 * p})`,
                opacity: 0.45 * (1 - p),
              }}
            />
          );
        })}
        <svg
          width={HUB_R * 2 + 36}
          height={HUB_R * 2 + 36}
          style={{ position: "absolute", left: -18, top: -18, transform: `rotate(${(360 * f) / LOOP}deg)` }}
        >
          <defs>
            <linearGradient id="arc" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor={C.goldL} />
              <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx={HUB_R + 18}
            cy={HUB_R + 18}
            r={HUB_R + 12}
            fill="none"
            stroke="url(#arc)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={`${(HUB_R + 12) * 2.2} ${(HUB_R + 12) * 10}`}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `radial-gradient(circle at 35% 30%, #8F4A7C 0%, ${C.plum} 45%, #3E1A3A 100%)`,
            border: "1px solid rgba(255,255,255,0.22)",
            boxShadow: "inset 0 2px 0 rgba(255,255,255,0.25), 0 30px 60px rgba(0,0,0,0.5), 0 0 80px rgba(176,103,154,0.45)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <span style={{ fontSize: 66, fontWeight: 700, letterSpacing: 0.5, direction: "ltr" }}>{t.hub}</span>
          <span style={{ fontSize: 27, fontWeight: 600, color: C.goldL }}>{t.hubSub}</span>
        </div>
      </div>

      {/* Outputs */}
      {t.outputs.map((label, i) => {
        const g = wave(f, 150, i * 0.13 + 0.55);
        return (
          <div
            key={label}
            style={{
              position: "absolute",
              left: mx(outX) - outW / 2,
              top: OUT_Y[i] - 40,
              width: outW,
              height: 80,
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "0 22px",
              borderRadius: 20,
              background: "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
              fontSize: 30,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 40,
                height: 40,
                flex: "none",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `rgba(242,169,59,${0.12 + 0.2 * g})`,
                border: "1px solid rgba(242,169,59,0.45)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.goldL} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5 9-10" />
              </svg>
            </span>
            {label}
          </div>
        );
      })}

      {/* KPI tiles with live bars */}
      <div style={{ position: "absolute", left: 44, right: 44, top: 760, height: 156, display: "flex", gap: 22 }}>
        {t.tiles.map((label, ti) => (
          <div
            key={label}
            style={{
              flex: 1,
              borderRadius: 20,
              padding: "18px 24px",
              background: "rgba(255,255,255,0.045)",
              border: `1px solid ${C.line}`,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 27, fontWeight: 600, color: C.muted }}>{label}</span>
            <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 8, direction: "ltr" }}>
              {Array.from({ length: 14 }).map((_, b) => {
                const base = 0.35 + 0.04 * b; // gentle upward trend
                const h = Math.min(1, base + 0.22 * Math.sin(TAU * (f / 150 + b * 0.09 + ti * 0.3)));
                const hot = b >= 11;
                return (
                  <span
                    key={b}
                    style={{
                      flex: 1,
                      height: `${Math.max(12, h * 100)}%`,
                      borderRadius: 5,
                      background: hot
                        ? `linear-gradient(180deg, ${ti === 1 ? C.goldL : C.plumXL}, ${ti === 1 ? C.gold : C.plum})`
                        : "rgba(201,139,184,0.28)",
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Soft vignette for depth */}
      <AbsoluteFill style={{ boxShadow: "inset 0 0 220px rgba(0,0,0,0.55)", pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
