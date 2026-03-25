import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "180px",
          height: "180px",
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          borderRadius: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {/* Play button circle */}
        <div
          style={{
            width: "72px",
            height: "72px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "16px solid transparent",
              borderBottom: "16px solid transparent",
              borderLeft: "28px solid white",
              marginLeft: "6px",
            }}
          />
        </div>
        {/* Channel name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1px",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "900",
              fontFamily: "sans-serif",
              letterSpacing: "0.03em",
              lineHeight: 1,
            }}
          >
            Code with
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "18px",
              fontWeight: "800",
              fontFamily: "sans-serif",
              letterSpacing: "0.05em",
              lineHeight: 1,
            }}
          >
            Mohsin
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
