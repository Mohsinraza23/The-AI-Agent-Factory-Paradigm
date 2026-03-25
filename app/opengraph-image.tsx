import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The AI Agent Factory Paradigm Quiz — Code with Mohsin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #070f0a 0%, #0e2018 50%, #071510 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow top-left */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        {/* Background glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* YouTube badge top */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(220,38,38,0.15)",
            border: "1px solid rgba(220,38,38,0.4)",
            borderRadius: "50px",
            padding: "8px 20px",
            marginBottom: "32px",
          }}
        >
          {/* YouTube Icon */}
          <svg width="22" height="16" viewBox="0 0 24 24" fill="#ef4444">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span style={{ color: "#fca5a5", fontSize: "16px", fontWeight: "700", letterSpacing: "0.05em" }}>
            Code with Mohsin
          </span>
        </div>

        {/* Chapter badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.3)",
            borderRadius: "50px",
            padding: "6px 16px",
            marginBottom: "24px",
          }}
        >
          <div style={{ width: "8px", height: "8px", background: "#4ade80", borderRadius: "50%" }} />
          <span style={{ color: "#86efac", fontSize: "14px", fontWeight: "600", letterSpacing: "0.1em" }}>
            CHAPTER 12 — EXAM PREPARATION QUIZ
          </span>
        </div>

        {/* Main Title */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ color: "#ffffff", fontSize: "56px", fontWeight: "900", lineHeight: "1.1", marginBottom: "8px" }}>
            The AI Agent
          </div>
          <div
            style={{
              fontSize: "60px",
              fontWeight: "900",
              lineHeight: "1.1",
              background: "linear-gradient(90deg, #4ade80, #34d399, #a3e635)",
              backgroundClip: "text",
              color: "transparent",
              WebkitBackgroundClip: "text",
            }}
          >
            Factory Paradigm
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "32px", marginTop: "24px", marginBottom: "32px" }}>
          {[
            { value: "69", label: "Questions" },
            { value: "9", label: "Topics" },
            { value: "MCQ", label: "Format" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ color: "#4ade80", fontSize: "32px", fontWeight: "900" }}>{s.value}</div>
              <div style={{ color: "#6b7280", fontSize: "13px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom credit */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ color: "#374151", fontSize: "13px" }}>Created by</span>
          <span style={{ color: "#4ade80", fontSize: "14px", fontWeight: "800", letterSpacing: "0.05em" }}>
            ✦ Mohsin Raza
          </span>
          <span style={{ color: "#374151", fontSize: "13px" }}>•</span>
          <span style={{ color: "#374151", fontSize: "13px" }}>youtube.com/@CodewithMohsin1</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
